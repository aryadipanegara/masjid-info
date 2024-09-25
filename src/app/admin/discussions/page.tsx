"use client";
import { useState, useEffect } from "react";
import { Plus, Edit, MessageCircle, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GenericModal from "@/components/modal/GenericModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormField, FormData } from "@/types/form";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { useRouter } from "next/navigation";
import { Discussion } from "@/types/masjidInterfaces";
import Cookies from "js-cookie";

const formFields: FormField[] = [
  { name: "message", label: "Pesan", type: "text" },
  { name: "id_detail_masjid", label: "ID Detail Masjid", type: "text" },
];

export default function AdminDiscussionPage() {
  const [discussionList, setDiscussionList] = useState<Discussion[]>([]);
  const [filteredDiscussionList, setFilteredDiscussionList] = useState<
    Discussion[]
  >([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDiscussion, setCurrentDiscussion] = useState<FormData>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [discussionToEdit, setDiscussionToEdit] = useState<Discussion | null>(
    null
  );
  const [masjidList, setMasjidList] = useState([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/auth/login");
    } else {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserRole(decodedToken.role);
      fetchDiscussions();
    }
  }, []);

  const fetchDiscussions = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/discussions`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch discussions");
      }
      const data = await response.json();
      setDiscussionList(data);
      setFilteredDiscussionList(data);
    } catch (error) {
      console.error("Error fetching discussions:", error);
    }
  };

  useEffect(() => {
    const filtered = discussionList.filter(
      (discussion) =>
        discussion.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discussion.user?.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        discussion.detailMasjid?.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredDiscussionList(filtered);
  }, [discussionList, searchTerm]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEditing(false);
    setCurrentDiscussion({});
  };

  const handleCreate = () => {
    setCurrentDiscussion({});
    setIsEditing(false);
    handleOpenModal();
  };

  const handleEdit = (discussion: Discussion) => {
    setDiscussionToEdit(discussion);
    setAlertDialogOpen(true);
  };

  const confirmEdit = () => {
    if (discussionToEdit) {
      setCurrentDiscussion({
        id: discussionToEdit.id,
        message: discussionToEdit.message ?? "",
        id_detail_masjid: discussionToEdit.id_detail_masjid,
        created_at: discussionToEdit.created_at,
        updated_at: discussionToEdit.updated_at,
        id_user: discussionToEdit.id_user,
        id_replies_discussion: discussionToEdit.id_replies_discussion ?? "",
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
        ? `${process.env.NEXT_PUBLIC_API_URL}/discussion/${currentDiscussion.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/discussion`;

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          message: currentDiscussion.message,
          id_detail_masjid: currentDiscussion.id_detail_masjid,
        }),
      });

      if (response.status === 403) {
        throw new Error("Forbidden: You do not have the necessary permissions");
      }

      if (!response.ok) {
        throw new Error("Failed to submit discussion");
      }

      const data = await response.json();
      if (isEditing) {
        setDiscussionList((prevList) =>
          prevList.map((item) =>
            item.id === currentDiscussion.id ? { ...item, ...data } : item
          )
        );
      } else {
        setDiscussionList([...discussionList, data]);
      }

      handleCloseModal();
    } catch (error) {
      console.error("Error submitting discussion:", error);
    }
  };

  const handleChange = (name: string, value: string | number) => {
    setCurrentDiscussion((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary mb-4 md:mb-0">
          Daftar Diskusi Masjid
        </h1>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Cari diskusi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-auto"
          />
          <Button
            onClick={handleCreate}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Tambah Diskusi
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredDiscussionList.map((discussion) => (
            <motion.div
              key={discussion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MessageCircle className="h-6 w-6 text-blue-600 mr-2" />
                    <h2 className="text-xl font-semibold">
                      {discussion.message?.substring(0, 100)}...
                    </h2>
                  </div>
                  <div className="text-muted-foreground mb-2">
                    <p>{discussion.message}</p>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <p>
                      Dibuat:{" "}
                      {new Date(discussion.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted p-4">
                  <Button
                    variant="outline"
                    onClick={() => handleEdit(discussion)}
                    className="w-full"
                  >
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <GenericModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        title={isEditing ? "Edit Diskusi" : "Tambah Diskusi Baru"}
        fields={formFields}
        data={currentDiscussion}
        onChange={handleChange}
        masjidList={masjidList}
      />

      <ConfirmationDialog
        isOpen={alertDialogOpen}
        onClose={() => setAlertDialogOpen(false)}
        onConfirm={confirmEdit}
        title="Apakah Anda yakin ingin mengedit diskusi ini?"
        description="Tindakan ini akan mengubah informasi diskusi yang ada. Pastikan Anda memiliki izin untuk melakukan perubahan ini."
      />
    </div>
  );
}
