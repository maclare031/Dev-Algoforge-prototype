// src/app/super-admin/blogs/new/page.tsx

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Save, Loader2, Home, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { MarkdownCheatSheet } from '@/components/MarkdownCheatSheet';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function NewBlogPage() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [readTime, setReadTime] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);
    const [content, setContent] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await axios.post('/api/super-admin/blogs', {
                title,
                author,
                content,
                featuredImage,
                category,
                description,
                tags,
                readTime: parseInt(readTime, 10) || 0,
                featured: isFeatured,
                date: new Date().toISOString(),
            });

            if (res.data.success) {
                router.push('/super-admin/blogs');
            } else {
                setError(res.data.message || 'An error occurred.');
            }
        } catch (err) {
            setError('Failed to connect to the server.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-4 sm:p-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div className="flex items-center mb-6">
                        <Button variant="outline" asChild>
                            <Link href="/super-admin/blogs">
                                <Home className="h-4 w-4 mr-2" />
                                Back to Blogs
                            </Link>
                        </Button>
                        <h1 className="text-2xl font-bold ml-4">Create New Blog Post</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                <Card className="bg-gray-800/50 border-gray-700/50">
                                    <CardHeader>
                                        <CardTitle>Blog Content</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <Input placeholder="Blog Title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-gray-700 border-gray-600 text-lg" required />
                                            <Textarea placeholder="Short Description (for SEO and previews)" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-gray-700 border-gray-600" rows={3} required />
                                            <Textarea placeholder="Blog Content (in Markdown format)" value={content} onChange={(e) => setContent(e.target.value)} className="bg-gray-700 border-gray-600" rows={20} required />
                                            <MarkdownCheatSheet />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="space-y-6">
                                <Card className="bg-gray-800/50 border-gray-700/50">
                                    <CardHeader>
                                        <CardTitle>Metadata</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <Input placeholder="Author Name" value={author} onChange={(e) => setAuthor(e.target.value)} className="bg-gray-700 border-gray-600" required />
                                        <Input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="bg-gray-700 border-gray-600" required />
                                        <Input placeholder="Tags (comma-separated)" value={tags} onChange={(e) => setTags(e.target.value)} className="bg-gray-700 border-gray-600" />
                                        <Input type="number" placeholder="Read Time (e.g., 5)" value={readTime} onChange={(e) => setReadTime(e.target.value)} className="bg-gray-700 border-gray-600" required />
                                        <Input placeholder="Featured Image URL" value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} className="bg-gray-700 border-gray-600" />
                                        <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-md">
                                            <Label htmlFor="featured-post" className="flex items-center gap-2 cursor-pointer">
                                                <Star className="h-4 w-4 text-yellow-400"/>
                                                <span>Featured Post</span>
                                            </Label>
                                            <Switch id="featured-post" checked={isFeatured} onCheckedChange={setIsFeatured} />
                                        </div>
                                    </CardContent>
                                </Card>
                                <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-purple-600" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                    {isLoading ? 'Publishing...' : 'Publish Post'}
                                </Button>
                                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                            </div>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}