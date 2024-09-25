// app/admin/layout.tsx
import ProtectedRoute from "@/lib/ProtectedRoute";
import AdminTabs from "@/components/ui/AdminTabs";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["ADMIN", "AUTHOR"]}>
      <div className="container mx-auto p-4 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <AdminTabs />
        <div className="mt-4">{children}</div>
      </div>
    </ProtectedRoute>
  );
}
