"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { Loader2, User } from "lucide-react";
import AlertCustom from "@/components/AlertCustom";
import Loading from "../loading";

interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  is_verified: boolean;
  is_email_verification: boolean;
  role: string;
  created_at: string;
  updated_at: string;
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedAvatarUrl, setEditedAvatarUrl] = useState("");
  const [alertInfo, setAlertInfo] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/login");
        return;
      }

      const response = await fetch("http://localhost:5000/api/users/me", {
        headers: { Authorization: `${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch profile");

      const data = await response.json();
      setProfile(data);
      setEditedName(data.name);
      setEditedAvatarUrl(data.avatar || "");
    } catch (error) {
      console.error("Error fetching profile:", error);
      setAlertInfo({
        message: "Failed to load profile. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedName(profile?.name || "");
    setEditedAvatarUrl(profile?.avatar || "");
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/login");
        return;
      }

      const response = await fetch("http://localhost:5000/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          name: editedName,
          avatar: editedAvatarUrl,
        }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setIsEditing(false);
      setAlertInfo({
        message: "Profile updated successfully",
        type: "success",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      setAlertInfo({
        message: "Failed to update profile. Please try again.",
        type: "error",
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">
          Failed to load profile. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {alertInfo && (
        <AlertCustom
          message={alertInfo.message}
          type={alertInfo.type}
          onClose={() => setAlertInfo(null)}
        />
      )}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={profile.avatar || undefined}
                alt={profile.name}
              />
              <AvatarFallback>
                <User className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-sm text-gray-500">{profile.email}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              ) : (
                <p className="mt-1">{profile.name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="avatar">Avatar URL</Label>
              {isEditing ? (
                <Input
                  id="avatar"
                  value={editedAvatarUrl}
                  onChange={(e) => setEditedAvatarUrl(e.target.value)}
                  placeholder="Enter avatar URL"
                />
              ) : (
                <p className="mt-1">{profile.avatar || "No avatar set"}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <p className="mt-1">{profile.email}</p>
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <p className="mt-1">{profile.role}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="verified" checked={profile.is_verified} disabled />
              <Label htmlFor="verified">Account Verified</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="emailVerified"
                checked={profile.is_email_verification}
                disabled
              />
              <Label htmlFor="emailVerified">Email Verified</Label>
            </div>
            <div>
              <Label>Account Created</Label>
              <p className="mt-1">
                {new Date(profile.created_at).toLocaleString()}
              </p>
            </div>
            <div>
              <Label>Last Updated</Label>
              <p className="mt-1">
                {new Date(profile.updated_at).toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </>
          ) : (
            <Button onClick={handleEdit} className="hidden">
              Edit Profile
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
