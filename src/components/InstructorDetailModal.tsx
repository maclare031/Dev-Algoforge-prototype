"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, User, Mail, BookOpen, Star } from "lucide-react";

interface Instructor {
  name: string;
  email: string;
  courses: string;
  rating: string;
  status: string;
}

interface InstructorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  instructor: Instructor | null;
}

export function InstructorDetailModal({ isOpen, onClose, instructor }: InstructorDetailModalProps) {
  if (!instructor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#111827] border-slate-700 text-white max-w-lg p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
            </div>
            <div>
                <DialogTitle className="text-xl font-bold text-white">Instructor Details</DialogTitle>
                <p className="text-sm text-slate-400">Instructor Profile</p>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard label="Name" value={instructor.name} />
                <InfoCard label="Email" value={instructor.email} />
                <InfoCard label="Courses Taught" value={instructor.courses} icon={BookOpen} />
                <InfoCard label="Rating" value={instructor.rating} icon={Star} />
                <InfoCard label="Status" value={instructor.status} isBadge={true} />
            </div>
             <div className="flex gap-4 border-t border-slate-700 pt-4 mt-4">
                <Button variant="outline" className="flex-1">
                    <Mail className="w-4 h-4 mr-2"/>
                    Send Message
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const InfoCard = ({ label, value, icon: Icon, isBadge = false }: { label: string, value: string, icon?: React.ElementType, isBadge?: boolean }) => {
    const badgeColors: { [key: string]: string } = {
        'active': 'bg-emerald-900/40 border-emerald-700/50 text-emerald-400',
        'on leave': 'bg-yellow-900/40 border-yellow-700/50 text-yellow-400',
    };
    
    return (
        <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
            <p className="text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                {Icon && <Icon className="w-3 h-3"/>}
                {label}
            </p>
            {isBadge ? (
                 <span className={`mt-1 inline-block text-sm font-semibold px-2 py-0.5 rounded-md ${badgeColors[value.toLowerCase()] || 'bg-slate-700 text-slate-300'}`}>
                    {value}
                </span>
            ) : (
                <p className="text-base font-semibold text-white mt-1">{value}</p>
            )}
        </div>
    );
};