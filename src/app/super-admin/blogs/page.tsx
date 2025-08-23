/* eslint-disable @next/next/no-img-element */
// src/app/super-admin/blogs/page.tsx

"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PlusCircle, Edit, Trash2, Loader2, Home, Search, Calendar, User, ImageOff, Star, Clock } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { ClientOnlyDate } from '@/components/ClientOnlyDate';

type Post = {
    slug: string;
    title: string;
    author: string;
    date: string;
    category: string;
    description: string;
    image?: string;
    featured?: boolean;
    readTime?: number;
};


export default function BlogManagementPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const router = useRouter();

    const fetchPosts = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/super-admin/blogs');
            const data = await res.json();
            if (data.success) {
                setPosts(data.posts);
            } else {
                setError(data.message || "Failed to fetch posts.");
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("An error occurred while connecting to the server.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleDelete = async (slug: string) => {
        try {
            const res = await fetch(`/api/super-admin/blogs/${slug}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                fetchPosts();
            } else {
                setError(data.message || "Failed to delete the post.");
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("An error occurred while deleting the post.");
        }
    };

    const filteredPosts = useMemo(() =>
        posts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        ), [posts, searchTerm]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-black text-white">
             <div className="absolute inset-0 z-0">
                <motion.div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" animate={{ x: [-50, 50, -50], y: [-50, 50, -50], scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} style={{ left: "10%", top: "20%" }} />
                <motion.div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" animate={{ x: [50, -50, 50], y: [50, -50, 50], scale: [1.1, 1, 1.1] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} style={{ right: "10%", bottom: "20%" }} />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                        <h1 className="text-3xl font-bold">Blog Management</h1>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <Button variant="outline" asChild className="flex-1 sm:flex-initial">
                                <Link href="/super-admin">
                                    <Home className="h-4 w-4 mr-2" />
                                    Dashboard
                                </Link>
                            </Button>
                            <Button asChild className="flex-1 sm:flex-initial bg-gradient-to-r from-cyan-500 to-purple-600">
                                <Link href="/super-admin/blogs/new">
                                    <PlusCircle className="w-4 h-4 mr-2" />
                                    Create New Post
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="mb-6 bg-black/50 backdrop-blur-lg border border-gray-700/50 rounded-lg p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search by title..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 w-full bg-slate-800/50 border-slate-700 focus:border-cyan-500"
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-12 w-12 animate-spin text-cyan-400" />
                        </div>
                    ) : (
                        filteredPosts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredPosts.map((post) => (
                                    <motion.div key={post.slug} layout>
                                        <Card className="bg-gray-800/50 border-gray-700/50 h-full flex flex-col hover:border-cyan-500/50 transition-colors duration-300 relative">
                                            {post.featured && (
                                                <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 text-xs font-bold rounded-md flex items-center gap-1 z-10">
                                                    <Star className="h-3 w-3" />
                                                    <span>Featured</span>
                                                </div>
                                            )}
                                            <CardHeader className="p-4">
                                                <div className="aspect-video bg-gray-900 rounded-md mb-4 flex items-center justify-center overflow-hidden">
                                                    <img
                                                        src={post.image || "public/images/no-image-icon-23485.png"}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => { e.currentTarget.src = "public/images/no-image-icon-23485.png"; }}
                                                    />
                                                </div>
                                                <Badge variant="outline" className="border-purple-700 text-purple-300 w-fit">{post.category}</Badge>
                                                <CardTitle className="mt-2 text-base font-semibold text-white leading-tight h-12 line-clamp-2">{post.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0 flex-grow text-gray-400 text-xs">
                                                <CardDescription className="h-10 line-clamp-3 mb-4">{post.description}</CardDescription>
                                                <div className="flex items-center gap-2">
                                                    <User className="h-3 w-3" /> <span>{post.author}</span>
                                                </div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Calendar className="h-3 w-3" /> <ClientOnlyDate dateString={post.date} />
                                                </div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Clock className="h-3 w-3" /> <span>{post.readTime} min read</span>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="flex justify-end gap-2 bg-black/20 p-3 mt-auto">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/super-admin/blogs/${post.slug}/edit`}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="destructive" size="sm">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This will permanently delete the blog post titled "{post.title}".
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(post.slug)}>
                                                                Confirm Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-gray-800/50 rounded-lg">
                                <h3 className="text-xl font-semibold">No Blog Posts Found</h3>
                                <p className="text-gray-400 mt-2">
                                    {searchTerm ? `No posts match your search for "${searchTerm}".` : "Get started by creating a new post."}
                                </p>
                            </div>
                        )
                    )}
                </motion.div>
            </div>
        </div>
    );
}