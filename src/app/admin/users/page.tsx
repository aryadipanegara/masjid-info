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
import { FormField, FormData, User } from "@/types/form";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Cookies from "js-cookie";
import Alert from "@/components/ui/AlertCustom";

const formFields: FormField[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "role", label: "Role", type: "select", options: ["USER", "ADMIN"] },
  { name: "avatar", label: "Avatar URL", type: "text" },
];

export default function AdminUsersPage() {
  const [userList, setUserList] = useState<User[]>([]);
  const [filteredUserList, setFilteredUserList] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<FormData>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "email">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [masjidList, setMasjidList] = useState([]);
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
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUserList(data);
      setFilteredUserList(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setAlertInfo({
        message: "Failed to fetch users. Please try again.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    const filtered = userList.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortOrder === "asc"
          ? a.email.localeCompare(b.email)
          : b.email.localeCompare(a.email);
      }
    });
    setFilteredUserList(sorted);
  }, [userList, searchTerm, sortBy, sortOrder]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEditing(false);
    setCurrentUser({});
  };

  const handleCreate = () => {
    setCurrentUser({});
    setIsEditing(false);
    handleOpenModal();
  };

  const handleEdit = (user: User) => {
    setCurrentUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    });
    setAlertDialogOpen(true);
  };

  const confirmEdit = () => {
    setIsEditing(true);
    handleOpenModal();
    setAlertDialogOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const token = Cookies.get("token"); // Use cookie for token
      if (!token) {
        throw new Error("No token found in cookies");
      }

      const url = isEditing
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${currentUser.id}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`;

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(currentUser),
      });

      if (response.status === 403) {
        throw new Error("Forbidden: You do not have the necessary permissions");
      }

      if (!response.ok) {
        throw new Error("Failed to submit user");
      }

      const data = await response.json();
      if (isEditing) {
        setUserList((prevList) =>
          prevList.map((item) =>
            item.id === currentUser.id ? { ...item, ...data } : item
          )
        );
      } else {
        setUserList([...userList, data]);
      }

      handleCloseModal();
      setAlertInfo({
        message: isEditing
          ? "Data user Berhasil diperbaharui"
          : "User Berhasil Ditambahkan",
        type: "success",
      });
    } catch (error) {
      console.error("Error submitting user:", error);
      setAlertInfo({
        message: "Gagal menyimpan user. Silakan coba lagi.",
        type: "error",
      });
    }
  };

  const handleChange = (name: string, value: string | number) => {
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSort = (key: "name" | "email") => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = Cookies.get("token"); // Use cookie for token
      if (!token) {
        throw new Error("No token found in cookies");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`,
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
        throw new Error("Failed to delete user");
      }

      setUserList((prevList) => prevList.filter((item) => item.id !== id));
      setAlertInfo({
        message: "User Berhasil Dihapus",
        type: "success",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      setAlertInfo({
        message: "Gagal menghapus user. Silakan coba lagi.",
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
          User List
        </h1>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-auto"
          />
          {userRole === "ADMIN" && (
            <Button
              onClick={handleCreate}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="mr-2 h-4 w-4" /> Add User
            </Button>
          )}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("name")}>
                Name <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("email")}>
                Email <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {filteredUserList.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TableCell>
                  <Avatar>
                    <AvatarImage src={user.avatar || undefined} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.role === "ADMIN" ? "default" : "secondary"}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.is_verified ? (
                    <Badge variant="default">Verified</Badge>
                  ) : (
                    <Badge variant="destructive">Not Verified</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
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
        title={isEditing ? "Edit User" : "Add User"}
        fields={formFields}
        data={currentUser}
        onChange={handleChange}
        masjidList={masjidList}
      />

      <ConfirmationDialog
        isOpen={alertDialogOpen}
        onClose={() => setAlertDialogOpen(false)}
        onConfirm={confirmEdit}
        title="Are you sure you want to edit this user?"
        description="This action will modify the user's information. Make sure you have the necessary permissions to make these changes."
      />
    </div>
  );
}
