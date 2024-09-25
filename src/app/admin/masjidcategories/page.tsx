"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, ArrowUpDown, Trash2, MapPin, Tag } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { Category, Masjid, MasjidCategory } from "@/types/masjidInterfaces";
import Alert from "@/components/ui/AlertCustom";
import Cookies from "js-cookie";

const formFields: FormField[] = [
  { name: "id_masjid", label: "Masjid", type: "select" },
  { name: "id_category", label: "Category", type: "select" },
];

export default function MasjidCategoriesPage() {
  const [masjidCategoriesList, setMasjidCategoriesList] = useState<
    MasjidCategory[]
  >([]);
  const [filteredMasjidCategoriesList, setFilteredMasjidCategoriesList] =
    useState<MasjidCategory[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMasjidCategory, setCurrentMasjidCategory] = useState<FormData>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"masjid" | "category">("masjid");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState(false);
  const [masjidList, setMasjidList] = useState<Masjid[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [masjidCategoryToEdit, setMasjidCategoryToEdit] =
    useState<MasjidCategory | null>(null);
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
      fetchAllData();
    }
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchMasjidCategories(),
        fetchMasjids(),
        fetchCategories(),
      ]);
    } catch (error) {
      setAlertInfo({
        message: "Gagal mengambil data. Silakan coba lagi.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMasjidCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/masjidcategories`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch masjid categories");
      }
      const data = await response.json();
      setMasjidCategoriesList(data);
      setFilteredMasjidCategoriesList(data);
    } catch (error) {
      console.error("Error fetching masjid categories:", error);
      throw error;
    }
  };

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
    } catch (error) {
      console.error("Error fetching masjids:", error);
      throw error;
    }
  };

  const fetchCategories = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategoryList(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  useEffect(() => {
    const filtered = masjidCategoriesList.filter(
      (masjidCategory) =>
        masjidCategory.masjid.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        masjidCategory.category.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "masjid") {
        return sortOrder === "asc"
          ? a.masjid.name.localeCompare(b.masjid.name)
          : b.masjid.name.localeCompare(a.masjid.name);
      } else {
        return sortOrder === "asc"
          ? a.category.name.localeCompare(b.category.name)
          : b.category.name.localeCompare(a.category.name);
      }
    });

    setFilteredMasjidCategoriesList(sorted);
  }, [masjidCategoriesList, searchTerm, sortBy, sortOrder]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEditing(false);
    setCurrentMasjidCategory({});
  };

  const handleCreate = () => {
    setCurrentMasjidCategory({});
    setIsEditing(false);
    handleOpenModal();
  };

  const handleEdit = (masjidCategory: MasjidCategory) => {
    const categoryToEdit = masjidCategoriesList.find(
      (item) => item.id === masjidCategory.id
    );

    if (!categoryToEdit) {
      setAlertInfo({
        message: "Kategori yang ingin diedit tidak ditemukan.",
        type: "error",
      });
      return;
    }

    setMasjidCategoryToEdit(categoryToEdit);
    setCurrentMasjidCategory({
      id: categoryToEdit.id,
      id_masjid: categoryToEdit.id_masjid,
      id_category: categoryToEdit.id_category,
    });
    setIsEditing(true);
    handleOpenModal();
  };

  const confirmEdit = () => {
    if (masjidCategoryToEdit) {
      const categoryExists = masjidCategoriesList.some(
        (item) => item.id === masjidCategoryToEdit.id
      );

      if (!categoryExists) {
        setAlertInfo({
          message: "Kategori yang ingin diedit telah dihapus.",
          type: "error",
        });
        setAlertDialogOpen(false);
        return;
      }

      setCurrentMasjidCategory({
        id: masjidCategoryToEdit.id,
        id_masjid: masjidCategoryToEdit.id_masjid,
        id_category: masjidCategoryToEdit.id_category,
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
        ? `${process.env.NEXT_PUBLIC_API_URL}/masjidcategories/${currentMasjidCategory.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/masjidcategories`;
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          masjidId: currentMasjidCategory.id_masjid,
          categoryId: currentMasjidCategory.id_category,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error("Failed to submit masjid category");
      }

      if (isEditing) {
        setMasjidCategoriesList((prevList) =>
          prevList.map((item) =>
            item.id === currentMasjidCategory.id ? responseData : item
          )
        );
      } else {
        setMasjidCategoriesList((prevList) => [...prevList, responseData]);
      }

      handleCloseModal();
      setAlertInfo({
        message: isEditing
          ? "Data Category Berhasil diperbaharui"
          : "Masjid Category Berhasil ditambahkan",
        type: "success",
      });
    } catch (error) {
      console.error("Error submitting masjid category:", error);
      setAlertInfo({
        message: "Gagal menyimpan kategori masjid. Silakan coba lagi.",
        type: "error",
      });
    }
  };

  const handleChange = (name: string, value: string | number) => {
    setCurrentMasjidCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSort = (key: "masjid" | "category") => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const handleDelete = async (id: any) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/masjidcategories/${id}`,
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
        throw new Error("Failed to delete masjid category");
      }

      setMasjidCategoriesList((prevList) =>
        prevList.filter((item) => item.id !== id)
      );

      if (masjidCategoryToEdit?.id === id) {
        setMasjidCategoryToEdit(null);
        setCurrentMasjidCategory({});
      }

      setAlertInfo({
        message: "Kategori Masjid Berhasil Dihapus",
        type: "success",
      });
    } catch (error) {
      console.error("Error deleting masjid category:", error);
      setAlertInfo({
        message: "Gagal menghapus kategori masjid. Silakan coba lagi.",
        type: "error",
      });
    }
  };

  const availableMasjids = masjidList.filter(
    (masjid) => !masjidCategoriesList.some((mc) => mc.id_masjid === masjid.id)
  );

  return (
    <div className="container mx-auto p-4">
      {alertInfo && (
        <Alert
          type={alertInfo.type}
          message={alertInfo.message}
          onClose={() => setAlertInfo(null)}
        />
      )}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary mb-4 md:mb-0">
          Daftar Kategori Masjid
        </h1>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Cari kategori masjid..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-auto"
          />
          <Button
            onClick={handleCreate}
            className="bg-green-600 hover:bg-green-700"
            disabled={isLoading}
          >
            <Plus className="mr-2 h-4 w-4" /> Tambah Kategori Masjid
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("masjid")}>
                Masjid <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("category")}>
                Kategori <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Dibuat Oleh</TableHead>
            <TableHead>Tanggal Dibuat</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {filteredMasjidCategoriesList.map((masjidCategory) => (
              <motion.tr
                key={masjidCategory.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TableCell>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {masjidCategory.masjid.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2" />
                    {masjidCategory.category.name}
                  </div>
                </TableCell>
                <TableCell>{masjidCategory.created_by}</TableCell>
                <TableCell>
                  {new Date(masjidCategory.created_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(masjidCategory)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(masjidCategory.id)}
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
        title={
          isEditing ? "Edit Kategori Masjid" : "Tambah Kategori Masjid Baru"
        }
        fields={formFields}
        data={currentMasjidCategory}
        onChange={handleChange}
        masjidList={isEditing ? masjidList : availableMasjids}
        categoriesList={categoryList}
      />

      <ConfirmationDialog
        isOpen={alertDialogOpen}
        onClose={() => setAlertDialogOpen(false)}
        onConfirm={confirmEdit}
        title="Apakah Anda yakin ingin mengedit kategori masjid ini?"
        description="Tindakan ini akan mengubah informasi kategori masjid yang ada. Pastikan Anda memiliki izin untuk melakukan perubahan ini."
      />
    </div>
  );
}
