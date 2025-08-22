// src/components/AddStudentModal.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Eye,
  EyeOff,
  User,
  Lock,
  Mail,
  AlertCircle,
  UserPlus,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

interface AddStudentModalProps {
  onClose: () => void;
  onStudentAdded: () => void;
}

export function AddStudentModal({ onClose, onStudentAdded }: AddStudentModalProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (credentials.password !== credentials.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (credentials.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/auth/signup', {
        ...credentials,
        role: 'student'
      });

      if (response.data.success) {
        toast.success('Student account created successfully!');
        onStudentAdded();
      } else {
        setError(response.data.message || 'Signup failed');
        toast.error(response.data.message || 'Signup failed');
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof credentials, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <UserPlus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Add New Student</h2>
                <p className="text-gray-400 text-sm">Create a new student account</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:text-white hover:border-red-500/50"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center space-x-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-300">First Name</label>
                <Input
                  type="text"
                  placeholder="First name"
                  value={credentials.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                  className="bg-black/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 py-3 rounded-xl mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300">Last Name</label>
                <Input
                  type="text"
                  placeholder="Last name"
                  value={credentials.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                  className="bg-black/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 py-3 rounded-xl mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                <User className="w-4 h-4 text-cyan-400" />
                <span>Username</span>
              </label>
              <Input
                type="text"
                placeholder="Choose a unique username"
                value={credentials.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                required
                className="bg-black/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 py-3 rounded-xl mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Email</span>
              </label>
              <Input
                type="email"
                placeholder="Enter email address"
                value={credentials.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="bg-black/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 py-3 rounded-xl mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>Password</span>
              </label>
              <div className="relative mt-1">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={credentials.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  className="bg-black/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 pl-4 pr-12 py-3 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-300 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>Confirm Password</span>
              </label>
              <div className="relative mt-1">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={credentials.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                  className="bg-black/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 pl-4 pr-12 py-3 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-300 transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/25 disabled:opacity-50"
              >
                {isLoading ? 'Creating Account...' : 'Create Student Account'}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}