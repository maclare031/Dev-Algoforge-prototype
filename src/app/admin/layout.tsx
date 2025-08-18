// src/app/admin/layout.tsx
import { AuthGuard } from "@/components/AuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout should only return the necessary components and guards,
  // NOT the <html> and <body> tags.
  return (
    <AuthGuard requiredRole="admin">
      {children}
    </AuthGuard>
    
  );
}