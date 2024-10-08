"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Image } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GenericModal from "@/components/modal/GenericModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormField, FormData } from "@/types/form";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { DetailMasjid, Masjid } from "@/types/masjidInterfaces";
import Alert from "@/components/ui/AlertCustom";

const formFields: FormField[] = [
  { name: "id_masjid", label: "Nama Masjid", type: "select" },
  { name: "name", label: "Nama Detail Masjid", type: "text" },
  { name: "address", label: "Alamat", type: "text" },
];

export default function AdminDetailMasjidPage() {
  const [detailMasjidList, setDetailMasjidList] = useState<DetailMasjid[]>([]);
  const [filteredDetailMasjidList, setFilteredDetailMasjidList] = useState<
    DetailMasjid[]
  >([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDetailMasjid, setCurrentDetailMasjid] = useState<FormData>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [detailMasjidToEdit, setDetailMasjidToEdit] =
    useState<DetailMasjid | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [masjidList, setMasjidList] = useState<Masjid[]>([]);
  const [alertInfo, setAlertInfo] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/auth/login");
    } else {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserRole(decodedToken.role);
      fetchDetailMasjids();
      fetchMasjids();
    }
  }, []);

  const fetchDetailMasjids = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/detailmasjids`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch detail masjids");
      }
      const data = await response.json();
      setDetailMasjidList(data);
      setFilteredDetailMasjidList(data);
    } catch (error) {
      setAlertInfo({
        message: "Gagal mengambil data detail masjid. Silakan coba lagi.",
        type: "error",
      });
    }
  };

  const fetchMasjids = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/masjids`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch masjids");
      }
      const data = await response.json();
      setMasjidList(data);
    } catch (error) {
      setAlertInfo({
        message: "Gagal mengambil data masjid. Silakan coba lagi.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    const filtered = detailMasjidList.filter(
      (detailMasjid) =>
        detailMasjid.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        detailMasjid.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDetailMasjidList(filtered);
  }, [detailMasjidList, searchTerm]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEditing(false);
    setCurrentDetailMasjid({});
  };

  const handleCreate = () => {
    setCurrentDetailMasjid({});
    setIsEditing(false);
    handleOpenModal();
  };

  const handleEdit = (detailMasjid: DetailMasjid) => {
    setDetailMasjidToEdit(detailMasjid);
    setAlertDialogOpen(true);
  };

  const confirmEdit = () => {
    if (detailMasjidToEdit) {
      setCurrentDetailMasjid({
        id: detailMasjidToEdit.id,
        id_masjid: detailMasjidToEdit.id_masjid,
        name: detailMasjidToEdit.name,
        address: detailMasjidToEdit.address,
      });
      setIsEditing(true);
      handleOpenModal();
    }
    setAlertDialogOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      // Check if a DetailMasjid already exists for the selected Masjid
      if (!isEditing) {
        const existingDetailMasjid = detailMasjidList.find(
          (dm) => dm.id_masjid === currentDetailMasjid.id_masjid
        );
        if (existingDetailMasjid) {
          setAlertInfo({
            message: "Detail Masjid sudah ada untuk masjid ini.",
            type: "error",
          });
          return;
        }
      }

      const url = isEditing
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/detailmasjids/${currentDetailMasjid.id}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/api/detailmasjids`;

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          id_masjid: currentDetailMasjid.id_masjid,
          name: currentDetailMasjid.name,
          address: currentDetailMasjid.address,
        }),
      });

      if (response.status === 403) {
        throw new Error("Forbidden: You do not have the necessary permissions");
      }

      if (!response.ok) {
        throw new Error("Failed to submit detail masjid");
      }

      const data = await response.json();
      if (isEditing) {
        setDetailMasjidList((prevList) =>
          prevList.map((item) =>
            item.id === currentDetailMasjid.id ? { ...item, ...data } : item
          )
        );
      } else {
        setDetailMasjidList([...detailMasjidList, data]);
      }

      handleCloseModal();
      setAlertInfo({
        message: isEditing
          ? "Data DetailMasjid berhasil diperbaharui"
          : "Data DetailMasjid berhasil ditambahkan",
        type: "success",
      });
    } catch (error) {
      console.error("Error submitting detail masjid:", error);
      setAlertInfo({
        message: "Gagal menyimpan data masjid. Silakan Coba lagi",
        type: "error",
      });
    }
  };

  const handleChange = (name: string, value: string | number) => {
    setCurrentDetailMasjid((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id: string) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/detailmasjids/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 403) {
        throw new Error("Forbidden: You do not have the necessary permissions");
      }

      if (!response.ok) {
        throw new Error("Failed to delete detail masjid");
      }

      setDetailMasjidList((prevList) =>
        prevList.filter((item) => item.id !== id)
      );
      setAlertInfo({
        message: "Data DetailMasjid berhasil dihapus",
        type: "success",
      });
    } catch (error) {
      console.error("Error deleting detail masjid:", error);
      setAlertInfo({
        message: "Gagal menghapus data masjid. Silakan Coba lagi",
        type: "error",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      {alertInfo && (
        <Alert
          message={alertInfo.message}
          type={alertInfo.type}
          duration={3000}
          onClose={() => setAlertInfo(null)}
        />
      )}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary mb-4 md:mb-0">
          Daftar Detail Masjid
        </h1>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Cari detail masjid..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-auto"
          />
          <Button
            onClick={handleCreate}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Tambah Detail Masjid
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Masjid</TableHead>
            <TableHead>Nama Detail</TableHead>
            <TableHead>Alamat</TableHead>
            <TableHead>Foto</TableHead>
            <TableHead>Diskusi</TableHead>
            <TableHead>Tanggal Dibuat</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {filteredDetailMasjidList.map((detailMasjid) => (
              <motion.tr
                key={detailMasjid.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TableCell>
                  {masjidList.find((m) => m.id === detailMasjid.id_masjid)
                    ?.name || "Unknown Masjid"}
                </TableCell>
                <TableCell>{detailMasjid.name}</TableCell>
                <TableCell>{detailMasjid.address}</TableCell>
                <TableCell>{detailMasjid.photos.length}</TableCell>
                <TableCell>{detailMasjid.discussions.length}</TableCell>
                <TableCell>
                  {new Date(detailMasjid.created_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(detailMasjid)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(detailMasjid.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>

      <GenericModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        title={isEditing ? "Edit Detail Masjid" : "Tambah Detail Masjid Baru"}
        fields={formFields}
        data={currentDetailMasjid}
        onChange={handleChange}
        masjidList={masjidList}
      />

      <ConfirmationDialog
        isOpen={alertDialogOpen}
        onClose={() => setAlertDialogOpen(false)}
        onConfirm={confirmEdit}
        title="Apakah Anda yakin ingin mengedit detail masjid ini?"
        description="Tindakan ini akan mengubah informasi detail masjid yang ada. Pastikan Anda memiliki izin untuk melakukan perubahan ini."
      />
    </div>
  );
}
