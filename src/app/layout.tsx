// app/layout.tsx
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import { MaintenancePage } from "@/components/maintenance-page";
import { isMaintenanceMode } from "@/lib/maintenance";
import { headers } from 'next/headers';

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
        <AuthProvider>
          <Navigation />
          <main className="pt-12">{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
