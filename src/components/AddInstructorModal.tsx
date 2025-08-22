// src/components/AddInstructorModal.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Lock, 
  Mail,
  AlertCircle,
  UserPlus,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

interface AddInstructorModalProps {
  onClose: () => void;
  onInstructorAdded: () => void;
}

export function AddInstructorModal({ onClose, onInstructorAdded }: AddInstructorModalProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await axios.post('/api/super-admin/data?view=instructors', {
        ...credentials,
        role: 'instructor'
      });
      toast.success('Instructor account created successfully!');
      onInstructorAdded();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An error occurred.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof credentials, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-700/50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Add New Instructor</h2>
              <p className="text-gray-400 text-sm">Create a new instructor account</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onClose} className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:text-white hover:border-red-500/50">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center space-x-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <Input 
                placeholder="First Name" 
                value={credentials.firstName} 
                onChange={(e) => handleInputChange('firstName', e.target.value)} 
                required 
                className="bg-black/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
              />
              <Input 
                placeholder="Last Name" 
                value={credentials.lastName} 
                onChange={(e) => handleInputChange('lastName', e.target.value)} 
                required 
                className="bg-black/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
              />
            </div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Username" 
                value={credentials.username} 
                onChange={(e) => handleInputChange('username', e.target.value)} 
                required 
                className="pl-10 bg-black/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="email" 
                placeholder="Email" 
                value={credentials.email} 
                onChange={(e) => handleInputChange('email', e.target.value)} 
                required 
                className="pl-10 bg-black/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="password" 
                placeholder="Password" 
                value={credentials.password} 
                onChange={(e) => handleInputChange('password', e.target.value)} 
                required 
                className="pl-10 bg-black/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              {isLoading ? 'Adding...' : 'Add Instructor'}
            </Button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}