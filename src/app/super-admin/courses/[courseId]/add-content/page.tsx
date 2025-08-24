/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, Suspense, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, UploadCloud } from 'lucide-react';

function AddContentFormComponent({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moduleId = searchParams.get('moduleId');
  const contentType = searchParams.get('type');
  const fileUrl = searchParams.get('fileUrl');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploadingThumbnail(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/upload', formData);
      setThumbnailUrl(res.data.fileUrl);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !moduleId || !contentType || !fileUrl) {
      alert("Missing required information. Please try uploading again.");
      return;
    }
    setIsSubmitting(true);
    try {
      await axios.post('/api/content', {
        title,
        description,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        moduleId,
        type: contentType,
        fileUrl,
        thumbnailUrl,
      });
      alert('Content added successfully!');
      router.push(`/super-admin/courses`);
      router.refresh();
    } catch (err) {
      console.error("Failed to add content:", err);
      alert("Failed to add content.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!moduleId || !contentType || !fileUrl) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-400">
        <p>Error: Critical information missing from URL. Please go back and try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-gray-200 py-12 flex items-center justify-center">
      <div className="container mx-auto max-w-3xl relative">
        {/* --- NEW --- This is the gradient circle for the background effect */}
        <div className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-violet-700/20 to-cyan-700/20 rounded-full blur-3xl opacity-50"></div>
        
        <Card className="bg-gray-900/60 border-gray-800/50 backdrop-blur-xl relative z-10">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
              Add Content Details
            </CardTitle>
            <CardDescription className="text-gray-400 pt-2">
              Your {contentType} file was uploaded successfully. Add the final details below.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-8 p-8">
              <div className="flex items-center p-3 rounded-lg bg-emerald-900/40 border border-emerald-700/50">
                <CheckCircle className="h-5 w-5 text-emerald-400 mr-3 shrink-0" />
                <span className="text-sm text-emerald-300">
                  Upload Complete:&nbsp;
                  <code className='text-xs break-all'>{fileUrl}</code>
                </span>
              </div>

              {/* Thumbnail Upload Section */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">Thumbnail Image</label>
                <div 
                  {...getRootProps()} 
                  className={`relative flex justify-center items-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragActive ? 'border-cyan-500 bg-gray-800/50' : 'border-gray-700 hover:border-gray-600'}`}
                >
                  <input {...getInputProps()} />
                  {thumbnailUrl ? (
                    <img src={thumbnailUrl} alt="Thumbnail preview" className="h-full w-full object-cover rounded-md" />
                  ) : isUploadingThumbnail ? (
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin text-cyan-400 mb-2" />
                      <p className="text-sm text-gray-400">Uploading...</p>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      <UploadCloud className="h-8 w-8 mx-auto mb-2" />
                      <p>Drag & drop, or click to upload</p>
                      <p className="text-xs mt-1">Recommended: 1280x720px</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">Title *</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={`e.g., Introduction to Python Variables`}
                  className="bg-gray-800 border-gray-700 focus:border-cyan-500 text-base"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">Description</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A brief summary of what this content covers."
                  className="bg-gray-800 border-gray-700 focus:border-cyan-500 text-base"
                  rows={4}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">Tags (comma-separated)</label>
                <Input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g., python, variables, data types"
                  className="bg-gray-800 border-gray-700 focus:border-cyan-500 text-base"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end p-6 bg-gray-900/30 border-t border-gray-800/50">
              <Button type="button" variant="outline" onClick={() => router.back()} className="mr-3 border-gray-700 hover:bg-gray-800">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || isUploadingThumbnail} className="bg-gradient-to-r from-cyan-500 to-violet-600 hover:opacity-90 text-white">
                {(isSubmitting || isUploadingThumbnail) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Content
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default function AddContentPage({ params }: { params: { courseId: string } }) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-white">Loading...</div>}>
      <AddContentFormComponent params={params} />
    </Suspense>
  );
}