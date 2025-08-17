// src/app/analytics/layout.tsx
import SuperAdminAuthGuard from '@/components/SuperAdminAuthGuard';

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SuperAdminAuthGuard>{children}</SuperAdminAuthGuard>;
}