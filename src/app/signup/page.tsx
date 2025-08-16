"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  ArrowRight,
  UserPlus,
  GraduationCap,
  Shield
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { AuthGuard } from '@/components/AuthGuard';

interface SignupCredentials {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

function SignupContent() {
  const [credentials, setCredentials] = useState<SignupCredentials>({
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
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
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
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...credentials,
          role: 'student' // Always set role to student for signup
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Account created successfully! Please sign in.', {
          duration: 4000,
          position: 'top-center',
          style: {
            background: '#065f46',
            color: '#ecfdf5',
            border: '1px solid #10b981'
          }
        });
        router.push('/login');
      } else {
        setError(data.message || 'Signup failed');
        toast.error(data.message || 'Signup failed', {
          duration: 4000,
          position: 'top-center',
          style: {
            background: '#991b1b',
            color: '#fef2f2',
            border: '1px solid #ef4444'
          }
        });
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#991b1b',
          color: '#fef2f2',
          border: '1px solid #ef4444'
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof SignupCredentials, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

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
      {/* <div className="absolute top-6 left-6 z-20">
        <Link href="/" className="group">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-black/10 group-hover:bg-black/20 transition-colors duration-300 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="AlgoForgeStudios Logo"
                fill
                sizes="48px"
                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <span className="text-lg sm:text-xl font-medium bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent transition-all duration-300 group-hover:from-cyan-300 group-hover:via-purple-300 group-hover:to-pink-300 hidden sm:block">
              AlgoForgeStudios
            </span>
          </div>
        </Link>
      </div> */}

      {/* Signup Container */}
      <div className="relative z-10 w-full max-w-md px-6">
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
              <GraduationCap className="w-8 h-8 text-cyan-300" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h1 className="text-2xl font-bold mb-2">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Join AlgoForge
                </span>
              </h1>
              <p className="text-gray-400 text-sm">
                Create your student account to start learning
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

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">First Name</label>
                  <Input
                    type="text"
                    placeholder="First name"
                    value={credentials.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                    className="bg-black/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 py-3 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Last Name</label>
                  <Input
                    type="text"
                    placeholder="Last name"
                    value={credentials.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                    className="bg-black/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 py-3 rounded-xl"
                  />
                </div>
              </div>

              {/* Username Field */}
              <div className="space-y-2">
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
                  className="bg-black/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 py-3 rounded-xl"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Email</span>
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={credentials.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="bg-black/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 py-3 rounded-xl"
                />
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
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-cyan-400" />
                  <span>Confirm Password</span>
                </label>
                <div className="relative">
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
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Student Account Notice */}
              {/* <div className="flex items-start space-x-2 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                <GraduationCap className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  You're creating a student account. Admin accounts are created separately by administrators.
                </p>
              </div> */}

              {/* Signup Button */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="pt-2"
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="relative flex items-center justify-center space-x-2">
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                        <span>Create Account</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                      </>
                    )}
                  </div>
                </Button>
              </motion.div>

              {/* Login Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="text-center pt-4 border-t border-gray-700/50"
              >
                <p className="text-sm text-gray-400">
                  Already have an account?{' '}
                  <Link 
                    href="/login" 
                    className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200"
                  >
                    Sign in
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

export default function Signup() {
  return (
    <AuthGuard allowUnauthenticated={true}>
      <SignupContent />
    </AuthGuard>
  );
}
