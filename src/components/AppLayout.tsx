// src/components/AppLayout.tsx
"use client";

import { usePathname } from 'next/navigation';
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/AuthContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Check if the path is /super-admin or /analytics
  const isHiddenRoute = pathname.startsWith('/super-admin') || pathname.startsWith('/analytics');

  return (
    <AuthProvider>
      {!isHiddenRoute && <Navigation />}
      <main className={isHiddenRoute ? '' : 'pt-12'}>{children}</main>
      {!isHiddenRoute && <Footer />}
      <Toaster />
    </AuthProvider>
  );
}