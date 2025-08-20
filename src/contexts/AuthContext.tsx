// src/contexts/AuthContext.tsx
"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AuthState, AuthContextType, LoginCredentials, User } from '@/types/auth';

// Auth actions remain the same
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'INITIALIZE'; payload?: User }; // Changed from RESTORE_SESSION

// Initial state remains the same
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start with isLoading: true to check session
  error: null,
};

// Reducer - updated for clarity
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'INITIALIZE':
      return {
        ...state,
        user: action.payload || null,
        isAuthenticated: !!action.payload,
        isLoading: false,
        error: null,
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

  // This effect runs once on mount to check for an active session
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // We call our new 'me' endpoint to see if a valid cookie exists
        const response = await axios.get('/api/auth/me');
        if (response.data.success) {
          dispatch({ type: 'INITIALIZE', payload: response.data.user });
        } else {
          dispatch({ type: 'INITIALIZE' });
        }
      } catch (error) {
        // If the request fails (e.g., 401 Unauthorized), there's no active session
        dispatch({ type: 'INITIALIZE' });
      }
    };

    checkUserSession();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      // The /api/auth endpoint now sets the HttpOnly cookie automatically
      const response = await axios.post('/api/auth', credentials);
      
      if (response.data.success) {
        const { user } = response.data;
        // We no longer need to touch localStorage for tokens
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } else {
        const errorMessage = response.data.message || 'Login failed';
        dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  // Logout function
// In src/contexts/AuthContext.tsx

const logout = async () => {
  try {
    // 1. Clears the main user's cookie on the server
    await axios.post('/api/auth/logout');
  } catch (error) {
    console.error("Logout API call failed:", error);
  } finally {
    // 2. Clears the main user's state in the app
    dispatch({ type: 'LOGOUT' });

    // --- THIS IS THE FIX ---
    // 3. Explicitly removes the super admin's session from the browser
    localStorage.removeItem('superAdminAuth');

    // 4. Forces a full page reload to the correct user login page
    window.location.href = '/login'; 
  }
};
// Clear error function
const clearError = () => {
  dispatch({ type: 'CLEAR_ERROR' });
};

  const contextValue: AuthContextType = {
    ...state,
    login,
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