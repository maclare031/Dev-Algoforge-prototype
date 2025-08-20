"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield, Eye, EyeOff, User, Lock, AlertCircle, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SuperAdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Use the main '/api/auth' endpoint, not '/api/login'
      const response = await axios.post('/api/auth', {
        username, // The API expects 'username'
        password,
        role: 'superadmin' // The correct role is 'superadmin'
      });

      if (response.data.success) {
        const { user } = response.data;

        // --- THIS IS THE CRITICAL FIX ---
        // Store the full user object in localStorage, just like the guard expects.
        localStorage.setItem('superAdminAuth', JSON.stringify({
          isAuthenticated: true,
          user: user
        }));
        // --- END OF FIX ---

        toast.success('Super Admin login successful!');
        router.push('/super-admin');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please check credentials.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of the JSX for the page remains the same
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-black/50 backdrop-blur-lg border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/20 overflow-hidden"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full border border-purple-500/30 mb-4">
              <Shield className="w-8 h-8 text-purple-300" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Super Admin
            </h1>
            <p className="text-gray-400">Access the control panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center space-x-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center" htmlFor="username">
                <User className="w-4 h-4 mr-2 text-purple-400" />
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-black/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center" htmlFor="password">
                <Lock className="w-4 h-4 mr-2 text-purple-400" />
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-black/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-3 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 disabled:opacity-70"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center">
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </div>
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}