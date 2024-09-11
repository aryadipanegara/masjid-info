"use client";

import { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

const formFields: FormField[] = [
  { name: "name", label: "Nama Kategori", type: "text" },
];

export default function AdminCategoriesPage() {
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [filteredCategoriesList, setFilteredCategoriesList] = useState<
    Category[]
  >([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<FormData>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [masjidList, setMasjidList] = useState([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"name" | "created_at">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    } else {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserRole(decodedToken.role);
      fetchCategories();
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://masjidinfo-backend.vercel.app/api/categories",
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
      setCategoriesList(data);
      setFilteredCategoriesList(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast({
        title: "Error",
        description: "Failed to fetch categories. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const filtered = categoriesList.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortOrder === "asc"
          ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
    setFilteredCategoriesList(sorted);
  }, [categoriesList, searchTerm, sortBy, sortOrder]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEditing(false);
    setCurrentCategory({});
  };

  const handleCreate = () => {
    setCurrentCategory({});
    setIsEditing(false);
    handleOpenModal();
  };

  const handleEdit = (category: Category) => {
    setCategoryToEdit(category);
    setAlertDialogOpen(true);
  };

  const confirmEdit = () => {
    if (categoryToEdit) {
      setCurrentCategory({
        id: categoryToEdit.id,
        name: categoryToEdit.name,
      });
      setIsEditing(true);
      handleOpenModal();
    }
    setAlertDialogOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const url = isEditing
        ? `https://masjidinfo-backend.vercel.app/api/categories/${currentCategory.id}`
        : "https://masjidinfo-backend.vercel.app/api/categories";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          name: currentCategory.name,
        }),
      });

      if (response.status === 403) {
        throw new Error("Forbidden: You do not have the necessary permissions");
      }

      if (!response.ok) {
        throw new Error("Failed to submit category");
      }

      const data = await response.json();
      if (isEditing) {
        setCategoriesList((prevList) =>
          prevList.map((item) =>
            item.id === currentCategory.id ? { ...item, ...data } : item
          )
        );
      } else {
        setCategoriesList([...categoriesList, data]);
      }

      handleCloseModal();
      toast({
        title: isEditing ? "Category Updated" : "Category Created",
        description: isEditing
          ? "The category has been successfully updated."
          : "A new category has been successfully created.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error submitting category:", error);
      toast({
        title: "Error",
        description: "Failed to submit category. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (name: string, value: string | number) => {
    setCurrentCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSort = (key: "name" | "created_at") => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const response = await fetch(
        `https://masjidinfo-backend.vercel.app/api/categories/${id}`,
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
        throw new Error("Failed to delete category");
      }

      setCategoriesList((prevList) =>
        prevList.filter((item) => item.id !== id)
      );
      toast({
        title: "Category Deleted",
        description: "The category has been successfully deleted.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      toast({
        title: "Error",
        description: "Failed to delete category. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary mb-4 md:mb-0">
          Daftar Kategori
        </h1>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Cari kategori..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-auto"
          />
          <Button
            onClick={handleCreate}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Tambah Kategori
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("name")}>
                Nama <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Dibuat Oleh</TableHead>
            <TableHead>Diperbarui Oleh</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("created_at")}>
                Tanggal Dibuat <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {filteredCategoriesList.map((category) => (
              <motion.tr
                key={category.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.created_by}</TableCell>
                <TableCell>{category.updated_by}</TableCell>
                <TableCell>
                  {new Date(category.created_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(category.id)}
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
        title={isEditing ? "Edit Kategori" : "Tambah Kategori Baru"}
        fields={formFields}
        data={currentCategory}
        onChange={handleChange}
        masjidList={masjidList}
      />

      <ConfirmationDialog
        isOpen={alertDialogOpen}
        onClose={() => setAlertDialogOpen(false)}
        onConfirm={confirmEdit}
        title="Apakah Anda yakin ingin mengedit kategori ini?"
        description="Tindakan ini akan mengubah informasi kategori yang ada. Pastikan Anda memiliki izin untuk melakukan perubahan ini."
      />
    </div>
  );
}
