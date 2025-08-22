// src/components/StudentDetailModal.tsx
"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Phone, X, User, Edit, Save, XCircle, BookOpen, BarChart2, CheckCircle, Clock } from "lucide-react";
import axios from 'axios';
import toast from 'react-hot-toast';

// Define the structure of a student
interface Student {
  _id: string;
  name: string;
  email: string;
  course: string;
  progress: string;
  status: string;
  joined: string;
  firstName: string;
  lastName: string;
  username: string;
}

interface StudentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  onStudentUpdated: () => void;
}

export function StudentDetailModal({ isOpen, onClose, student, onStudentUpdated }: StudentDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState(student);
  const [showContactOptions, setShowContactOptions] = useState(false);

  useEffect(() => {
    setEditedStudent(student);
  }, [student]);

  if (!student) return null;

  const handleSaveClick = async () => {
    try {
      await axios.put(`/api/super-admin/data?view=students&id=${student._id}`, editedStudent);
      toast.success("Student details saved!");
      setIsEditing(false);
      onStudentUpdated();
    } catch (error) {
      toast.error("Failed to save student details.");
      console.error("Error saving student details:", error);
    }
  };

  const handleCancelClick = () => {
    setEditedStudent(student);
    setIsEditing(false);
  };
  
  const handleInputChange = (field: keyof Student, value: string) => {
    setEditedStudent(prev => prev ? { ...prev, [field]: value } : null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#111827] border-slate-700 text-white max-w-lg p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-white">Student Details</DialogTitle>
              <p className="text-sm text-slate-400">Student Profile & Progress</p>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoCard label="First Name" value={editedStudent?.firstName || ''} isEditing={isEditing} onChange={(e) => handleInputChange('firstName', e.target.value)} />
            <InfoCard label="Last Name" value={editedStudent?.lastName || ''} isEditing={isEditing} onChange={(e) => handleInputChange('lastName', e.target.value)} />
            <InfoCard label="Email" value={editedStudent?.email || ''} isEditing={isEditing} onChange={(e) => handleInputChange('email', e.target.value)} />
            <InfoCard label="Username" value={editedStudent?.username || ''} isEditing={isEditing} onChange={(e) => handleInputChange('username', e.target.value)} />
            <InfoCard label="Enrolled Course" value={student.course} icon={BookOpen} />
            <InfoCard label="Progress" value={student.progress} icon={BarChart2} />
            <InfoCard label="Status" value={student.status} icon={CheckCircle} isBadge={true} />
            <InfoCard label="Joined Date" value={new Date(student.joined).toLocaleDateString()} icon={Clock} />
          </div>

          <div className="flex gap-4 border-t border-slate-700 pt-4 mt-4">
            {isEditing ? (
              <>
                <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleSaveClick}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleCancelClick}>
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button className="bg-green-600 hover:bg-green-700 flex-1" onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Details
                </Button>
                <div className="relative flex-1">
                  <Button variant="outline" className="w-full" onClick={() => setShowContactOptions(!showContactOptions)}>
                    Contact
                  </Button>
                  {showContactOptions && (
                    <div className="absolute bottom-full mb-2 w-full bg-slate-800 border border-slate-700 rounded-lg p-2 space-y-2 animate-in fade-in-0 slide-in-from-bottom-2">
                      <Button variant="outline" className="w-full justify-start"><Mail className="w-4 h-4 mr-2"/>Email</Button>
                      <Button variant="outline" className="w-full justify-start"><Phone className="w-4 h-4 mr-2"/>Call</Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Helper component for displaying info cards in the modal
const InfoCard = ({ label, value, isEditing = false, icon: Icon, isBadge = false, onChange }: { label: string, value: string, isEditing?: boolean, icon?: React.ElementType, isBadge?: boolean, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    const badgeColors: { [key: string]: string } = {
        'active': 'bg-emerald-900/40 border-emerald-700/50 text-emerald-400',
        'completed': 'bg-blue-900/40 border-blue-700/50 text-blue-400',
    };
    
    return (
        <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
            <p className="text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                {Icon && <Icon className="w-3 h-3"/>}
                {label}
            </p>
            {isEditing ? (
                <input type="text" value={value} onChange={onChange} className="mt-1 w-full bg-slate-700 text-white p-1 rounded-md text-base font-semibold"/>
            ) : isBadge ? (
                <span className={`mt-1 inline-block text-sm font-semibold px-2 py-0.5 rounded-md ${badgeColors[value.toLowerCase()] || 'bg-slate-700 text-slate-300'}`}>
                    {value}
                </span>
            ) : (
                <p className="text-base font-semibold text-white mt-1">{value}</p>
            )}
        </div>
    );
};