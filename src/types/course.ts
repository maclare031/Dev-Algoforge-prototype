import { LucideIcon } from "lucide-react";

export interface Course {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  duration: string;
  mode: string; // "Online" | "Hybrid" | "Weekend" | "Evening" | "Executive" | "Weekend Executive" | "Hybrid Executive" | "Executive Online"
  students: string; // e.g., "5,000+"
  rating: number;
  level: string; // "Beginner" | "Intermediate" | "Advanced" | "Beginner to Intermediate" | "Intermediate to Advanced" | "All Levels" | "Executive Level" | "Senior Management" | "Management Level"
  skills: string[];
  price: string;
  originalPrice: string;
  tags: string[];
  category: CourseCategory;
  courseCategory?: string;
  instructor?: string;
  lessons?: number;
  projects?: number;
  certificate?: boolean;
  language?: string;
  prerequisites?: string;
  curriculum?: CourseModule[];
  syllabus?: SyllabusModule[];
  // UI specific properties
  icon?: LucideIcon;
  gradient?: string;
  bgImage?: string;
  featured?: boolean;
  trending?: boolean;
  learners?: string; // Alternative to students for navigation component
  path?: string; // URL path for navigation
}

export interface SyllabusModule {
  module: string;
  topics: string[];
}

export interface CourseModule {
  module: string;
  lessons: number;
  duration: string;
}

export type CourseCategory = "students" | "professionals" | "corporates";

export interface CourseFilters {
  search?: string;
  category?: CourseCategory | "all";
  courseCategory?: string | "all";
  level?: string;
  featured?: boolean;
  trending?: boolean;
}

export interface CourseStats {
  totalCourses: number;
  totalStudents: string;
  averageRating: number;
  categoryCounts: Record<CourseCategory, number>;
}

// Navigation specific course interface
export interface NavigationCourse {
  name: string;
  description: string;
  icon: LucideIcon;
  duration: string;
  level: string;
  featured: boolean;
  trending: boolean;
  rating: number;
  learners: string;
  path: string;
}

export interface NavigationCourseCategory {
  category: string;
  items: NavigationCourse[];
}

// API Response types
export interface CoursesResponse {
  courses: Course[];
  total: number;
  stats?: CourseStats;
}

export interface CourseResponse {
  course: Course;
}
