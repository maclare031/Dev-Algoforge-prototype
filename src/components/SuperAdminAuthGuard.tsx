// src/components/SuperAdminAuthGuard.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function SuperAdminAuthGuard({ children }: { children: React.ReactNode }) {
  // Call all hooks unconditionally at the top
  const router = useRouter();
  const pathname = usePathname();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Move the conditional logic inside the hook
    const isLoggedIn = localStorage.getItem('superAdminAuth') === 'true';

    if (pathname.startsWith('/super-admin') && pathname !== '/super-admin/login') {
      if (!isLoggedIn) {
        // If not logged in, redirect to the login page
        router.push('/super-admin/login');
      } else {
        // If logged in, allow rendering
        setIsVerified(true);
      }
    } else {
      // For non-admin pages or the login page itself, allow rendering
      setIsVerified(true);
    }
  }, [pathname, router]);

  // Conditionally render children based on verification status
  // This prevents a flash of unauthenticated content
  if (!isVerified) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}