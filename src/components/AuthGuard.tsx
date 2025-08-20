// src/components/AuthGuard.tsx
"use client"

import { useEffect, ReactNode, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useCombinedAuth } from '@/hooks/useCombinedAuth';

interface AuthGuardProps {
  children: ReactNode
  requiredRole?: 'student' | 'admin' | 'super-admin'
  redirectTo?: string
  allowUnauthenticated?: boolean
}

export function AuthGuard({
  children,
  requiredRole,
  redirectTo = '/login',
  allowUnauthenticated = false
}: AuthGuardProps) {
  const { isLoggedIn, userRole, isLoading } = useCombinedAuth();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Wait until our combined auth hook is done loading
    if (isLoading) {
      return;
    }

    // --- Logic for pages that redirect if logged in (e.g., login page) ---
    if (allowUnauthenticated && isLoggedIn) {
      if (userRole === 'super-admin') {
        router.push('/super-admin');
      } else if (userRole === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
      return;
    }

    // --- Logic for protected pages ---
    if (!allowUnauthenticated) {
      // 1. If not logged in, redirect
      if (!isLoggedIn) {
        router.push(redirectTo);
        return;
      }

      // 2. If a role is required, check authorization
      if (requiredRole) {
        // If the user role does not match the required role, redirect
        if (userRole !== requiredRole) {
          if (userRole === 'super-admin') {
            router.push('/super-admin');
          } else if (userRole === 'admin') {
            router.push('/admin');
          } else {
            router.push('/dashboard');
          }
          return;
        }
      }
    }

    // If all checks pass, allow rendering
    setIsVerified(true);

  }, [isLoggedIn, userRole, isLoading, router, requiredRole, redirectTo, allowUnauthenticated]);

  // Show a loading screen while auth is being verified
  if (isLoading || !isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-400 text-sm">Loading...</p>
        </motion.div>
      </div>
    )
  }

  return <>{children}</>;
}

export default AuthGuard;