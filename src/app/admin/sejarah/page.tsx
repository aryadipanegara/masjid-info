"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
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
import { DetailMasjid, Sejarah } from "../../../types/masjidInterfaces";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Cookies from "js-cookie";
import Alert from "@/components/ui/AlertCustom";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const formFields: FormField[] = [
  { name: "title", label: "Judul", type: "text" },
  { name: "content", label: "Konten", type: "rich-text" },
  { name: "detailMasjidId", label: "ID Detail Masjid", type: "select" },
];

export default function AdminSejarahPage() {
  const [sejarahList, setSejarahList] = useState<Sejarah[]>([]);
  const [filteredSejarahList, setFilteredSejarahList] = useState<Sejarah[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSejarah, setCurrentSejarah] = useState<FormData>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [sejarahToEdit, setSejarahToEdit] = useState<Sejarah | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [detailMasjidList, setDetailMasjidList] = useState<DetailMasjid[]>([]);
  const [masjidList, setMasjidList] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
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
      fetchSejarah();
      fetchDetailMasjids();
    }
  }, []);

  const fetchSejarah = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sejarah`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch sejarah");
      }
      const data = await response.json();
      setSejarahList(data);
      setFilteredSejarahList(data);
    } catch (error) {
      console.error("Error fetching sejarah:", error);
      setAlertInfo({
        message: "Gagal mengambil data sejarah",
        type: "error",
      });
    }
  };

  const fetchDetailMasjids = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/detailmasjids`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch detailmasjids");
      }
      const data = await response.json();
      setDetailMasjidList(data);
    } catch (error) {
      console.error("Error fetching detailmasjids:", error);
      setAlertInfo({
        message: "Gagal Mengambil data detailmasjids",
        type: "error",
      });
    }
  };

  useEffect(() => {
    const filtered = sejarahList.filter(
      (sejarah) =>
        sejarah.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sejarah.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSejarahList(filtered);
  }, [sejarahList, searchTerm]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEditing(false);
    setCurrentSejarah({});
  };

  const handleCreate = () => {
    setCurrentSejarah({});
    setIsEditing(false);
    handleOpenModal();
  };

  const handleEdit = (sejarah: Sejarah) => {
    setSejarahToEdit(sejarah);
    setAlertDialogOpen(true);
  };

  const confirmEdit = () => {
    if (sejarahToEdit) {
      setCurrentSejarah({
        id: sejarahToEdit.id,
        title: sejarahToEdit.title,
        content: sejarahToEdit.content,
        detailMasjidId: sejarahToEdit.detailMasjidId,
        created_by: sejarahToEdit.created_by,
        updated_by: sejarahToEdit.updated_by,
        created_at: sejarahToEdit.created_at,
        updated_at: sejarahToEdit.updated_at,
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

      const url = isEditing
        ? `${process.env.NEXT_PUBLIC_API_URL}/sejarah/${currentSejarah.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/sejarah`;

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          title: currentSejarah.title,
          content: currentSejarah.content,
          detailMasjidId: currentSejarah.detailMasjidId,
        }),
      });

      if (response.status === 403) {
        throw new Error("Forbidden: You do not have the necessary permissions");
      }

      if (!response.ok) {
        throw new Error("Failed to submit sejarah");
      }

      const data = await response.json();
      if (isEditing) {
        setSejarahList((prevList) =>
          prevList.map((item) =>
            item.id === currentSejarah.id ? { ...item, ...data } : item
          )
        );
      } else {
        setSejarahList([...sejarahList, data]);
      }

      handleCloseModal();
      setAlertInfo({
        message: isEditing ? "Sejarah Updated" : "Sejarah Created",
        type: "success",
      });
    } catch (error) {
      console.error("Error submitting sejarah:", error);
      setAlertInfo({
        message: "Gagal Menyimpan Data sejarah",
        type: "error",
      });
    }
  };

  const handleChange = (name: string, value: string | number) => {
    setCurrentSejarah((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sejarah/${id}`,
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
        throw new Error("Failed to delete sejarah");
      }

      setSejarahList((prevList) => prevList.filter((item) => item.id !== id));
      setAlertInfo({
        message: "Sejarah Berhasil di hapus",
        type: "success",
      });
    } catch (error) {
      console.error("Error deleting sejarah:", error);
      setAlertInfo({
        message: "Gagal Menghapus data sejarah",
        type: "error",
      });
    }
  };

  const toggleGroupExpansion = (detailMasjidId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(detailMasjidId)
        ? prev.filter((id) => id !== detailMasjidId)
        : [...prev, detailMasjidId]
    );
  };

  // Group sejarah by detailMasjidId
  const groupedSejarah = filteredSejarahList.reduce((acc, sejarah) => {
    (acc[sejarah.detailMasjidId] = acc[sejarah.detailMasjidId] || []).push(
      sejarah
    );
    return acc;
  }, {} as Record<string, Sejarah[]>);

  // Sort sejarah within each group by created_at
  Object.values(groupedSejarah).forEach((group) => {
    group.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  });

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
          Daftar Sejarah Masjid
        </h1>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Cari sejarah..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-auto"
          />
          <Button
            onClick={handleCreate}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Tambah Sejarah
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Masjid</TableHead>
            <TableHead>Judul</TableHead>
            <TableHead>Konten</TableHead>
            <TableHead>Tanggal Dibuat</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(groupedSejarah).map(
            ([detailMasjidId, sejarahGroup]) => (
              <AnimatePresence key={detailMasjidId}>
                <TableRow>
                  <TableCell colSpan={5}>
                    <Button
                      variant="ghost"
                      onClick={() => toggleGroupExpansion(detailMasjidId)}
                      className="w-full flex justify-between items-center"
                    >
                      <span>
                        {detailMasjidList.find((m) => m.id === detailMasjidId)
                          ?.name || "Unknown Masjid"}
                      </span>
                      {expandedGroups.includes(detailMasjidId) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
                {expandedGroups.includes(detailMasjidId) &&
                  sejarahGroup.map((sejarah) => (
                    <motion.tr
                      key={sejarah.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <TableCell></TableCell>
                      <TableCell>{sejarah.title}</TableCell>
                      <TableCell>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: sejarah.content.substring(0, 50) + "...",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(sejarah.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(sejarah)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(sejarah.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
              </AnimatePresence>
            )
          )}
        </TableBody>
      </Table>

      <GenericModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        title={isEditing ? "Edit Sejarah" : "Tambah Sejarah Baru"}
        fields={formFields}
        data={currentSejarah}
        onChange={handleChange}
        detailMasjidList={detailMasjidList}
        masjidList={masjidList}
      />

      <ConfirmationDialog
        isOpen={alertDialogOpen}
        onClose={() => setAlertDialogOpen(false)}
        onConfirm={confirmEdit}
        title="Apakah Anda yakin ingin mengedit sejarah ini?"
        description="Tindakan ini akan mengubah informasi sejarah yang ada. Pastikan Anda memiliki izin untuk melakukan perubahan ini."
      />
    </div>
  );
}
