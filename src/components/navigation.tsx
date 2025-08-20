// src/components/navigation.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext'; // <-- Import the main hook

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // --- THIS IS THE FIX ---
  // Use the single, reliable useAuth hook directly
  const { user, admin, superAdmin, isAuthenticated, logout } = useAuth();

  // Combine all possible user objects into one for simplicity
  const currentUser = user || admin || superAdmin;
  
  // Safely get the user's name for the avatar
  const userName = currentUser?.name || currentUser?.username || currentUser?.email;
  // --- END OF FIX ---

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/courses', label: 'Courses' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  if (superAdmin) {
    navLinks.push({ href: '/super-admin', label: 'Super Admin' });
  } else if (admin) {
    navLinks.push({ href: '/admin', label: 'Admin Dashboard' });
  }

  const renderNavLinks = (isMobile = false) => (
    navLinks.map(({ href, label }) => (
      <Link href={href} key={href} passHref>
        <motion.div
          onClick={() => isMobile && setIsOpen(false)}
          className={`cursor-pointer text-sm font-medium transition-colors duration-300 relative ${
            pathname === href
              ? 'text-cyan-300'
              : 'text-gray-300 hover:text-white'
          }`}
          whileHover={{ scale: 1.05 }}
        >
          {label}
          {pathname === href && (
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400"
              layoutId="underline"
            />
          )}
        </motion.div>
      </Link>
    ))
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 text-white font-bold text-xl">
              AlgoForge
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">
            {renderNavLinks()}
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Avatar className="cursor-pointer h-9 w-9 border-2 border-gray-700 hover:border-cyan-400 transition-colors">
                      <AvatarImage src={currentUser?.avatarUrl} alt={userName} />
                      <AvatarFallback className="bg-gray-800 text-cyan-300">
                        {/* This is now safe and will never crash */}
                        {(userName || 'A').charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700 text-white">
                  <DropdownMenuLabel>
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-xs text-gray-400">{currentUser?.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem asChild>
                    <Link href={superAdmin ? "/super-admin" : (admin ? "/admin" : "/dashboard")} className="cursor-pointer flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="cursor-pointer flex items-center text-red-400 focus:bg-red-500/10 focus:text-red-300">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:block">
                <Button asChild variant="ghost" className="text-gray-300 hover:bg-gray-800 hover:text-white">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="ml-2 bg-cyan-600 hover:bg-cyan-500 text-white">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {renderNavLinks(true)}
              {!isAuthenticated && (
                <div className="pt-4 mt-4 border-t border-gray-700 flex items-center justify-center space-x-2">
                   <Button asChild variant="ghost" className="w-full text-gray-300 hover:bg-gray-800 hover:text-white">
                      <Link href="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
                    </Button>
                    <Button asChild className="w-full bg-cyan-600 hover:bg-cyan-500 text-white">
                      <Link href="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
                    </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}