// src/app/layout.tsx
import "./globals.css";
import { isMaintenanceMode } from "@/lib/maintenance";
import { headers } from 'next/headers';
import { MaintenancePage } from "@/components/maintenance-page";
import AppLayout from '@/components/AppLayout'; // Import the new component

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const maintenanceMode = headersList.get('x-maintenance-mode') === 'true' || await isMaintenanceMode();

  if (maintenanceMode) {
    return (
      <html lang="en" className="dark">
        <body className="dark bg-gradient-to-br from-black via-gray-900 to-black overflow-x-hidden text-white min-h-screen">
          <MaintenancePage />
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className="dark">
      <body className="dark bg-gradient-to-br from-black via-gray-900 to-black overflow-x-hidden text-white min-h-screen">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}