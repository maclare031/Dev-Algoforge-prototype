// src/hooks/useCombinedAuth.ts
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface CombinedAuthStatus {
  isLoggedIn: boolean;
  userRole: 'student' | 'admin' | 'super-admin' | null;
  isLoading: boolean;
}

export function useCombinedAuth(): CombinedAuthStatus {
  const { isAuthenticated, user, isLoading: isAuthContextLoading } = useAuth();
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This effect runs on the client after mount and whenever isAuthenticated changes
    setIsMounted(true);
    const superAdminStatus = localStorage.getItem('superAdminAuth') === 'true';
    setIsSuperAdmin(superAdminStatus);
  }, [isAuthenticated]);

  if (!isMounted || isAuthContextLoading) {
    return { isLoggedIn: false, userRole: null, isLoading: true };
  }

  const isLoggedIn = isAuthenticated || isSuperAdmin;
  let userRole: 'student' | 'admin' | 'super-admin' | null = null;

  if (isSuperAdmin) {
    userRole = 'super-admin';
  } else if (isAuthenticated && user) {
    userRole = user.role;
  }

  return { isLoggedIn, userRole, isLoading: false };
}