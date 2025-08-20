// src/components/AuthGuard.tsx
"use client";

import { useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext'; // <-- FIX: Import the correct, unified hook
import { motion } from 'framer-motion';

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: 'student' | 'admin' | 'super-admin';
  allowUnauthenticated?: boolean;
}

export function AuthGuard({
  children,
  requiredRole,
  allowUnauthenticated = false
}: AuthGuardProps) {
  // --- THIS IS THE FIX ---
  // We now use the main useAuth hook which gives us reliable state
  const { isAuthenticated, user, admin, superAdmin, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const currentUser = user || admin || superAdmin;
  const userRole = currentUser?.role;
  // --- END OF FIX ---

  useEffect(() => {
    if (isLoading) {
      return; // Wait for the session to be verified
    }

    // For pages like Login/Signup that allow unauthenticated access
    if (allowUnauthenticated) {
      if (isAuthenticated) {
        // If logged in, redirect away from login/signup to the appropriate dashboard
        const redirectPath = userRole === 'super-admin' ? '/super-admin' : userRole === 'admin' ? '/admin' : '/dashboard';
        router.push(redirectPath);
      }
      return; // Otherwise, allow access
    }

    // For protected pages
    if (!isAuthenticated) {
      router.push('/login'); // Not logged in, redirect to login
      return;
    }
    
    // If a specific role is required and the user's role doesn't match, redirect
    if (requiredRole && userRole !== requiredRole) {
      router.push('/dashboard'); // Redirect to a default safe page
    }

  }, [isLoading, isAuthenticated, userRole, router, pathname, requiredRole, allowUnauthenticated]);

  // While loading or if redirection is happening, show a loading spinner
  if (isLoading || (allowUnauthenticated && isAuthenticated) || (!allowUnauthenticated && (!isAuthenticated || (requiredRole && userRole !== requiredRole)))) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <motion.div
          className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  // If all checks pass, render the component
  return <>{children}</>;
}

export default AuthGuard;