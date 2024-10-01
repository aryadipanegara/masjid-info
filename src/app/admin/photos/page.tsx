"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
} from "lucide-react";
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
import Image from "next/image";
import { DetailMasjid, Photo } from "@/types/masjidInterfaces";

const formFields: FormField[] = [
  { name: "photo_url", label: "URL Foto", type: "text" },
  { name: "caption", label: "Keterangan Foto", type: "text" },
  { name: "detailMasjidId", label: "ID Detail Masjid", type: "select" },
];

export default function AdminPhotosPage() {
  const [photosList, setPhotosList] = useState<Photo[]>([]);
  const [filteredPhotosList, setFilteredPhotosList] = useState<Photo[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<FormData>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [photoToEdit, setPhotoToEdit] = useState<Photo | null>(null);
  const [detailMasjidList, setDetailMasjidList] = useState<DetailMasjid[]>([]);
  const [masjidList, setMasjidList] = useState([]);
  const [userRole, setUserRole] = useState<string | null>(null);
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
      fetchPhotos();
      fetchDetailMasjids();
    }
  }, []);

  const fetchPhotos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/photos`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch photos");
      }
      const data = await response.json();
      setPhotosList(data);
      setFilteredPhotosList(data);
    } catch (error) {
      console.error("Error fetching photos:", error);
      setAlertInfo({
        message: " Gagal Mengambil Data Photos",
        type: "error",
      });
    }
  };

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
        throw new Error("Failed to fetch detailmasjids");
      }
      const data = await response.json();
      setDetailMasjidList(data);
    } catch (error) {
      console.error("Error fetching detailmasjids:", error);
      setAlertInfo({
        message: "Gagal Mengambil Data Detail Masjid",
        type: "error",
      });
    }
  };

  useEffect(() => {
    const filtered = photosList.filter(
      (photo) =>
        (photo.caption?.toLowerCase() || "").includes(
          searchTerm.toLowerCase()
        ) ||
        (photo.photo_url?.toLowerCase() || "").includes(
          searchTerm.toLowerCase()
        )
    );
    setFilteredPhotosList(filtered);
  }, [photosList, searchTerm]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEditing(false);
    setCurrentPhoto({});
  };

  const handleCreate = () => {
    setCurrentPhoto({});
    setIsEditing(false);
    handleOpenModal();
  };

  const handleEdit = (photo: Photo) => {
    setPhotoToEdit(photo);
    setAlertDialogOpen(true);
  };

  const confirmEdit = () => {
    if (photoToEdit) {
      setCurrentPhoto({
        id: photoToEdit.id,
        photo_url: photoToEdit.photo_url,
        caption: photoToEdit.caption,
        detailMasjidId: photoToEdit.detailMasjidId,
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
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/photos/${currentPhoto.id}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/api/photos`;

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          photo_url: currentPhoto.photo_url,
          caption: currentPhoto.caption,
          detailMasjidId: currentPhoto.detailMasjidId,
        }),
      });

      if (response.status === 403) {
        throw new Error("Forbidden: You do not have the necessary permissions");
      }

      if (!response.ok) {
        throw new Error("Failed to submit photo");
      }

      const data = await response.json();
      if (isEditing) {
        setPhotosList((prevList) =>
          prevList.map((item) =>
            item.id === currentPhoto.id ? { ...item, ...data } : item
          )
        );
      } else {
        setPhotosList([...photosList, data]);
      }

      handleCloseModal();
      setAlertInfo({
        message: isEditing ? "Photo Updated" : "Photo Added",
        type: "success",
      });
    } catch (error) {
      console.error("Error submitting photo:", error);
      setAlertInfo({
        message: "Gagal memperbaharui data Photos",
        type: "error",
      });
    }
  };

  const handleChange = (name: string, value: string | number) => {
    setCurrentPhoto((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id: number) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/photos/${id}`,
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
        throw new Error("Failed to delete photo");
      }

      setPhotosList((prevList) => prevList.filter((item) => item.id !== id));
      setAlertInfo({
        message: "Photo deleted successfully",
        type: "success",
      });
    } catch (error) {
      console.error("Error deleting photo:", error);
      setAlertInfo({
        message: "Gagal Menghapus Foto",
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

  // Group photos by detailMasjidId
  const groupedPhotos = filteredPhotosList.reduce((acc, photo) => {
    (acc[photo.detailMasjidId] = acc[photo.detailMasjidId] || []).push(photo);
    return acc;
  }, {} as Record<string, Photo[]>);

  // Sort photos within each group by created_at
  Object.values(groupedPhotos).forEach((group) => {
    group.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary mb-4 md:mb-0">
          Daftar Foto Masjid
        </h1>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Cari foto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-auto"
          />
          <Button
            onClick={handleCreate}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Tambah Foto
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Masjid</TableHead>
            <TableHead>Foto</TableHead>
            <TableHead>Keterangan</TableHead>
            <TableHead>Tanggal Dibuat</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(groupedPhotos).map(([detailMasjidId, photoGroup]) => (
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
                photoGroup.map((photo) => (
                  <motion.tr
                    key={photo.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <TableCell></TableCell>
                    <TableCell>
                      <Image
                        src={photo.photo_url}
                        alt={photo.caption}
                        width={100}
                        height={100}
                        className="object-cover rounded"
                      />
                    </TableCell>
                    <TableCell>{photo.caption}</TableCell>
                    <TableCell>
                      {new Date(photo.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(photo)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(photo.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
            </AnimatePresence>
          ))}
        </TableBody>
      </Table>

      <GenericModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        title={isEditing ? "Edit Foto" : "Tambah Foto Baru"}
        fields={formFields}
        data={currentPhoto}
        onChange={handleChange}
        detailMasjidList={detailMasjidList}
        masjidList={masjidList}
      />

      <ConfirmationDialog
        isOpen={alertDialogOpen}
        onClose={() => setAlertDialogOpen(false)}
        onConfirm={confirmEdit}
        title="Apakah Anda yakin ingin mengedit foto ini?"
        description="Tindakan ini akan mengubah informasi foto yang ada. Pastikan Anda memiliki izin untuk melakukan perubahan ini."
      />
    </div>
  );
}
