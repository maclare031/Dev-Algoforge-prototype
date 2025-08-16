"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Calendar,
  Play,
  Search,
  Filter,
  Download,
  Eye,
  Mail,
  Phone,
  Clock,
  MapPin,
  Star,
  TrendingUp,
  Activity,
  BarChart3,
  FileText,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  Brain,
  Sparkles,
  Shield,
  Zap,
  X,
  BookOpen,
  Briefcase,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AuthGuard } from '@/components/AuthGuard';

interface Lead {
  _id: string;
  formType: 'ScheduleCall' | 'JoinProjects' | 'Recommendation' | 'EnterpriseSolutions' | 'EnterpriseDemo';
  name: string;
  email: string;
  phone?: string;
  experienceLevel: string;
  interests?: string[] | string;
  goal?: string;
  availability?: string;
  preferredTime?: string;
  notes?: string;
  metadata?: {
    ip?: string;
    utmSource?: string;
    referrer?: string;
  };
  createdAt: string;
}

interface Stats {
  total: number;
  scheduleCall: number;
  joinProjects: number;
  recommendation: number;
  enterprise: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
}

function AdminDashboardContent() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    scheduleCall: 0,
    joinProjects: 0,
    recommendation: 0,
    enterprise: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(10);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  // Fetch leads data
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/leads?limit=1000');
      const leadsData = response.data.data;
      setLeads(leadsData);
      setFilteredLeads(leadsData);
      calculateStats(leadsData);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const calculateStats = (leadsData: Lead[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const stats = {
      total: leadsData.length,
      scheduleCall: leadsData.filter(lead => lead.formType === 'ScheduleCall').length,
      joinProjects: leadsData.filter(lead => lead.formType === 'JoinProjects').length,
      recommendation: leadsData.filter(lead => lead.formType === 'Recommendation').length,
      enterprise: leadsData.filter(lead => lead.formType === 'EnterpriseSolutions' || lead.formType === 'EnterpriseDemo').length,
      today: leadsData.filter(lead => new Date(lead.createdAt) >= today).length,
      thisWeek: leadsData.filter(lead => new Date(lead.createdAt) >= thisWeek).length,
      thisMonth: leadsData.filter(lead => new Date(lead.createdAt) >= thisMonth).length,
    };

    setStats(stats);
  };

  // Filter leads based on search and filter criteria
  useEffect(() => {
    let filtered = leads;

    if (filterType !== 'all') {
      filtered = filtered.filter(lead => lead.formType === filterType);
    }

    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.experienceLevel.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLeads(filtered);
    setCurrentPage(1);
  }, [leads, searchTerm, filterType]);

  useEffect(() => {
    fetchLeads();
  }, []);

  // Pagination logic
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

  // Export data as CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Form Type', 'Experience Level', 'Created At'];
    const csvContent = [
      headers.join(','),
      ...filteredLeads.map(lead => [
        lead.name,
        lead.email,
        lead.phone || '',
        lead.formType,
        lead.experienceLevel,
        new Date(lead.createdAt).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getFormTypeColor = (type: string) => {
    const colors = {
      'ScheduleCall': 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-700 border border-cyan-500/30',
      'JoinProjects': 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 border border-purple-500/30',
      'Recommendation': 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-700 border border-green-500/30',
      'EnterpriseSolutions': 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-700 border border-orange-500/30',
      'EnterpriseDemo': 'bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-700 border border-red-500/30'
    };
    return colors[type as keyof typeof colors] || 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-700 border border-gray-500/30';
  };

  const getFormTypeDisplayName = (type: string) => {
    const displayNames = {
      'ScheduleCall': 'Schedule Call',
      'JoinProjects': 'Join Projects',
      'Recommendation': 'Course Recommendation',
      'EnterpriseSolutions': 'Enterprise Solutions',
      'EnterpriseDemo': 'Enterprise Demo'
    };
    return displayNames[type as keyof typeof displayNames] || type;
  };

  const getExperienceColor = (level: string) => {
    const colors = {
      'Beginner': 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-700 border border-emerald-500/30',
      'Intermediate': 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 text-orange-700 border border-orange-500/30',
      'Advanced': 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-700 border border-purple-500/30',
      'Expert': 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-700 border border-red-500/30'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
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
          <p className="text-gray-400">Fetching your AI/ML leads data</p>
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
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white">Admin Dashboard</h1>
                  <p className="text-gray-400 text-sm">Manage leads and track AI learning conversions</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2 sm:gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Button
                onClick={() => window.location.href = '/admin/courses'}
                variant="outline"
                className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/50 text-gray-300 hover:text-white hover:border-cyan-500/50 transition-all duration-300 text-sm"
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Courses
              </Button>
              <Button
                onClick={() => window.location.href = '/admin/careers'}
                variant="outline"
                className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/50 text-gray-300 hover:text-white hover:border-cyan-500/50 transition-all duration-300 text-sm"
              >
                <Briefcase className="h-4 w-4 mr-1" />
                Careers
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
                onClick={fetchLeads}
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
                  <p className="text-sm font-medium text-gray-400">Total Leads</p>
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
            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 sm:p-6 shadow-xl hover:border-emerald-500/30 transition-all duration-300">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
                  <Calendar className="h-6 w-6 text-emerald-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Schedule Calls</p>
                  <p className="text-2xl font-bold text-white">{stats.scheduleCall}</p>
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
            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 sm:p-6 shadow-xl hover:border-purple-500/30 transition-all duration-300">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                  <Play className="h-6 w-6 text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Join Projects</p>
                  <p className="text-2xl font-bold text-white">{stats.joinProjects}</p>
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
            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 sm:p-6 shadow-xl hover:border-orange-500/30 transition-all duration-300">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center border border-orange-500/30">
                  <TrendingUp className="h-6 w-6 text-orange-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">This Month</p>
                  <p className="text-2xl font-bold text-white">{stats.thisMonth}</p>
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
                    placeholder="Search by name, email, or experience level..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-48 bg-gray-800/50 border-gray-600/50 text-white">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all" className="text-white hover:bg-gray-700">All Types</SelectItem>
                  <SelectItem value="ScheduleCall" className="text-white hover:bg-gray-700">Schedule Call</SelectItem>
                  <SelectItem value="JoinProjects" className="text-white hover:bg-gray-700">Join Projects</SelectItem>
                  <SelectItem value="Recommendation" className="text-white hover:bg-gray-700">Course Recommendation</SelectItem>
                  <SelectItem value="EnterpriseSolutions" className="text-white hover:bg-gray-700">Enterprise Solutions</SelectItem>
                  <SelectItem value="EnterpriseDemo" className="text-white hover:bg-gray-700">Enterprise Demo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Leads Table */}
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
                    <Users className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-white">AI/ML Leads</h2>
                    <p className="text-gray-400 text-sm">
                      {filteredLeads.length} total submissions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="text-left py-3 px-4 font-medium text-gray-300 text-sm">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300 text-sm">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300 text-sm">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300 text-sm">Experience</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300 text-sm">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-300 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLeads.map((lead, index) => (
                    <motion.tr
                      key={lead._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-white">{lead.name}</p>
                          {lead.notes && (
                            <p className="text-sm text-gray-400 truncate max-w-xs">
                              {lead.notes}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-300">
                            <Mail className="h-3 w-3 mr-1 text-cyan-400" />
                            {lead.email}
                          </div>
                          {lead.phone && (
                            <div className="flex items-center text-sm text-gray-300">
                              <Phone className="h-3 w-3 mr-1 text-emerald-400" />
                              {lead.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${getFormTypeColor(lead.formType)}`}>
                          {getFormTypeDisplayName(lead.formType)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${getExperienceColor(lead.experienceLevel)}`}>
                          {lead.experienceLevel}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <p className="text-white">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-gray-400">
                            {new Date(lead.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedLead(lead);
                            setShowDetailModal(true);
                          }}
                          className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:text-white hover:border-cyan-500/50 transition-all duration-300"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
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
                  Showing {indexOfFirstLead + 1} to {Math.min(indexOfLastLead, filteredLeads.length)} of {filteredLeads.length} results
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
        {showDetailModal && selectedLead && (
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
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">Lead Details</h2>
                      <p className="text-gray-400 text-sm">AI/ML Program Interest</p>
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
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Name</label>
                    <p className="text-lg font-semibold text-white mt-1">{selectedLead.name}</p>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Form Type</label>
                    <div className="mt-2">
                      <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${getFormTypeColor(selectedLead.formType)}`}>
                        {getFormTypeDisplayName(selectedLead.formType)}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Email</label>
                    <p className="text-white mt-1">{selectedLead.email}</p>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Phone</label>
                    <p className="text-white mt-1">{selectedLead.phone || 'Not provided'}</p>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Experience Level</label>
                    <div className="mt-2">
                      <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${getExperienceColor(selectedLead.experienceLevel)}`}>
                        {selectedLead.experienceLevel}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Submitted</label>
                    <p className="text-white mt-1">
                      {new Date(selectedLead.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Conditional Fields */}
                {selectedLead.formType === 'ScheduleCall' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-cyan-400" />
                      Call Details
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {selectedLead.preferredTime && (
                        <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                          <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Preferred Time</label>
                          <p className="text-white mt-1">{selectedLead.preferredTime}</p>
                        </div>
                      )}
                      {selectedLead.goal && (
                        <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                          <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Goal</label>
                          <p className="text-white mt-1">{selectedLead.goal}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedLead.formType === 'JoinProjects' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Play className="w-5 h-5 text-purple-400" />
                      Project Details
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {selectedLead.interests && (
                        <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                          <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Interests</label>
                          <p className="text-white mt-1">{selectedLead.interests}</p>
                        </div>
                      )}
                      {selectedLead.availability && (
                        <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                          <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Availability</label>
                          <p className="text-white mt-1">{selectedLead.availability}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {selectedLead.notes && (
                  <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Additional Notes</label>
                    <p className="text-white mt-1">{selectedLead.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-700/50">
                  <Button
                    onClick={() => window.open(`mailto:${selectedLead.email}`, '_blank')}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 flex-1"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  {selectedLead.phone && (
                    <Button
                      variant="outline"
                      onClick={() => window.open(`tel:${selectedLead.phone}`, '_blank')}
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

export default function AdminDashboard() {
  return (
    <AuthGuard requiredRole="admin" redirectTo="/dashboard">
      <AdminDashboardContent />
    </AuthGuard>
  );
}
