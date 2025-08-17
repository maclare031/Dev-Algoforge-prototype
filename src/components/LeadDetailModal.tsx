"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Phone, User, Calendar, Info } from "lucide-react";

// Define the structure of a lead
interface Lead {
  name: string;
  email: string;
  phone?: string;
  experience: string;
  date: string;
  type: string;
  preferredTime?: string;
  goal?: string;
  notes?: string;
}

interface LeadDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
}

export function LeadDetailModal({ isOpen, onClose, lead }: LeadDetailModalProps) {
  if (!lead) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#111827] border-slate-700 text-white max-w-lg p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
            </div>
            <div>
                <DialogTitle className="text-xl font-bold text-white">Lead Details</DialogTitle>
                <p className="text-sm text-slate-400">AI/ML Program Interest</p>
            </div>
          </div>
           {/* REDUNDANT BUTTON REMOVED FROM HERE */}
        </DialogHeader>

        <div className="px-6 pb-6 space-y-4">
            {/* Main Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard label="Name" value={lead.name} />
                <InfoCard label="Form Type" value={lead.type} isBadge={true} />
                <InfoCard label="Email" value={lead.email} />
                <InfoCard label="Phone" value={lead.phone || 'N/A'} />
                <InfoCard label="Experience Level" value={lead.experience} isBadge={true} />
                <InfoCard label="Submitted" value={new Date(lead.date).toLocaleString()} />
            </div>

            {/* Call Details Section */}
            {(lead.preferredTime || lead.goal) && (
                <div className="space-y-4">
                    <h3 className="text-base font-semibold text-slate-300 flex items-center gap-2 border-t border-slate-700 pt-4">
                        <Calendar className="w-4 h-4 text-cyan-400"/>
                        Call Details
                    </h3>
                    {lead.preferredTime && <InfoCard label="Preferred Time" value={lead.preferredTime} />}
                    {lead.goal && <InfoCard label="Goal" value={lead.goal} />}
                </div>
            )}
            
            {/* Additional Notes Section */}
            {lead.notes && (
                <div className="space-y-4">
                     <h3 className="text-base font-semibold text-slate-300 flex items-center gap-2 border-t border-slate-700 pt-4">
                        <Info className="w-4 h-4 text-cyan-400"/>
                        Additional Notes
                    </h3>
                    <InfoCard label="Notes" value={lead.notes} />
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 border-t border-slate-700 pt-4 mt-4">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Mail className="w-4 h-4 mr-2"/>
                    Send Email
                </Button>
                <Button variant="outline" className="flex-1">
                    <Phone className="w-4 h-4 mr-2"/>
                    Call
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Helper component for displaying info cards in the modal
const InfoCard = ({ label, value, isBadge = false }: { label: string, value: string, isBadge?: boolean }) => {
    const badgeColors: { [key: string]: string } = {
        'intermediate': 'bg-orange-900/40 border-orange-700/50 text-orange-400',
        'schedule call': 'bg-cyan-900/40 border-cyan-700/50 text-cyan-400',
        'join projects': 'bg-purple-900/40 border-purple-700/50 text-purple-400',
        'general inquiry': 'bg-slate-700 text-slate-300',
        'beginner': 'bg-emerald-900/40 border-emerald-700/50 text-emerald-400',
        'advanced': 'bg-rose-900/40 border-rose-700/50 text-rose-400'
    };

    return (
        <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
            <p className="text-xs text-slate-400 uppercase tracking-wider">{label}</p>
            {isBadge ? (
                <span className={`mt-1 inline-block text-sm font-semibold px-2 py-0.5 rounded-md capitalize ${badgeColors[value.toLowerCase()] || 'bg-slate-700 text-slate-300'}`}>
                    {value}
                </span>
            ) : (
                <p className="text-base font-semibold text-white mt-1">{value}</p>
            )}
        </div>
    );
};