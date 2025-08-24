/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalBody } from '@/components/ui/modal';
import { Loader2 } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  moduleId: string;
  contentType: 'VIDEO' | 'PPT' | 'NOTES';
}

export const UploadModal = ({ isOpen, onClose, courseId, moduleId, contentType }: UploadModalProps) => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      alert("Please select a file.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Step 1: Upload the file to the server and get progress updates
      const uploadRes = await axios.post('/api/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
          setUploadProgress(percentCompleted);
        },
      });
      
      const { fileUrl } = uploadRes.data;

      if (!fileUrl) {
        throw new Error("File URL was not returned from the server.");
      }
      
      // Step 2: Redirect to the page where the user adds the title and description
      onClose(); // Close the upload modal
      router.push(`/super-admin/courses/${courseId}/add-content?moduleId=${moduleId}&type=${contentType}&fileUrl=${encodeURIComponent(fileUrl)}`);

    } catch (err) {
      console.error("Upload failed:", err);
      alert("File upload failed. Please check the console for details.");
      setIsUploading(false); // Reset on failure
    }
  }, [courseId, moduleId, contentType, router, onClose]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    multiple: false,
    disabled: isUploading, // Disable dropzone while uploading
  });

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="bg-gray-900 border-gray-800 text-gray-200">
        <ModalHeader>
          <ModalTitle>Upload {contentType}</ModalTitle>
        </ModalHeader>
        <ModalBody className="py-6">
          <div
            {...getRootProps()}
            className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
              isUploading ? 'cursor-not-allowed opacity-50' : 'hover:border-gray-600'
            } ${
              isDragActive ? 'border-cyan-500 bg-gray-800/50' : 'border-gray-700'
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the file here...</p>
            ) : (
              <p>Drag & drop your file here, or click to select a file</p>
            )}
          </div>
          {isUploading && (
            <div className='mt-4'>
                <p className='text-sm text-center text-gray-400 mb-2'>Uploading... {uploadProgress}%</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-cyan-500 h-2 rounded-full" 
                      style={{ width: `${uploadProgress}%`, transition: 'width 0.3s ease-in-out' }}
                    ></div>
                </div>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};