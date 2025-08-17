"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2, XCircle, ShieldOff } from "lucide-react";

interface InstructorConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  onConfirmBlock: () => void;
  title: string;
  description: string;
  instructorName: string;
  itemType: string;
}

export function InstructorConfirmationModal({ isOpen, onClose, onConfirmDelete, onConfirmBlock, instructorName }: InstructorConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#111827] border-red-500/50 text-white max-w-md p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/30">
                <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div>
                <DialogTitle className="text-xl font-bold text-white">Confirm Action</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6">
            <DialogDescription className="text-slate-400 mb-6">
                Are you sure you want to proceed with this action for the instructor "{instructorName}"? This cannot be undone.
            </DialogDescription>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={onClose} className="sm:flex-1">
                    <XCircle className="w-4 h-4 mr-2"/>
                    Cancel
                </Button>
                <Button variant="destructive" onClick={onConfirmBlock} className="sm:flex-1 bg-yellow-600 hover:bg-yellow-700 text-white">
                    <ShieldOff className="w-4 h-4 mr-2"/>
                    Block
                </Button>
                 <Button variant="destructive" onClick={onConfirmDelete} className="sm:flex-1  bg-red-500 hover:bg-red-600 text-white">
                    <Trash2 className="w-4 h-4 mr-2"/>
                    Delete
                </Button>
            </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}