"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
    Users, Calendar, Play, TrendingUp, BookOpen, Briefcase, FileText, Search, Plus, Brain, Download, Activity, LogOut, Eye, Trash2, MoreVertical,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { LeadDetailModal } from '@/components/LeadDetailModal';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { StudentDetailModal } from '@/components/StudentDetailModal';
import { StudentConfirmationModal } from '@/components/StudentConfirmationModal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { InstructorDetailModal } from '@/components/InstructorDetailModal';
import { InstructorConfirmationModal } from '@/components/InstructorConfirmationModel';
import { ClientOnlyDate } from '@/components/ClientOnlyDate';
import { useAuth } from '@/contexts/AuthContext'; // 1. Import the main useAuth hook

// --- TYPE DEFINITIONS ---
interface Lead {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    experience: string;
    date: string;
    type: string;
    preferredTime?: string;
    goal?: string;
    notes?: string;
    status?: string;
}

interface Instructor {
    _id: string;
    name: string;
    email: string;
    courses: string;
    rating: string;
    status: string;
}

interface Student {
    _id: string;
    name: string;
    email: string;
    course: string;
    progress: string;
    status: string;
    joined: string;
}

// CORRECTED: 'students' is now a string to match the database
interface Course {
    _id: string;
    title: string;
    instructor: string;
    students: string;
    status: string;
    createdAt: string;
}

interface Stat {
    id: string;
    title: string;
    value: string;
    icon: React.ElementType;
    color: string;
    href?: string;
}

// ADDED: Interface for Blog posts
interface Blog {
    slug: string;
    title: string;
    author: string;
    category: string;
    image: string;
    publishedDate: string;
}

const iconMap: { [key: string]: React.ElementType } = {
    Users, Calendar, Play, TrendingUp, BookOpen, Briefcase, FileText,
};

// --- HELPER FUNCTIONS ---
const getTypeColor = (type: string) => {
    switch (type) {
        case 'Schedule Call': return "border-cyan-700 text-cyan-300";
        case 'Join Projects': return "border-purple-700 text-purple-300";
        case 'Course Recommendation': return "border-blue-700 text-blue-300";
        default: return "border-slate-700 text-slate-300";
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Active': return "bg-emerald-900/40 border-emerald-700/50 text-emerald-400";
        case 'Completed': return "bg-blue-900/40 border-blue-700/50 text-blue-400";
        case 'Published': return "bg-green-900/40 border-green-700/50 text-green-400";
        default: return "bg-slate-800 border-slate-700 text-slate-300";
    }
};

export default function SuperAdminDashboard() {
    const [activeView, setActiveView] = useState('leads');
    const [stats, setStats] = useState<Stat[]>([]);
    const [viewData, setViewData] = useState<any>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
    const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);
    const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
    const [instructorToDelete, setInstructorToDelete] = useState<Instructor | null>(null);
    const router = useRouter();
    const { logout: mainAppLogout } = useAuth(); // 2. Get the logout function from the main context


    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                const [statsRes, leadsRes, scheduleCallsRes, joinProjectsRes, studentsRes, instructorsRes, coursesRes, blogsRes] = await Promise.all([
                    axios.get('/api/super-admin/stats'),
                    axios.get('/api/super-admin/data?view=leads'),
                    axios.get('/api/super-admin/data?view=scheduleCalls'),
                    axios.get('/api/super-admin/data?view=joinProjects'),
                    axios.get('/api/super-admin/data?view=students'),
                    axios.get('/api/super-admin/data?view=instructors'),
                    axios.get('/api/super-admin/data?view=courses'),
                    axios.get('/api/super-admin/data?view=blogs'),
                ]);

                const fetchedStats = statsRes.data.map((stat: any) => ({ ...stat, icon: iconMap[stat.icon] || Users }));
                setStats(fetchedStats);

                setViewData({
                    leads: { title: 'Leads', data: leadsRes.data, columns: ['Name', 'Contact', 'Type', 'Experience', 'Date', 'Actions'] },
                    scheduleCalls: { title: 'Schedule Calls', data: scheduleCallsRes.data, columns: ['Name', 'Contact', 'Type', 'Experience', 'Date', 'Actions'] },
                    joinProjects: { title: 'Join Projects', data: joinProjectsRes.data, columns: ['Name', 'Contact', 'Type', 'Experience', 'Date', 'Actions'] },
                    students: { title: 'Students', data: studentsRes.data, columns: ['Name', 'Contact', 'Course', 'Progress', 'Status', 'Joined', 'Actions'] },
                    courses: { title: 'Courses', data: coursesRes.data, columns: ['Title', 'Instructor', 'Students', 'Status', 'Created', 'Actions'] },
                    instructors: { title: 'Instructors', data: instructorsRes.data, columns: ['Name', 'Contact', 'Courses', 'Rating', 'Status', 'Actions'] },
                    // CORRECTED: Updated columns for blogs
                    blogs: { title: 'Blogs', data: blogsRes.data, columns: ['Title', 'Author', 'Category', 'Published', 'Actions'] },
                });
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const currentView = viewData[activeView];
    const viewsWithoutAddButton = ['leads', 'scheduleCalls', 'joinProjects'];

    const handleLogout = async () => {
        try {
            // This is the key: Call the main app's logout function first
            await mainAppLogout();

            // Any other super-admin specific cleanup can go here
            // For example: localStorage.removeItem('superAdminToken');

        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            // Finally, force a hard redirect to the super-admin login page
            // This ensures all user states are cleared from the browser
            window.location.href = '/super-admin/login';
        }
    };
    const handleViewStudent = (student: Student) => {
        setSelectedStudent(student);
        setIsStudentModalOpen(true);
    };
    const handleDeleteStudent = (student: Student) => {
        setStudentToDelete(student);
        setIsConfirmOpen(true);
    };
    const confirmDelete = () => {
        if (studentToDelete) alert(`Deleting ${studentToDelete.name}`);
        setIsConfirmOpen(false);
        setStudentToDelete(null);
    };
    const confirmBlock = () => {
        if (studentToDelete) alert(`Blocking ${studentToDelete.name}`);
        setIsConfirmOpen(false);
        setStudentToDelete(null);
    };
    const handleViewClick = (lead: Lead) => {
        setSelectedLead(lead);
        setIsModalOpen(true);
    };
    const handleDeleteClick = (lead: Lead) => {
        setLeadToDelete(lead);
        setIsConfirmOpen(true);
    };
    const handleConfirmDelete = () => {
        if (leadToDelete) {
            console.log("Deleting lead:", leadToDelete._id);
            alert(`Lead "${leadToDelete.name}" has been deleted.`);
        } else if (instructorToDelete) {
            console.log("Deleting instructor:", instructorToDelete._id);
            alert(`Instructor "${instructorToDelete.name}" has been deleted.`);
        }
        setIsConfirmOpen(false);
        setLeadToDelete(null);
        setInstructorToDelete(null);
    };
    const handleViewInstructor = (instructor: Instructor) => {
        setSelectedInstructor(instructor);
        setIsInstructorModalOpen(true);
    };
    const handleDeleteInstructor = (instructor: Instructor) => {
        setInstructorToDelete(instructor);
        setIsConfirmOpen(true);
    };
    const handleConfirmInstructorBlock = () => {
        if (instructorToDelete) alert(`Blocking ${instructorToDelete.name}`);
        setIsConfirmOpen(false);
        setInstructorToDelete(null);
    };

    const renderTableRow = (item: any, index: number) => {
        if (!item) {
            return <TableRow key={index}><TableCell colSpan={currentView?.columns.length || 7} className="text-center text-slate-400 py-10">No data available for this view yet.</TableCell></TableRow>;
        }
        switch (activeView) {
            case 'students':
                return (
                    <TableRow key={item._id} className="border-b-slate-800 hover:bg-slate-800/30">
                        <TableCell className="font-medium text-slate-50">{item.name}</TableCell>
                        <TableCell className="text-slate-400">{item.email}</TableCell>
                        <TableCell className="text-slate-400">{item.course || 'N/A'}</TableCell>
                        <TableCell className="text-slate-400">{item.progress || '0%'}</TableCell>
                        <TableCell><Badge className={getStatusColor(item.status || 'Unknown')}>{item.status || 'Unknown'}</Badge></TableCell>
                        <TableCell className="text-slate-400"><ClientOnlyDate dateString={item.joined} /></TableCell>
                        <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleViewStudent(item)}><Eye className="w-4 h-4 mr-2" />View</Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteStudent(item)}><Trash2 className="w-4 h-4" /></Button>
                                <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" size="icon" className="w-8 h-8"><MoreVertical className="w-4 h-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end" className="bg-slate-900 border-slate-700 text-slate-50"><DropdownMenuItem onSelect={() => alert('Viewing Stats')}>View All Stats</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
                            </div>
                        </TableCell>
                    </TableRow>
                );
            case 'instructors':
                return (
                    <TableRow key={item._id} className="border-b-slate-800 hover:bg-slate-800/30">
                        <TableCell className="font-medium text-slate-50">{item.name}</TableCell>
                        <TableCell className="text-slate-400">{item.email}</TableCell>
                        <TableCell className="text-slate-400">{item.courses || '0'}</TableCell>
                        <TableCell className="text-slate-400">{item.rating || 'N/A'}</TableCell>
                        <TableCell><Badge className={getStatusColor(item.status || 'Unknown')}>{item.status || 'Unknown'}</Badge></TableCell>
                        <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleViewInstructor(item)}><Eye className="w-4 h-4 mr-2" />View</Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteInstructor(item)}><Trash2 className="w-4 h-4" /></Button>
                                <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" size="icon" className="w-8 h-8"><MoreVertical className="w-4 h-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end" className="bg-slate-900 border-slate-700 text-slate-50"><DropdownMenuItem onSelect={() => alert('Viewing Stats')}>View All Stats</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
                            </div>
                        </TableCell>
                    </TableRow>
                );
            case 'courses':
                return (
                    <TableRow key={item._id} className="border-b-slate-800 hover:bg-slate-800/30">
                        <TableCell className="font-medium text-base text-slate-50">{item.title}</TableCell>
                        <TableCell className="text-base text-slate-400">{item.instructor || 'N/A'}</TableCell>
                        <TableCell className="text-base text-slate-400">{item.students || '0'}</TableCell>
                        <TableCell><Badge className={getStatusColor(item.status)}>{item.status}</Badge></TableCell>
                        <TableCell className="text-base text-slate-400"><ClientOnlyDate dateString={item.createdAt} /></TableCell>
                        <TableCell className="text-right">{/* Actions */}</TableCell>
                    </TableRow>
                );
            // ADDED: Case for rendering blog posts
            case 'blogs':
                return (
                    <TableRow key={item.slug} className="border-b-slate-800 hover:bg-slate-800/30">
                        <TableCell className="font-medium text-base text-slate-50">{item.title}</TableCell>
                        <TableCell className="text-base text-slate-400">{item.author}</TableCell>
                        <TableCell className="text-base text-slate-400">{item.category}</TableCell>
                        <TableCell className="text-base text-slate-400"><ClientOnlyDate dateString={item.publishedDate} /></TableCell>
                        <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                                <Link href={`/blog/${item.slug}`} target="_blank">
                                    <Button variant="outline" size="sm"><Eye className="w-4 h-4 mr-2" />View</Button>
                                </Link>
                            </div>
                        </TableCell>
                    </TableRow>
                );
            default:
                return (
                    <TableRow key={item._id} className="border-b-slate-800 hover:bg-slate-800/30">
                        <TableCell className="font-medium text-slate-50">{item.name}</TableCell>
                        <TableCell className="text-slate-400">{item.email}</TableCell>
                        <TableCell><Badge variant="outline" className={getTypeColor(item.type)}>{item.type}</Badge></TableCell>
                        <TableCell className="text-slate-400">{item.experience}</TableCell>
                        <TableCell className="text-slate-400"><ClientOnlyDate dateString={item.date} /></TableCell>
                        <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleViewClick(item)}><Eye className="w-4 h-4 mr-2" /> View</Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(item)} className='text-white font-semibold bg-red-600 hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/25'><Trash2 className="w-4 h-4 mr-2" /> Delete</Button>
                            </div>
                        </TableCell>
                    </TableRow>
                );
        }
    };

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen bg-black text-white">Loading Dashboard...</div>
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <motion.div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" animate={{ x: [-50, 50, -50], y: [-50, 50, -50], scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} style={{ left: "10%", top: "20%" }} />
                <motion.div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" animate={{ x: [50, -50, 50], y: [50, -50, 50], scale: [1.1, 1, 1.1] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} style={{ right: "10%", bottom: "20%" }} />
            </div>
            <div className="relative z-10">
                <header className="sticky top-0 bg-black/50 backdrop-blur-lg border-b border-gray-700/50">
                    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg"><Brain className="w-5 h-5 text-white" /></div>
                                <div>
                                    <h1 className="text-xl font-bold text-white">Super Admin Panel</h1>
                                    <p className="text-xs text-gray-400">Manage LMS, Courses, Users, and Content</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link href="/super-admin/courses"><Button variant="outline"><BookOpen className="w-4 h-4 mr-2" />Courses</Button></Link>
                                <Link href="/super-admin/careers"><Button variant="outline"><Briefcase className="w-4 h-4 mr-2" />Careers</Button></Link>
                                <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export</Button>
                                <Button onClick={() => window.location.reload()} className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"><Activity className="h-4 w-4 mr-2" /> Refresh</Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleLogout}
                                    className='text-white font-semibold bg-red-600 hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/25'
                                >
                                    <LogOut className="h-4 w-4 mr-2" /> Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>
                {/* STYLING UPDATE: Added padding here */}
                <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
                        {stats.map((stat, index) => {
                            const isClickable = stat.id in viewData;
                            const cardContent = (<motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} onClick={() => isClickable && setActiveView(stat.id)} className={`bg-black/50 border rounded-xl p-4 shadow-lg transition-all duration-300 group ${isClickable ? 'cursor-pointer' : 'cursor-default'} ${activeView === stat.id ? `border-${stat.color}-500/80 shadow-${stat.color}-500/20` : `border-slate-700/50 ${isClickable ? `hover:border-${stat.color}-500/60` : ''}`}`}><div className="flex items-start justify-between"><div><p className="text-sm text-gray-400">{stat.title}</p><p className="text-2xl font-bold text-white mt-1">{stat.value}</p></div><div className={`p-2 rounded-lg bg-${stat.color}-500/10`}><stat.icon className={`h-5 w-5 text-${stat.color}-400`} /></div></div></motion.div>);
                            return stat.href ? <Link href={stat.href} key={stat.id}>{cardContent}</Link> : cardContent;
                        })}
                    </div>
                    <div className="bg-black/50 backdrop-blur-lg border border-gray-700/50 rounded-lg p-4 mb-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="relative w-full sm:max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /><Input placeholder="Search entries..." className="pl-10 bg-slate-800/50 border-slate-700 focus:border-cyan-500" /></div>
                            {!viewsWithoutAddButton.includes(activeView) && (<Button className="bg-gradient-to-r from-cyan-500 to-purple-500"><Plus className="h-4 w-4 mr-2" /> Add New {currentView?.title?.slice(0, -1) || 'Entry'}</Button>)}
                        </div>
                    </div>
                    {/* STYLING UPDATE: Added horizontal padding (px-6) */}
                    {currentView ? (<div className="bg-black/50 backdrop-blur-lg border border-gray-700/50 rounded-lg overflow-hidden px-6"><div className="p-4 border-b border-slate-700/50 -mx-6 px-6"><h2 className="text-xl font-semibold text-white">{currentView.title} Table</h2></div><Table><TableHeader><TableRow className="border-b-slate-700/50 hover:bg-transparent">{currentView.columns.map((col: string) => <TableHead key={col} className={`text-lg ${col === 'Actions' ? 'text-right' : ''}`}>{col}</TableHead>)}</TableRow></TableHeader><TableBody>{currentView.data.length > 0 ? currentView.data.map(renderTableRow) : renderTableRow(null, 0)}</TableBody></Table></div>) : (<div className="bg-black/50 backdrop-blur-lg border border-gray-700/50 rounded-lg overflow-hidden p-10 text-center text-slate-400">Select a category to view data.</div>)}
                </main>
            </div>
            <LeadDetailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} lead={selectedLead} />
            <ConfirmationModal isOpen={isConfirmOpen && !!leadToDelete} onClose={() => { setIsConfirmOpen(false); setLeadToDelete(null); }} onConfirm={handleConfirmDelete} title="Are you sure?" description={`This action cannot be undone. This will permanently delete the lead for "${leadToDelete?.name}".`} />
            <StudentDetailModal isOpen={isStudentModalOpen} onClose={() => setIsStudentModalOpen(false)} student={selectedStudent} />
            <StudentConfirmationModal isOpen={isConfirmOpen && !!studentToDelete} onClose={() => { setIsConfirmOpen(false); setStudentToDelete(null); }} onConfirmDelete={confirmDelete} onConfirmBlock={confirmBlock} studentName={studentToDelete?.name || ''} />
            <InstructorDetailModal isOpen={isInstructorModalOpen} onClose={() => setIsInstructorModalOpen(false)} instructor={selectedInstructor} />
            <InstructorConfirmationModal isOpen={isConfirmOpen && !!instructorToDelete} onClose={() => { setIsConfirmOpen(false); setInstructorToDelete(null); }} onConfirmDelete={handleConfirmDelete} onConfirmBlock={handleConfirmInstructorBlock} title="Confirm Action on Instructor" description={`Are you sure you want to proceed with this action for "${instructorToDelete?.name}"?`} itemType="instructor" instructorName={instructorToDelete?.name || ''} />
        </div>
    );
}