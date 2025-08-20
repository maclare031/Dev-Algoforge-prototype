export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'admin';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// src/types/auth.ts (or wherever your types are)

export interface AuthState {
  user: User | null;
  admin: any; // Or a specific Admin type
  superAdmin: any; // Or a specific SuperAdmin type
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
  role: 'student' | 'admin';
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  // 👇 Ensure this line exists
  adminLogin: (credentials: LoginCredentials) => Promise<void>; 
  superAdminLogin: (credentials: LoginCredentials) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}