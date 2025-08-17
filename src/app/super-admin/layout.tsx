// src/app/super-admin/layout.tsx
import SuperAdminAuthGuard from '@/components/SuperAdminAuthGuard';

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SuperAdminAuthGuard>{children}</SuperAdminAuthGuard>;
}