"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, ArrowUpDown, Trash2 } from "lucide-react";
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
import Alert from "@/components/ui/AlertCustom";
import Image from "next/image";
import { Masjid } from "@/types/masjidInterfaces";
import Cookies from "js-cookie";

const formFields: FormField[] = [
  { name: "name", label: "Nama Masjid", type: "text" },
  { name: "description", label: "Deskripsi", type: "text" },
  { name: "thumbnail", label: "URL Thumbnail", type: "text" },
];

export default function AdminMasjidPage() {
  const [masjidList, setMasjidList] = useState<Masjid[]>([]);
  const [filteredMasjidList, setFilteredMasjidList] = useState<Masjid[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMasjid, setCurrentMasjid] = useState<FormData>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "total_Klik">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [masjidToEdit, setMasjidToEdit] = useState<Masjid | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
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
      fetchMasjids();
    }
  }, []);

  const fetchMasjids = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/masjids`,
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
      setFilteredMasjidList(data);
    } catch (error) {
      setAlertInfo({
        message: "Gagal mengambil data masjid. Silakan coba lagi.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    const filtered = masjidList.filter(
      (masjid) =>
        masjid.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        masjid.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortOrder === "asc"
          ? a.total_Klik - b.total_Klik
          : b.total_Klik - a.total_Klik;
      }
    });
    setFilteredMasjidList(sorted);
  }, [masjidList, searchTerm, sortBy, sortOrder]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEditing(false);
    setCurrentMasjid({});
  };

  const handleCreate = () => {
    setCurrentMasjid({});
    setIsEditing(false);
    handleOpenModal();
  };

  const handleEdit = (masjid: Masjid) => {
    setMasjidToEdit(masjid);
    setAlertDialogOpen(true);
  };

  const confirmEdit = () => {
    if (masjidToEdit) {
      setCurrentMasjid({
        id: masjidToEdit.id,
        name: masjidToEdit.name,
        description: masjidToEdit.description,
        thumbnail: masjidToEdit.thumbnail,
      });
      setIsEditing(true);
      handleOpenModal();
      setAlertInfo({
        message: "Anda sedang mengedit data masjid",
        type: "info",
      });
    }
    setAlertDialogOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const url = isEditing
        ? `${process.env.NEXT_PUBLIC_API_URL}/masjids/${currentMasjid.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/masjids`;

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          name: currentMasjid.name,
          description: currentMasjid.description,
          thumbnail: currentMasjid.thumbnail,
        }),
      });

      if (response.status === 403) {
        throw new Error("Forbidden: You do not have the necessary permissions");
      }

      if (!response.ok) {
        throw new Error("Failed to submit masjid");
      }

      const data = await response.json();
      if (isEditing) {
        setMasjidList((prevList) =>
          prevList.map((item) =>
            item.id === currentMasjid.id ? { ...item, ...data } : item
          )
        );
      } else {
        setMasjidList([...masjidList, data]);
      }

      handleCloseModal();
      setAlertInfo({
        message: isEditing
          ? "Data masjid berhasil diperbarui"
          : "Masjid baru berhasil ditambahkan",
        type: "success",
      });
    } catch (error) {
      console.error("Error submitting masjid:", error);
      setAlertInfo({
        message: "Gagal menyimpan data masjid. Silakan coba lagi.",
        type: "error",
      });
    }
  };

  const handleChange = (name: string, value: string | number) => {
    setCurrentMasjid((prev) => ({ ...prev, [name]: value }));
  };

  const handleSort = (key: "name" | "total_Klik") => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/masjids/${id}`,
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
        throw new Error("Failed to delete masjid");
      }

      setMasjidList((prevList) => prevList.filter((item) => item.id !== id));
      setAlertInfo({
        message: "Masjid berhasil dihapus",
        type: "success",
      });
    } catch (error) {
      console.error("Error deleting masjid:", error);
      setAlertInfo({
        message: "Gagal menghapus masjid. Silakan coba lagi.",
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
          Daftar Masjid
        </h1>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Cari masjid..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-auto"
          />
          {(userRole === "ADMIN" || userRole === "AUTHOR") && (
            <Button
              onClick={handleCreate}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="mr-2 h-4 w-4" /> Tambah Masjid
            </Button>
          )}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Thumbnail</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("name")}>
                Nama <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Tanggal Dibuat</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {filteredMasjidList.map((masjid) => (
              <motion.tr
                key={masjid.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TableCell>
                  <Image
                    src={masjid.thumbnail}
                    alt={masjid.name}
                    width={50}
                    height={50}
                    className="object-cover rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{masjid.name}</TableCell>
                <TableCell>{masjid.description.substring(0, 50)}...</TableCell>
                <TableCell>{masjid.total_Klik}</TableCell>
                <TableCell>
                  {new Date(masjid.created_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(masjid)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(masjid.id)}
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
        title={isEditing ? "Edit Masjid" : "Tambah Masjid"}
        fields={formFields}
        data={currentMasjid}
        onChange={handleChange}
        masjidList={masjidList}
      />

      <ConfirmationDialog
        isOpen={alertDialogOpen}
        onClose={() => setAlertDialogOpen(false)}
        onConfirm={confirmEdit}
        title="Apakah Anda yakin ingin mengedit masjid ini?"
        description="Tindakan ini akan mengubah informasi masjid yang ada. Pastikan Anda memiliki izin untuk melakukan perubahan ini."
      />
    </div>
  );
}
