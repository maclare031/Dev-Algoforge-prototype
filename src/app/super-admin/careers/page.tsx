"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Mail,
  Phone,
  Eye,
  Download,
  Activity,
  Loader2,
  Briefcase,
  Calendar,
  MapPin,
  Globe,
  FileText,
  ExternalLink,
  X,
  Brain,
  CheckCircle,
  Clock,
  User,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Applicant {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  experienceLevel?: string;
  portfolioUrl?: string;
  coverLetter?: string;
  resumeFilename: string;
  resumeOriginalName: string;
  status: string;
  createdAt: string;
  fullName: string;
}

interface Stats {
  total: number;
  pending: number;
  reviewing: number;
  shortlisted: number;
  rejected: number;
  hired: number;
}

export default function CareersAdminDashboard() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [filteredApplicants, setFilteredApplicants] = useState<Applicant[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    reviewing: 0,
    shortlisted: 0,
    rejected: 0,
    hired: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPosition, setFilterPosition] = useState('all');
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [applicantsPerPage] = useState(10);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  // Fetch applicants data
  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/careers');
      const applicantsData = response.data.data;
      setApplicants(applicantsData);
      setFilteredApplicants(applicantsData);
      calculateStats(applicantsData);
    } catch (error) {
      console.error('Error fetching applicants:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const calculateStats = (applicantsData: Applicant[]) => {
    const stats = {
      total: applicantsData.length,
      pending: applicantsData.filter(app => app.status === 'pending').length,
      reviewing: applicantsData.filter(app => app.status === 'reviewing').length,
      shortlisted: applicantsData.filter(app => app.status === 'shortlisted').length,
      rejected: applicantsData.filter(app => app.status === 'rejected').length,
      hired: applicantsData.filter(app => app.status === 'hired').length,
    };
    setStats(stats);
  };

  // Filter applicants based on search and filter criteria
  useEffect(() => {
    let filtered = applicants;

    if (filterPosition !== 'all') {
      filtered = filtered.filter(app => app.position === filterPosition);
    }

    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredApplicants(filtered);
    setCurrentPage(1);
  }, [applicants, searchTerm, filterPosition]);

  useEffect(() => {
    fetchApplicants();
  }, []);

  // Pagination logic
  const indexOfLastApplicant = currentPage * applicantsPerPage;
  const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
  const currentApplicants = filteredApplicants.slice(indexOfFirstApplicant, indexOfLastApplicant);
  const totalPages = Math.ceil(filteredApplicants.length / applicantsPerPage);

  // Export data as CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Position', 'Experience Level', 'Status', 'Applied Date'];
    const csvContent = [
      headers.join(','),
      ...filteredApplicants.map(app => [
        app.fullName,
        app.email,
        app.phone || '',
        app.position,
        app.experienceLevel || '',
        app.status,
        new Date(app.createdAt).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'career-applicants-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getPositionColor = (position: string) => {
    const colors = {
      'senior-ml-engineer': 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-700 border border-cyan-500/30',
      'ai-researcher': 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 border border-purple-500/30',
      'data-instructor': 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-700 border border-emerald-500/30',
      'backend-dev': 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 text-orange-700 border border-orange-500/30',
      'frontend-dev': 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-700 border border-pink-500/30',
      'other': 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-700 border border-gray-500/30'
    };
    return colors[position as keyof typeof colors] || colors.other;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-700 border border-yellow-500/30',
      'reviewing': 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-700 border border-blue-500/30',
      'shortlisted': 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-700 border border-emerald-500/30',
      'rejected': 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-700 border border-red-500/30',
      'hired': 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-700 border border-purple-500/30'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Loading Dashboard...</h2>
          <p className="text-gray-400">Fetching career applicants data</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900/95 to-black relative overflow-hidden mt-5">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [-50, 50, -50], 
            y: [-50, 50, -50],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: "10%", top: "20%" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [50, -50, 50], 
            y: [50, -50, 50],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ right: "10%", bottom: "20%" }}
        />
      </div>

      {/* Enhanced Header */}
      <div className="relative z-10 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border-b border-gray-700/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-6 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white">Careers Dashboard</h1>
                  <p className="text-gray-400 text-sm">Manage job applications and track hiring process</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2 sm:gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Button
                onClick={() => window.location.href = '/admin'}
                variant="outline"
                className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/50 text-gray-300 hover:text-white hover:border-cyan-500/50 transition-all duration-300 text-sm"
              >
                <Users className="h-4 w-4 mr-1" />
                Leads
              </Button>
              <Button
                onClick={exportToCSV}
                variant="outline"
                className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/50 text-gray-300 hover:text-white hover:border-cyan-500/50 transition-all duration-300 text-sm"
              >
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button
                onClick={fetchApplicants}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 text-sm"
              >
                <Activity className="h-4 w-4 mr-1" />
                Refresh
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-500/50 text-red-300 hover:bg-red-500/10 hover:text-red-200 font-medium px-4 xl:px-6 py-2.5 xl:py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 flex items-center space-x-2"
              >
                <span className="hidden xl:inline">Logout</span>
                <span className="xl:hidden">Out</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group"
          >
            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 sm:p-6 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-cyan-500/30">
                  <Users className="h-6 w-6 text-cyan-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Total Applications</p>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group"
          >
            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 sm:p-6 shadow-xl hover:border-yellow-500/30 transition-all duration-300">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl flex items-center justify-center border border-yellow-500/30">
                  <Clock className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Pending Review</p>
                  <p className="text-2xl font-bold text-white">{stats.pending}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group"
          >
            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 sm:p-6 shadow-xl hover:border-emerald-500/30 transition-all duration-300">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Shortlisted</p>
                  <p className="text-2xl font-bold text-white">{stats.shortlisted}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group"
          >
            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 sm:p-6 shadow-xl hover:border-purple-500/30 transition-all duration-300">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                  <Brain className="h-6 w-6 text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Hired</p>
                  <p className="text-2xl font-bold text-white">{stats.hired}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 sm:p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, email, or position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                  />
                </div>
              </div>
              <Select value={filterPosition} onValueChange={setFilterPosition}>
                <SelectTrigger className="w-full sm:w-48 bg-gray-800/50 border-gray-600/50 text-white">
                  <SelectValue placeholder="Filter by position" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all" className="text-white hover:bg-gray-700">All Positions</SelectItem>
                  <SelectItem value="senior-ml-engineer" className="text-white hover:bg-gray-700">Senior ML Engineer</SelectItem>
                  <SelectItem value="ai-researcher" className="text-white hover:bg-gray-700">AI Researcher</SelectItem>
                  <SelectItem value="data-instructor" className="text-white hover:bg-gray-700">Data Science Instructor</SelectItem>
                  <SelectItem value="backend-dev" className="text-white hover:bg-gray-700">Backend Developer</SelectItem>
                  <SelectItem value="frontend-dev" className="text-white hover:bg-gray-700">Frontend Developer</SelectItem>
                  <SelectItem value="other" className="text-white hover:bg-gray-700">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Applicants Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-cyan-500/30">
                    <Briefcase className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-white">Career Applications</h2>
                    <p className="text-gray-400 text-sm">
                      {filteredApplicants.length} total applications
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="text-left py-3 px-4 font-medium text-gray-300 text-sm">Applicant</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300 text-sm">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300 text-sm">Position</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300 text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300 text-sm">Applied</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentApplicants.map((applicant, index) => (
                    <motion.tr
                      key={applicant._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-white">{applicant.fullName}</p>
                          {applicant.experienceLevel && (
                            <p className="text-sm text-gray-400">
                              {applicant.experienceLevel} level
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-300">
                            <Mail className="h-3 w-3 mr-1 text-cyan-400" />
                            {applicant.email}
                          </div>
                          {applicant.phone && (
                            <div className="flex items-center text-sm text-gray-300">
                              <Phone className="h-3 w-3 mr-1 text-emerald-400" />
                              {applicant.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${getPositionColor(applicant.position)}`}>
                          {applicant.position.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(applicant.status)}`}>
                          {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <p className="text-white">
                            {new Date(applicant.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-gray-400">
                            {new Date(applicant.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedApplicant(applicant);
                              setShowDetailModal(true);
                            }}
                            className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:text-white hover:border-cyan-500/50 transition-all duration-300"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`mailto:${applicant.email}`, '_blank')}
                            className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:text-white hover:border-emerald-500/50 transition-all duration-300"
                          >
                            <Mail className="h-3 w-3" />
                          </Button>
                          {applicant.phone && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`tel:${applicant.phone}`, '_blank')}
                              className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:text-white hover:border-blue-500/50 transition-all duration-300"
                            >
                              <Phone className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 border-t border-gray-700/50 gap-3">
                <p className="text-sm text-gray-400">
                  Showing {indexOfFirstApplicant + 1} to {Math.min(indexOfLastApplicant, filteredApplicants.length)} of {filteredApplicants.length} results
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:text-white hover:border-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-gray-400 px-3">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:text-white hover:border-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Enhanced Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedApplicant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-3 sm:p-4"
            onClick={() => setShowDetailModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">Applicant Details</h2>
                      <p className="text-gray-400 text-sm">Career Application Review</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDetailModal(false)}
                    className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:text-white hover:border-red-500/50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Full Name</label>
                    <p className="text-lg font-semibold text-white mt-1">{selectedApplicant.fullName}</p>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Position</label>
                    <div className="mt-2">
                      <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${getPositionColor(selectedApplicant.position)}`}>
                        {selectedApplicant.position.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Email</label>
                    <p className="text-white mt-1">{selectedApplicant.email}</p>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Phone</label>
                    <p className="text-white mt-1">{selectedApplicant.phone || 'Not provided'}</p>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Experience Level</label>
                    <p className="text-white mt-1">{selectedApplicant.experienceLevel || 'Not specified'}</p>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Applied Date</label>
                    <p className="text-white mt-1">
                      {new Date(selectedApplicant.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Portfolio URL */}
                {selectedApplicant.portfolioUrl && (
                  <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Portfolio/LinkedIn</label>
                    <div className="mt-2">
                      <a 
                        href={selectedApplicant.portfolioUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2"
                      >
                        <Globe className="w-4 h-4" />
                        {selectedApplicant.portfolioUrl}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}

                {/* Cover Letter */}
                {selectedApplicant.coverLetter && (
                  <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Cover Letter</label>
                    <p className="text-white mt-1 whitespace-pre-wrap">{selectedApplicant.coverLetter}</p>
                  </div>
                )}

                {/* Resume Info */}
                <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Resume</label>
                  <div className="mt-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span className="text-white">{selectedApplicant.resumeOriginalName}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`/uploads/resumes/${selectedApplicant.resumeFilename}`, '_blank')}
                      className="ml-auto bg-gray-700/50 border-gray-600/50 text-gray-300 hover:text-white hover:border-cyan-500/50"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-700/50">
                  <Button
                    onClick={() => window.open(`mailto:${selectedApplicant.email}`, '_blank')}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 flex-1"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  {selectedApplicant.phone && (
                    <Button
                      variant="outline"
                      onClick={() => window.open(`tel:${selectedApplicant.phone}`, '_blank')}
                      className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:text-white hover:border-emerald-500/50 flex-1"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
