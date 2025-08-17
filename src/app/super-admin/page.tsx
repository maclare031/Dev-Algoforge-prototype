"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Users,
    Calendar,
    Play,
    TrendingUp,
    BookOpen,
    Briefcase,
    FileText,
    Search,
    Plus,
    Brain,
    Download,
    Activity,
    LogOut,
    User,
    Eye,
    Trash2,
    MoreVertical, // Import the Trash icon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link';
import { LeadDetailModal } from '@/components/LeadDetailModal';
import { ConfirmationModal } from '@/components/ConfirmationModal'; // Import the new modal
import { StudentDetailModal } from '@/components/StudentDetailModal';
import { StudentConfirmationModal } from '@/components/StudentConfirmationModal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { InstructorDetailModal } from '@/components/InstructorDetailModal';
import { InstructorConfirmationModal } from '@/components/InstructorConfirmationModel'; // Import the new modal
import { ClientOnlyDate } from '@/components/ClientOnlyDate';



// Define the structure of a lead for type safety

interface Lead {
    id: string; // Add a unique ID for deletion purposes
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
    id: string;
    name: string;
    email: string;
    courses: string;
    rating: string;
    status: string;
}

// FIX: Added the missing Student interface
interface Student {
    id: string;
    name: string;
    email: string;
    course: string;
    progress: string;
    status: string;
    joined: string;
}

// --- 1. DATA FOR DIFFERENT VIEWS (WITH IDs) ---

const stats = [
    { id: 'leads', title: "Total Leads", value: "1,284", icon: Users, color: "cyan" },
    { id: 'scheduleCalls', title: "Schedule Calls", value: "327", icon: Calendar, color: "emerald" },
    { id: 'joinProjects', title: "Join Projects", value: "98", icon: Play, color: "purple" },
    { id: 'analytics', title: "This Month's Stats", value: "+12%", icon: TrendingUp, color: "orange", href: "/analytics" },
    { id: 'students', title: "Total Students", value: "2,453", icon: Users, color: "teal" },
    { id: 'instructors', title: "Total Instructors", value: "78", icon: Briefcase, color: "violet" },
    { id: 'courses', title: "Active Courses", value: "120", icon: BookOpen, color: "blue" },
    { id: 'blogs', title: "Published Blogs", value: "45", icon: FileText, color: "pink" },
];
const leadsData: Lead[] = [
    { id: 'lead-1', name: 'John Doe', email: 'john@example.com', type: 'General Inquiry', experience: 'Beginner', date: '2023-10-27', goal: 'Learn Data Science', notes: 'Interested in part-time courses.' },
    { id: 'lead-2', name: 'Jane Smith', email: 'jane@example.com', type: 'Course Recommendation', experience: 'Intermediate', date: '2023-10-26', goal: 'Upskill in Natural Language Processing.' },
];
const scheduleCallsData: Lead[] = [
    { id: 'sc-1', name: 'Kabeer Singh', email: 'kabir32171105@gmail.com', phone: '9956724007', type: 'Schedule Call', experience: 'Intermediate', date: '2025-08-07T20:42:57Z', preferredTime: '9:00 PM', goal: 'FULL STACK DEVELOPMENT', notes: 'None.' },
];
const joinProjectsData: Lead[] = [
    { id: 'jp-1', name: 'Leo Martinez', email: 'leo@example.com', type: 'Join Projects', experience: 'Intermediate', date: '2023-10-30', goal: 'Contribute to an open-source AI project.', notes: 'Has experience with Python and TensorFlow.' },

];
const studentsData: Student[] = [
    { id: 'stu-1', name: 'Alice Johnson', email: 'alice@example.com', course: 'Advanced ML', progress: '75%', status: 'Active', joined: '2023-09-15' },
    { id: 'stu-2', name: 'Bob Williams', email: 'bob@example.com', course: 'Data Science Intro', progress: '100%', status: 'Completed', joined: '2023-05-20' },
];
const instructorsData: Instructor[] = [
    { id: 'inst-1', name: 'Dr. Evelyn Reed', email: 'evelyn.r@example.com', courses: '5', rating: '4.9/5', status: 'Active' },
    { id: 'inst-2', name: 'Marcus Chen', email: 'marcus.c@example.com', courses: '3', rating: '4.8/5', status: 'Active' },
    { id: 'inst-3', name: 'Helena Petrova', email: 'helena.p@example.com', courses: '7', rating: '4.9/5', status: 'On Leave' },
];
const coursesData = [
    { title: 'Advanced Machine Learning', instructor: 'Dr. Emily White', students: '150', status: 'Published', created: '2023-08-01' },
];

const viewData = {
    leads: { title: 'Leads', data: leadsData, columns: ['Name', 'Contact', 'Type', 'Experience', 'Date', 'Actions'] },
    scheduleCalls: { title: 'Schedule Calls', data: scheduleCallsData, columns: ['Name', 'Contact', 'Type', 'Experience', 'Date', 'Actions'] },
    joinProjects: { title: 'Join Projects', data: joinProjectsData, columns: ['Name', 'Contact', 'Type', 'Experience', 'Date', 'Actions'] },
    students: { title: 'Students', data: studentsData, columns: ['Name', 'Contact', 'Course', 'Progress', 'Status', 'Joined', 'Actions'] },
    courses: { title: 'Courses', data: coursesData, columns: ['Title', 'Instructor', 'Students', 'Status', 'Created', 'Actions'] },
    instructors: { title: 'Instructors', data: instructorsData, columns: ['Name', 'Contact', 'Courses', 'Rating', 'Status', 'Actions'] },
    blogs: { title: 'Blogs', data: [], columns: ['Title', 'Author', 'Category', 'Views', 'Status', 'Published', 'Actions'] },
};

const getTypeColor = (type: string) => {
    switch (type) {
        case 'Schedule Call': return "border-cyan-700 text-cyan-300";
        case 'Join Projects': return "border-purple-700 text-purple-300";
        case 'Course Recommendation': return "border-blue-700 text-blue-300";
        default: return "border-slate-700 text-slate-300";
    }
}

const getStatusColor = (status: string) => {

    switch (status) {
        case 'Active': return "bg-emerald-900/40 border-emerald-700/50 text-emerald-400";
        case 'Completed': return "bg-blue-900/40 border-blue-700/50 text-blue-400";
        default: return "bg-slate-800 border-slate-700 text-slate-300";
    }

}



export default function SuperAdminDashboard() {

    const [activeView, setActiveView] = useState('leads');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

    // State for instructor modal
    const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);
    const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
    const [instructorToDelete, setInstructorToDelete] = useState<Instructor | null>(null);

    // MODIFIED: State for confirmation modal
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);

    const currentView = viewData[activeView as keyof typeof viewData];
    const viewsWithoutAddButton = ['leads', 'scheduleCalls', 'joinProjects'];

    const router = useRouter();

    const handleLogout = () => {
        // Remove the authentication token from local storage
        localStorage.removeItem('superAdminAuth');
        // Redirect to the login page
        router.push('/super-admin/login');
    };

    // --- HANDLER FUNCTIONS ---
    const handleViewStudent = (student: Student) => {
        setSelectedStudent(student);
        setIsStudentModalOpen(true);
    };
    const handleDeleteStudent = (student: Student) => {
        setStudentToDelete(student);
        setIsConfirmOpen(true);
    };
    const confirmDelete = () => {
        if (studentToDelete) {
            alert(`Deleting ${studentToDelete.name}`);
            // Add actual deletion logic here
        }
        setIsConfirmOpen(false);
        setStudentToDelete(null);
    }
    const confirmBlock = () => {
        if (studentToDelete) {
            alert(`Blocking ${studentToDelete.name}`);
            // Add actual blocking logic here
        }
        setIsConfirmOpen(false);
        setStudentToDelete(null);
    }
    const handleViewClick = (lead: Lead) => {
        setSelectedLead(lead);
        setIsModalOpen(true);
    };
    // MODIFIED: Functions to handle deletion
    const handleDeleteClick = (lead: Lead) => {
        setLeadToDelete(lead);
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (leadToDelete) {
            console.log("Deleting lead:", leadToDelete.id);
            // Here you would add your actual deletion logic (e.g., API call)
            alert(`Lead "${leadToDelete.name}" has been deleted.`);
            setIsConfirmOpen(false);
            setLeadToDelete(null);
        } else if (instructorToDelete) {
            console.log("Deleting instructor:", instructorToDelete.id);
            alert(`Instructor "${instructorToDelete.name}" has been deleted.`);
            setIsConfirmOpen(false);
            setInstructorToDelete(null);
        }
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
        if (instructorToDelete) {
            alert(`Blocking ${instructorToDelete.name}`);
            // Add actual blocking logic here
        }
        setIsConfirmOpen(false);
        setInstructorToDelete(null);
    };


    const renderTableRow = (item: any, index: number) => {
        // FIX: This check now correctly handles the case where item is null for empty tables.
        if (!item) {
            return (
                <TableRow>
                    <TableCell colSpan={currentView?.columns.length || 7} className="text-center text-slate-400 py-10">
                        No data available for this view yet.
                    </TableCell>
                </TableRow>
            );
        }

        switch (activeView) {
            case 'students':
                return (
                    <TableRow key={item.id} className="border-b-slate-800 hover:bg-slate-800/30">
                        <TableCell className="font-medium text-slate-50">{item.name}</TableCell>
                        <TableCell className="text-slate-400">{item.email}</TableCell>
                        <TableCell className="text-slate-400">{item.course}</TableCell>
                        <TableCell className="text-slate-400">{item.progress}</TableCell>
                        <TableCell><Badge className={getStatusColor(item.status)}>{item.status}</Badge></TableCell>
                        <TableCell className="text-slate-400"><ClientOnlyDate dateString={item.joined} /></TableCell>
                        <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleViewStudent(item)}><Eye className="w-4 h-4 mr-2" />View</Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteStudent(item)} ><Trash2 className="w-4 h-4" /></Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon" className="w-8 h-8"><MoreVertical className="w-4 h-4" /></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700 text-slate-50">
                                        <DropdownMenuItem onSelect={() => alert('Viewing Stats')}>View All Stats</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </TableCell>
                    </TableRow>
                );
            case 'instructors':
                return (
                    <TableRow key={item.id} className="border-b-slate-800 hover:bg-slate-800/30">
                        <TableCell className="font-medium text-slate-50">{item.name}</TableCell>
                        <TableCell className="text-slate-400">{item.email}</TableCell>
                        <TableCell className="text-slate-400">{item.courses}</TableCell>
                        <TableCell className="text-slate-400">{item.rating}</TableCell>
                        <TableCell><Badge className={getStatusColor(item.status)}>{item.status}</Badge></TableCell>
                        <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleViewInstructor(item)}><Eye className="w-4 h-4 mr-2" />View</Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteInstructor(item)}><Trash2 className="w-4 h-4" /></Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon" className="w-8 h-8"><MoreVertical className="w-4 h-4" /></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700 text-slate-50">
                                        <DropdownMenuItem onSelect={() => alert('Viewing Stats')}>View All Stats</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </TableCell>
                    </TableRow>
                );
            case 'courses':
                return (
                    <TableRow key={index}><TableCell colSpan={currentView.columns.length}>Student and Course views are not implemented in this demo.</TableCell></TableRow>
                );
            case 'leads':
            case 'scheduleCalls':
            case 'joinProjects':
            default:
                return (
                    <TableRow key={index} className="border-b-slate-800 hover:bg-slate-800/30">
                        <TableCell className="font-medium text-slate-50">{item.name}</TableCell>
                        <TableCell className="text-slate-400">{item.email}</TableCell>
                        <TableCell><Badge variant="outline" className={getTypeColor(item.type)}>{item.type}</Badge></TableCell>
                        <TableCell className="text-slate-400">{item.experience}</TableCell>
                        <TableCell className="text-slate-400"><ClientOnlyDate dateString={item.date} /></TableCell>
                        <TableCell className="text-right">
                            {/* MODIFIED: Added Delete button */}
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleViewClick(item)}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View
                                </Button>
                                <Button variant="destructive" size="sm"  onClick={() => handleDeleteClick(item)} className=' text-white font-semibold bg-red-600 hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/25'>
                                    <Trash2 className="w-4  h-4 mr-2" />
                                    Delete
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                );
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
                    animate={{ x: [-50, 50, -50], y: [-50, 50, -50], scale: [1, 1.1, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    style={{ left: "10%", top: "20%" }}
                />
                <motion.div
                    className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                    animate={{ x: [50, -50, 50], y: [50, -50, 50], scale: [1.1, 1, 1.1] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    style={{ right: "10%", bottom: "20%" }}
                />
            </div>

            <div className="relative z-10">
                {/* Top Navigation Bar */}
                <header className="sticky top-0 bg-black/50 backdrop-blur-lg border-b border-gray-700/50">
                    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                                    <Brain className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-white">Super Admin Panel</h1>
                                    <p className="text-xs text-gray-400">Manage LMS, Courses, Users, and Content</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link href="/admin/courses">
                                    <Button variant="outline"><BookOpen className="w-4 h-4 mr-2" />Courses</Button>
                                </Link>
                                {/* ADD THIS NEW LINK AND BUTTON */}
                                <Link href="/admin/careers">
                                    <Button variant="outline"><Briefcase className="w-4 h-4 mr-2" />Careers</Button>
                                </Link>
                                <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export</Button>
                                <Button
                                    onClick={() => window.location.reload()}
                                    className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
                                    <Activity className="h-4 w-4 mr-2" />
                                    Refresh
                                </Button>
                                <Button 
                                variant="destructive" 
                                onClick={handleLogout}
                                className=' text-white font-semibold bg-red-600 hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/25'>
                                   <LogOut className="h-4 w-4 mr-2" />
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Clickable Stat Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
                        {stats.map((stat, index) => {
                            const isClickable = stat.id in viewData;
                            const cardContent = (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => isClickable && setActiveView(stat.id)}
                                    className={`bg-black/50 border rounded-xl p-4 shadow-lg transition-all duration-300 group ${isClickable ? 'cursor-pointer' : 'cursor-default'
                                        } ${activeView === stat.id
                                            ? `border-${stat.color}-500/80 shadow-${stat.color}-500/20`
                                            : `border-slate-700/50 ${isClickable ? `hover:border-${stat.color}-500/60` : ''}`
                                        }`}>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-sm text-gray-400">{stat.title}</p>
                                            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                                        </div>
                                        <div className={`p-2 rounded-lg bg-${stat.color}-500/10`}>
                                            <stat.icon className={`h-5 w-5 text-${stat.color}-400`} />
                                        </div>
                                    </div>
                                </motion.div>
                            );

                            return stat.href ? <Link href={stat.href} key={stat.id}>{cardContent}</Link> : cardContent;
                        })}
                    </div>

                    {/* Main Functional Area */}
                    <div className="bg-black/50 backdrop-blur-lg border border-gray-700/50 rounded-lg p-4 mb-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="relative w-full sm:max-w-xs">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input placeholder="Search entries..." className="pl-10 bg-slate-800/50 border-slate-700 focus:border-cyan-500" />
                            </div>

                            {!viewsWithoutAddButton.includes(activeView) && (
                                <Button className="bg-gradient-to-r from-cyan-500 to-purple-500">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add New {currentView?.title?.slice(0, -1) || 'Entry'}
                                </Button>
                            )}
                        </div>
                    </div>


                    {/* Dynamic Data Table */}
                    {currentView ? (
                        <div className="bg-black/50 backdrop-blur-lg border border-gray-700/50 rounded-lg overflow-hidden">
                            <div className="p-4 border-b border-slate-700/50">
                                <h2 className="text-lg font-semibold text-white">{currentView.title} Table</h2>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b-slate-700/50 hover:bg-transparent">
                                        {currentView.columns.map(col => <TableHead key={col} className={col === 'Actions' ? 'text-right' : ''}>{col}</TableHead>)}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentView.data.length > 0
                                        ? currentView.data.map((item, index) => renderTableRow(item, index))
                                        : renderTableRow(null, 0)
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="bg-black/50 backdrop-blur-lg border border-gray-700/50 rounded-lg overflow-hidden p-10 text-center text-slate-400">
                            Select a category to view data.
                        </div>
                    )}
                </main>
            </div>

            {/* Render the modals */}
            <LeadDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                lead={selectedLead}
            />
            <ConfirmationModal
                isOpen={isConfirmOpen && !!leadToDelete}
                onClose={() => {
                    setIsConfirmOpen(false);
                    setLeadToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
                title="Are you sure?"
                description={`This action cannot be undone. This will permanently delete the lead for "${leadToDelete?.name}".`}
            />
            <StudentDetailModal isOpen={isStudentModalOpen} onClose={() => setIsStudentModalOpen(false)} student={selectedStudent} />
            <StudentConfirmationModal
                isOpen={isConfirmOpen && !!studentToDelete}
                onClose={() => {
                    setIsConfirmOpen(false);
                    setStudentToDelete(null);
                }}
                onConfirmDelete={confirmDelete}
                onConfirmBlock={confirmBlock}
                studentName={studentToDelete?.name || ''}
            />
            <InstructorDetailModal isOpen={isInstructorModalOpen} onClose={() => setIsInstructorModalOpen(false)} instructor={selectedInstructor} />
            <InstructorConfirmationModal
                isOpen={isConfirmOpen && !!instructorToDelete}
                onClose={() => {
                    setIsConfirmOpen(false);
                    setInstructorToDelete(null);
                }}
                onConfirmDelete={handleConfirmDelete}
                onConfirmBlock={handleConfirmInstructorBlock}
                title="Confirm Action on Instructor"
                description={`Are you sure you want to proceed with this action for "${instructorToDelete?.name}"?`}
                itemType="instructor"
                instructorName={instructorToDelete?.name || ''}
            />
        </div>
    );
}