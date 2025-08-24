/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, UploadCloud, ArrowLeft } from 'lucide-react';

// Define the type for the content being edited
interface IEditContent {
    title: string;
    description: string;
    tags: string[];
    thumbnailUrl?: string;
    fileUrl: string; // The original uploaded file URL (e.g., video or PPT)
    type: string;
}

function EditContentFormComponent() {
  const router = useRouter();
  const params = useParams();
  const { contentId, courseId } = params; // Get courseId for routing back

  const [content, setContent] = useState<IEditContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);

  useEffect(() => {
    if (contentId) {
      const fetchContentDetails = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get(`/api/content/${contentId}`);
          // Ensure tags is always an array
          const fetchedContent = res.data.content;
          if (!fetchedContent.tags) {
            fetchedContent.tags = [];
          }
          setContent(fetchedContent);
        } catch (err) {
          console.error("Failed to fetch content details:", err);
          alert("Could not load content details.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchContentDetails();
    }
  }, [contentId]);
  
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploadingThumbnail(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Assuming your upload API returns the URL of the uploaded file
      const res = await axios.post('/api/upload', formData);
      setContent(prev => prev ? { ...prev, thumbnailUrl: res.data.fileUrl } : null);
    } catch (err) {
      console.error("Thumbnail upload failed:", err);
      alert("Thumbnail upload failed.");
    } finally {
      setIsUploadingThumbnail(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.gif', '.webp'] },
    multiple: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent(prev => prev ? { ...prev, [name]: value } : null);
  };
  
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const tagsArray = e.target.value.split(',').map(tag => tag.trim());
      setContent(prev => prev ? { ...prev, tags: tagsArray } : null);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;
    
    setIsSubmitting(true);
    try {
      // Only send the fields that are meant to be updated
      await axios.put(`/api/content/${contentId}`, {
        title: content.title,
        description: content.description,
        tags: content.tags,
        thumbnailUrl: content.thumbnailUrl,
      });
      alert('Content updated successfully!');
      // Navigate back to the main course management page
      router.push(`/super-admin/courses`);
      router.refresh(); // Ensures the page data is fresh
    } catch (err) {
      console.error("Failed to update content:", err);
      alert("Failed to update content.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    );
  }
  
  if (!content) {
      return (
          <div className="flex items-center justify-center min-h-screen text-red-400">
              <p>Could not find the content you are trying to edit.</p>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 py-12">
        <div className="container mx-auto max-w-3xl">
            <div className="mb-6">
                <Button
                    variant="outline"
                    onClick={() => router.back()}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Course
                </Button>
            </div>
            
            <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-gray-100">
                        Edit Content Details
                    </CardTitle>
                    <CardDescription className="text-gray-400 pt-2">
                        Update the details for this {content.type?.toLowerCase()} content item.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6 p-8">
                        <div className="flex items-center p-3 rounded-lg bg-gray-800 border border-gray-700">
                            <CheckCircle className="h-5 w-5 text-green-400 mr-3 shrink-0" />
                            <span className="text-sm text-gray-400">
                                Original File: <code className='text-xs text-gray-300 break-all'>{content.fileUrl}</code>
                            </span>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-300">Thumbnail Image</label>
                            <div 
                                {...getRootProps()} 
                                className={`relative flex justify-center items-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragActive ? 'border-cyan-500 bg-gray-800/80' : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'}`}
                            >
                                <input {...getInputProps()} />
                                {content.thumbnailUrl ? (
                                    <img src={content.thumbnailUrl} alt="Thumbnail preview" className="h-full w-full object-cover rounded-md" />
                                ) : isUploadingThumbnail ? (
                                    <div className="text-center"><Loader2 className="h-8 w-8 animate-spin text-cyan-400" /></div>
                                ) : (
                                    <div className="text-center text-gray-500">
                                        <UploadCloud className="h-8 w-8 mx-auto mb-2" />
                                        <p>Drag & drop, or click to upload thumbnail</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-300">Title *</label>
                            <Input name="title" value={content.title} onChange={handleInputChange} className="bg-gray-800 border-gray-700 focus:border-cyan-500 text-base" required />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-300">Description</label>
                            <Textarea name="description" value={content.description} onChange={handleInputChange} className="bg-gray-800 border-gray-700 focus:border-cyan-500 text-base" rows={4} />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-300">Tags (comma-separated)</label>
                            <Input value={content.tags.join(', ')} onChange={handleTagsChange} className="bg-gray-800 border-gray-700 focus:border-cyan-500 text-base" />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end p-6 bg-gray-900/80 border-t border-gray-800">
                        <Button type="button" variant="outline" onClick={() => router.back()} className="mr-3 border-gray-700 hover:bg-gray-800">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting || isUploadingThumbnail} className="bg-cyan-600 hover:bg-cyan-700 text-white">
                            {(isSubmitting || isUploadingThumbnail) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update Content
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    </div>
  );
}

// Use Suspense to handle loading of parameters from the URL
export default function EditContentPage() {
  return (
    <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen bg-gray-950">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
        </div>
    }>
      <EditContentFormComponent />
    </Suspense>
  );
}