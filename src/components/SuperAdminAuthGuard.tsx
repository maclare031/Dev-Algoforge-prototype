// src/components/SuperAdminAuthGuard.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function SuperAdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      // Exclude login page from verification
      if (pathname === '/super-admin/login') {
        setIsVerified(true);
        return;
      }

      try {
        const res = await fetch('/api/auth/me'); // Your existing endpoint to verify the token
        const data = await res.json();

        if (data.success && data.user.role === 'super-admin') {
          setIsVerified(true);
        } else {
          router.push('/super-admin/login');
        }
      } catch (error) {
        router.push('/super-admin/login');
      }
    };

    if (pathname.startsWith('/super-admin')) {
      verifySession();
    } else {
      setIsVerified(true);
    }
  }, [pathname, router]);

  if (!isVerified) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}