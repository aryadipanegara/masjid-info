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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { Category, Masjid, MasjidCategory } from "@/types/masjidInterfaces";

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
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    } else {
      fetchMasjidCategories();
      fetchMasjids();
      fetchCategories();
    }
  }, []);

  const fetchMasjidCategories = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://masjidinfo-backend.vercel.app/api/masjidcategories",
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
      toast({
        title: "Error",
        description: "Failed to fetch masjid categories. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMasjids = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://masjidinfo-backend.vercel.app/api/masjids",
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
      toast({
        title: "Error",
        description: "Failed to fetch masjids. Please try again.",
        variant: "destructive",
      });
    }
  };

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
      console.log("Fetched categories:", data); // Tambahkan log untuk melihat hasil fetch
      setCategoryList(data);
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
    setMasjidCategoryToEdit(masjidCategory);
    setAlertDialogOpen(true);
  };

  const confirmEdit = () => {
    if (masjidCategoryToEdit) {
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
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const url = isEditing
        ? `https://masjidinfo-backend.vercel.app/api/masjidcategories/${currentMasjidCategory.id}`
        : "https://masjidinfo-backend.vercel.app/api/masjidcategories";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          id_masjid: currentMasjidCategory.id_masjid,
          id_category: currentMasjidCategory.id_category,
        }),
      });

      if (response.status === 403) {
        throw new Error("Forbidden: You do not have the necessary permissions");
      }

      if (!response.ok) {
        throw new Error("Failed to submit masjid category");
      }

      const data = await response.json();
      if (isEditing) {
        setMasjidCategoriesList((prevList) =>
          prevList.map((item) =>
            item.id === currentMasjidCategory.id ? { ...item, ...data } : item
          )
        );
      } else {
        setMasjidCategoriesList([...masjidCategoriesList, data]);
      }

      handleCloseModal();
      toast({
        title: "Success",
        description: isEditing
          ? "Masjid category updated successfully"
          : "Masjid category created successfully",
      });
    } catch (error) {
      console.error("Error submitting masjid category:", error);
      toast({
        title: "Error",
        description: "Failed to submit masjid category. Please try again.",
        variant: "destructive",
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
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const response = await fetch(
        `https://masjidinfo-backend.vercel.app/api/masjidcategories/${id}`,
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
      toast({
        title: "Masjid Category Deleted",
        description: "The masjid category has been successfully deleted.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error deleting masjid category:", error);
      toast({
        title: "Error",
        description: "Failed to delete masjid category. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
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
        masjidList={masjidList}
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