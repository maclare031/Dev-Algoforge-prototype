"use client"

import { useEffect, ReactNode, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'

interface AuthGuardProps {
  children: ReactNode
  requiredRole?: 'student' | 'admin'
  redirectTo?: string
  allowUnauthenticated?: boolean // For pages like login/signup that should redirect if authenticated
}

export function AuthGuard({
  children, 
  requiredRole, 
  redirectTo = '/login',
  allowUnauthenticated = false
}: AuthGuardProps) {
  const { isAuthenticated, user, isLoading } = useAuth()
  const router = useRouter()
  const [shouldRender, setShouldRender] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Handle mounting to prevent hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Wait for component to mount and auth to initialize
    if (!isMounted || isLoading) {
      return
    }

    // Handle pages that should redirect authenticated users (like login/signup)
    if (allowUnauthenticated && isAuthenticated && user) {
      if (user.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/')
      }
      return
    }

    // Handle protected routes
    if (!allowUnauthenticated) {
      if (!isAuthenticated) {
        router.push(redirectTo)
        return
      }

      if (requiredRole && user?.role !== requiredRole) {
        // Redirect based on user's actual role
        if (user?.role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/dashboard')
        }
        return
      }
    }

    setShouldRender(true)
  }, [isAuthenticated, user, requiredRole, redirectTo, router, allowUnauthenticated, isLoading, isMounted])

  // Show loading spinner while mounting, auth is initializing, or redirecting
  if (!isMounted || isLoading || !shouldRender) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
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

  return <>{children}</>
}

// Default export for convenience
export default AuthGuard
