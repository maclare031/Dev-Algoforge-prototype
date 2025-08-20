// src/contexts/AuthContext.tsx
"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AuthState, AuthContextType, LoginCredentials } from '@/types/auth';

type UserPayload = { id: string; role: string; name: string; email?: string; username?: string; };

type AuthAction =
  | { type: 'INITIALIZE'; payload?: UserPayload }
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: UserPayload }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  user: null,
  admin: null,
  superAdmin: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'INITIALIZE':
    case 'LOGIN_SUCCESS':
      const user = action.payload || null;
      const isSuperAdmin = user?.role === 'super-admin';
      const isAdmin = user?.role === 'admin';
      return {
        ...state,
        user: user && !isAdmin && !isSuperAdmin ? user : null,
        admin: user && isAdmin ? user : null,
        superAdmin: user && isSuperAdmin ? user : null,
        isAuthenticated: !!user,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_FAILURE':
      return { ...initialState, isLoading: false, error: action.payload };
    case 'LOGOUT':
      return { ...initialState, isLoading: false };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await axios.get('/api/auth/me');
        if (data.success) {
          dispatch({ type: 'INITIALIZE', payload: data.user });
        } else {
          dispatch({ type: 'INITIALIZE' });
        }
      } catch (error) {
        dispatch({ type: 'INITIALIZE' });
      }
    };
    checkSession();
  }, []);

  const login = async (credentials: LoginCredentials & { role: string }) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const { data } = await axios.post('/api/login', credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.user });
      if (data.user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      dispatch({ type: 'LOGIN_FAILURE', payload: message });
      throw new Error(message);
    }
  };

  const superAdminLogin = async (credentials: Omit<LoginCredentials, 'username' | 'role'>) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const { data } = await axios.post('/api/super-admin/login', credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.user });
      router.push('/super-admin');
    } catch (error: any) {
      const message = error.response?.data?.message || "Super Admin login failed";
      dispatch({ type: 'LOGIN_FAILURE', payload: message });
      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (error) {
      console.error("Logout API call failed, but clearing client state anyway.", error);
    } finally {
      dispatch({ type: 'LOGOUT' });
      // We don't need to remove localStorage anymore!
      router.push('/');
    }
  };
  
  const contextValue = { ...state, login, superAdminLogin, logout };

  return (
    <AuthContext.Provider value={contextValue as AuthContextType}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};