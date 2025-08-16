import { Course, CourseCategory, NavigationCourseCategory, NavigationCourse } from "@/types/course";
import { CourseService } from './courseService';
import {
  Brain,
  Code,
  Database,
  Sparkles,
  MessageSquare,
  Megaphone,
  Palette,
  TrendingUp,
  BarChart3,
  Shield,
  Globe,
} from "lucide-react";

const coursesData: Course[] = [
  // Students Courses
  {
    id: 1,
    title: "Python Programming for Beginners",
    subtitle: "Start Your Coding Journey",
    description: "Learn Python from scratch with hands-on projects. Perfect for students beginning their programming journey.",
    longDescription: "This comprehensive Python programming course is designed specifically for beginners who want to start their coding journey. You'll learn Python fundamentals through hands-on projects and real-world examples. From basic syntax to advanced concepts like object-oriented programming, this course covers everything you need to become proficient in Python.",
    duration: "2 Months",
    mode: "Online",
    students: "5,000+",
    rating: 4.8,
    level: "Beginner",
    skills: ["Python", "Programming Basics", "Problem Solving", "Data Types"],
    price: "₹9,999",
    originalPrice: "₹14,999",
    tags: ["Student Friendly", "Beginner"],
    category: "students",
    instructor: "Dr. Sarah Johnson",
    lessons: 45,
    projects: 8,
    certificate: true,
    language: "English + Hindi",
    prerequisites: "None - Complete beginner friendly",
    curriculum: [
      { module: "Python Basics", lessons: 8, duration: "2 weeks" },
      { module: "Data Structures", lessons: 10, duration: "2 weeks" },
      { module: "Control Flow", lessons: 8, duration: "1 week" },
      { module: "Functions & Modules", lessons: 9, duration: "2 weeks" },
      { module: "Object-Oriented Programming", lessons: 10, duration: "3 weeks" },
    ],
    icon: Code,
    gradient: "from-green-600 to-blue-600",
    bgImage: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
    featured: true,
    trending: true,
    learners: "5,000+",
    path: "/courses/1",
  },
  {
    id: 2,
    title: "Web Development Fundamentals",
    subtitle: "HTML, CSS, JavaScript Mastery",
    description: "Build responsive websites from scratch. Learn the foundation of modern web development with practical projects.",
    duration: "3 Months",
    mode: "Hybrid",
    students: "4,200+",
    rating: 4.7,
    level: "Beginner to Intermediate",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    price: "₹15,999",
    originalPrice: "₹22,999",
    tags: ["Project Based", "Portfolio Ready"],
    category: "students",
    icon: Globe,
    gradient: "from-orange-600 to-pink-600",
    bgImage: "linear-gradient(135deg, #ea580c 0%, #ec4899 100%)",
    featured: true,
    trending: false,
    learners: "4,200+",
    path: "/courses/2",
  },
  
  // Professionals Courses
  {
    id: 5,
    title: "Machine Learning for Professionals",
    subtitle: "Advanced Career Transition",
    description: "Master ML concepts while working full-time. Flexible schedule with weekend sessions and industry projects.",
    longDescription: "This intensive Machine Learning program is designed for working professionals who want to transition into ML roles or enhance their current positions. The course features flexible weekend sessions, real industry projects, and mentorship from ML experts currently working in top tech companies.",
    duration: "4 Months",
    mode: "Hybrid",
    students: "2,500+",
    rating: 4.9,
    level: "Intermediate to Advanced",
    skills: ["Python", "Scikit-learn", "Data Analysis", "ML Algorithms"],
    price: "₹45,999",
    originalPrice: "₹65,999",
    tags: ["Evening Batches", "Career Switch"],
    category: "professionals",
    instructor: "Prof. Rajesh Kumar",
    lessons: 60,
    projects: 12,
    certificate: true,
    language: "English",
    prerequisites: "Basic programming knowledge preferred",
    curriculum: [
      { module: "ML Fundamentals", lessons: 12, duration: "3 weeks" },
      { module: "Supervised Learning", lessons: 15, duration: "4 weeks" },
      { module: "Unsupervised Learning", lessons: 10, duration: "3 weeks" },
      { module: "Deep Learning Basics", lessons: 13, duration: "4 weeks" },
      { module: "ML in Production", lessons: 10, duration: "2 weeks" },
    ],
    icon: Brain,
    gradient: "from-blue-600 to-cyan-600",
    bgImage: "linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)",
    featured: true,
    trending: true,
    learners: "2,500+",
    path: "/courses/5",
  },
  {
    id: 6,
    title: "Data Science Complete Program",
    subtitle: "End-to-End Analytics Mastery",
    description: "Comprehensive data science program with real industry projects. Perfect for working professionals seeking advancement.",
    duration: "6 Months",
    mode: "Weekend",
    students: "3,200+",
    rating: 4.9,
    level: "All Levels",
    skills: ["Python", "R", "SQL", "Tableau", "Power BI", "Statistics"],
    price: "₹55,999",
    originalPrice: "₹79,999",
    tags: ["Weekend Classes", "Job Assistance"],
    category: "professionals",
    icon: BarChart3,
    gradient: "from-emerald-600 to-teal-600",
    bgImage: "linear-gradient(135deg, #059669 0%, #0d9488 100%)",
    featured: true,
    trending: false,
    learners: "3,200+",
    path: "/courses/6",
  },
  
  // Corporate Courses
  {
    id: 9,
    title: "AI Strategy for Business Leaders",
    subtitle: "Strategic AI Implementation",
    description: "Learn to implement AI strategies in your organization. Executive-level program for business transformation.",
    longDescription: "This executive-level program is designed for C-suite executives and business leaders who want to understand and implement AI strategies in their organizations. Learn how to identify AI opportunities, manage AI transformation, and drive ROI through strategic AI implementation.",
    duration: "2 Months",
    mode: "Executive",
    students: "500+",
    rating: 4.7,
    level: "Executive Level",
    skills: ["AI Strategy", "Business Intelligence", "ROI Analysis", "Change Management"],
    price: "₹1,25,999",
    originalPrice: "₹1,75,999",
    tags: ["Executive Program", "C-Suite Focus"],
    category: "corporates",
    instructor: "Dr. Michael Chen",
    lessons: 20,
    projects: 5,
    certificate: true,
    language: "English",
    prerequisites: "Senior management experience",
    curriculum: [
      { module: "AI Strategy Foundation", lessons: 4, duration: "2 weeks" },
      { module: "AI Implementation", lessons: 6, duration: "3 weeks" },
      { module: "ROI & Analytics", lessons: 4, duration: "1 week" },
      { module: "Change Management", lessons: 6, duration: "2 weeks" },
    ],
    icon: TrendingUp,
    gradient: "from-orange-600 to-red-600",
    bgImage: "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
    featured: true,
    trending: false,
    learners: "500+",
    path: "/courses/9",
  },
];

const categories: CourseCategory[] = ["students", "professionals", "corporates"];

export function getCourses(): Course[] {
  return coursesData;
}

export function getCourseById(id: number): Course | undefined {
  return coursesData.find(course => course.id === id);
}

export function getNavigationCourses(): NavigationCourseCategory[] {
  // Transforming normal courses into navigation specific courses
  const navCourses: NavigationCourseCategory[] = categories.map(category => {
    const items: NavigationCourse[] = coursesData
      .filter(course => course.category === category)
      .map(course => ({
        name: course.title,
        description: course.description,
        icon: course.icon!,
        duration: course.duration,
        level: course.level,
        featured: course.featured || false,
        trending: course.trending || false,
        rating: course.rating,
        learners: course.students,
        path: `/courses/${course.id}`
      }));

    const categoryName = {
      students: "For Students",
      professionals: "For Professionals", 
      corporates: "For Corporates"
    }[category] || category;
    
    return {
      category: categoryName,
      items
    };
  });

  return navCourses;
}
