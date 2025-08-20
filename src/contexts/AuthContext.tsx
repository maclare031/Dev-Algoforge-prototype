// src/contexts/AuthContext.tsx
"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AuthState, AuthContextType, LoginCredentials, User } from '@/types/auth';

// Define the shape of our actions
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user?: User; admin?: any; superAdmin?: any } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'INITIALIZE'; payload?: { user?: User; admin?: any; superAdmin?: any } };

// All auth state is now in one place
const initialState: AuthState = {
  user: null,
  admin: null,
  superAdmin: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// A single reducer to manage all auth state
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        admin: null,
        superAdmin: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        admin: null,
        superAdmin: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'INITIALIZE':
      return {
        ...state,
        ...action.payload,
        isAuthenticated: !!(action.payload?.user || action.payload?.admin || action.payload?.superAdmin),
        isLoading: false,
      };
    default:
      return state;
  }
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await axios.get('/api/auth/me');
        if (response.data.success) {
          dispatch({ type: 'INITIALIZE', payload: { user: response.data.user } });
        } else {
          dispatch({ type: 'INITIALIZE' });
        }
      } catch (error) {
        dispatch({ type: 'INITIALIZE' });
      }
    };
    checkUserSession();
  }, []);
  
  // --- ADDED MISSING FUNCTIONS ---

 const login = async (credentials: LoginCredentials & { role: string }) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const response = await axios.post('/api/login', credentials);
    const { user } = response.data; // Get the user object from the response

    if (!user) {
      throw new Error("User data not found in login response.");
    }

    dispatch({ type: 'LOGIN_SUCCESS', payload: { user: user } });

    // --- CENTRALIZED REDIRECT LOGIC ---
    // The context now decides where to send the user.
    if (user.role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/dashboard'); // Your main dashboard for students
    }
    
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Login failed. Please check credentials.';
    dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
    // Re-throw the error so the UI can catch it and show a toast
    throw new Error(errorMessage);
  }
};
const adminLogin = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await axios.post('/api/admin/login', credentials);
      if (response.data.success) {
        // Make sure the payload key matches your reducer ('admin')
        dispatch({ type: 'LOGIN_SUCCESS', payload: { admin: response.data.admin } });
        router.push('/admin/dashboard'); // Or wherever admins should go
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: response.data.message || 'Admin login failed' });
      }
    } catch (error: any) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response?.data?.message || 'Admin login failed' });
    }
  };

  const superAdminLogin = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      // IMPORTANT: Make sure this API endpoint is correct for your app
      const response = await axios.post('/api/super-admin/login', credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { superAdmin: response.data.superAdmin } });
      router.push('/super-admin');
    } catch (error: any) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response?.data?.message || 'Super admin login failed' });
    }
  };
  
  const signup = async (userData: any) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await axios.post('/api/auth/signup', userData);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: response.data.user } });
      router.push('/dashboard');
    } catch (error: any) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response?.data?.message || 'Signup failed' });
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      dispatch({ type: 'LOGOUT' });
      localStorage.removeItem('superAdminAuth');
      localStorage.removeItem('adminAuth');
      router.push('/');
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // --- FIX: ADDED ALL FUNCTIONS TO THE CONTEXT VALUE ---
  const contextValue: AuthContextType = {
    ...state,
    login,
    adminLogin,
    superAdminLogin,
    signup,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}