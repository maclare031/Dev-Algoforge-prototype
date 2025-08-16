"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { 
  Shield, 
  Eye, 
  EyeOff, 
  User, 
  Lock, 
  AlertCircle,
  ArrowRight,
  LogIn,
  GraduationCap,
  Users
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { LoginCredentials } from '@/types/auth';
import { AuthGuard } from '@/components/AuthGuard';
import toast from 'react-hot-toast';

function LoginContent() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
    role: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(credentials);
      
      // Show success message
      toast.success(`Welcome back, ${credentials.username}!`, {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#065f46',
          color: '#ecfdf5',
          border: '1px solid #10b981'
        }
      });

      // Redirect based on role
      if (credentials.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/'); // We'll create this for students
      }
    } catch (err) {
      console.error('Login failed:', err);
      toast.error('Login failed. Please check your credentials.', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#991b1b',
          color: '#fef2f2',
          border: '1px solid #ef4444'
        }
      });
    }
  };

  const handleInputChange = (field: keyof LoginCredentials, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getRoleIcon = () => {
    return credentials.role === 'admin' ? Shield : GraduationCap;
  };

  const RoleIcon = getRoleIcon();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900/95 to-black relative overflow-hidden flex items-center justify-center px-4 py-8">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-72 h-72 lg:w-96 lg:h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [-50, 50, -50],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: "10%", top: "20%" }}
        />
        <motion.div
          className="absolute w-72 h-72 lg:w-96 lg:h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [50, -50, 50],
            y: [50, -50, 50],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ right: "10%", bottom: "20%" }}
        />
        <motion.div
          className="absolute w-48 h-48 lg:w-64 lg:h-64 bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        />
      </div>

      {/* Navigation Link */}
      {/* <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
        <Link href="/" className="group">
          <div className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-black/10 group-hover:bg-black/20 transition-colors duration-300 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="AlgoForgeStudios Logo"
                fill
                sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, 48px"
                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <span className="text-sm sm:text-lg md:text-xl font-medium bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent transition-all duration-300 group-hover:from-cyan-300 group-hover:via-purple-300 group-hover:to-pink-300 hidden xs:block">
              AlgoForgeStudios
            </span>
          </div>
        </Link>
      </div> */}

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-full animate-pulse" />

          {/* Header Section */}
          <div className="relative bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-b border-cyan-500/20 p-6 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-cyan-500/30 shadow-lg mb-4"
            >
              <RoleIcon className="w-8 h-8 text-cyan-300" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h1 className="text-2xl font-bold mb-2">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Welcome Back
                </span>
              </h1>
              <p className="text-gray-400 text-sm">
                Sign in to access your account
              </p>
            </motion.div>
          </div>

          {/* Form Section */}
          <div className="p-6">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-4"
            >
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </motion.div>
              )}

              {/* Role Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>Account Type</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleInputChange('role', 'student')}
                    className={`flex items-center justify-center space-x-2 p-3 rounded-xl border transition-all duration-300 ${
                      credentials.role === 'student'
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'bg-black/50 border-gray-600/50 text-gray-400 hover:border-cyan-400/50'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span className="text-sm font-medium">Student</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('role', 'admin')}
                    className={`flex items-center justify-center space-x-2 p-3 rounded-xl border transition-all duration-300 ${
                      credentials.role === 'admin'
                        ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                        : 'bg-black/50 border-gray-600/50 text-gray-400 hover:border-purple-400/50'
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    <span className="text-sm font-medium">Admin</span>
                  </button>
                </div>
              </div>

              {/* Username Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span>Username</span>
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    value={credentials.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    required
                    className="bg-black/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 pl-4 pr-4 py-3 rounded-xl"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-cyan-400" />
                  <span>Password</span>
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <motion.div
                whileHover={{ scale: isLoading ? 1 : 1.01 }}
                whileTap={{ scale: isLoading ? 1 : 0.99 }}
                className="pt-2"
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-80 disabled:cursor-not-allowed group relative overflow-hidden"
                >
                  {/* Normal hover effect (only when not loading) */}
                  {!isLoading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  )}
                  
                  <div className="relative flex items-center justify-center space-x-2">
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        <span className="font-medium">Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                        <span>Sign In</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                      </>
                    )}
                  </div>
                </Button>
              </motion.div>

              {/* Signup Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="text-center pt-4 border-t border-gray-700/50"
              >
                <p className="text-sm text-gray-400">
                  Don't have an account?{' '}
                  <Link 
                    href="/signup" 
                    className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200"
                  >
                    Sign up as Student
                  </Link>
                </p>
              </motion.div>
            </motion.form>
          </div>

          {/* Decorative Border */}
          <div className="absolute inset-0 rounded-2xl border border-cyan-400/0 group-hover:border-cyan-400/30 transition-all duration-300 pointer-events-none" />
        </motion.div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(6, 182, 212, 0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <AuthGuard allowUnauthenticated={true}>
      <LoginContent />
    </AuthGuard>
  );
}
