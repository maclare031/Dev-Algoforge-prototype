"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Search,
  ChevronDown,
  BookOpen,
  Code,
  Database,
  Brain,
  Zap,
  Globe,
  Phone,
  LogIn,
  MessageSquare,
  Sparkles,
  LucideIcon,
  BookOpenCheck,
  Brain as BrainIcon,
  GitBranch,
  BarChart3,
  Cpu,
  Shield,
  Monitor,
  Map,
  User,
  Settings,
  LogOut,
  GraduationCap,
  FileText,
  Award,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";

interface Course {
  id?: string;
  _id?: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  duration: string;
  mode?: string;
  students?: string;
  learners?: string;
  rating?: number;
  level?: string;
  skills?: string[];
  price?: string;
  originalPrice?: string;
  tags?: string[];
  category?: string;
  courseCategory: string;
  instructor?: string;
  lessons?: number;
  projects?: number;
  certificate?: boolean;
  language?: string;
  prerequisites?: string;
  curriculum?: any[];
  featured?: boolean;
  trending?: boolean;
  iconName: string;
  createdAt?: string;
  updatedAt?: string;
  icon?: LucideIcon;
  path?: string;
  name?: string;
}

interface CourseCategory {
  category: string;
  items: Course[];
}

export function Navigation() {
  const { user, admin, superAdmin, isAuthenticated, logout } = useAuth();
  // Correctly determine the current user
  const currentUser = user || admin || superAdmin;
  // --- END: This is the critical fix ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false);
  const [isLearningResourcesOpen, setIsLearningResourcesOpen] = useState(false);
  const [isMobileLearningResourcesOpen, setIsMobileLearningResourcesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedMindMap, setSelectedMindMap] = useState<string | null>(null);
  const [courses, setCourses] = useState<CourseCategory[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<Course[]>([]);

  const iconMap: { [key: string]: LucideIcon } = {
    Brain,
    Code,
    Database,
    Sparkles,
    MessageSquare,
  };

  // Mind Map Learning Resources Data
  const mindMapResources = [
    {
      title: "All",
      description: "Complete overview of all learning paths",
      icon: BookOpenCheck,
      mindMapUrl: "https://www.mindmup.com/map/all-learning-paths",
      category: "Overview"
    },
    {
      title: "Data Science Workflow: CRISP-ML(Q)",
      description: "End-to-end data science methodology",
      icon: BarChart3,
      mindMapUrl: "https://www.mindmup.com/map/crisp-ml-workflow",
      category: "Data Science"
    },
    {
      title: "Data Analytics Workflow",
      description: "Analytics process and best practices",
      icon: BarChart3,
      mindMapUrl: "https://www.mindmup.com/map/data-analytics-workflow",
      category: "Data Analytics"
    },
    {
      title: "Practical AI and Deep Learning",
      description: "AI/ML implementation strategies",
      icon: BrainIcon,
      mindMapUrl: "https://www.mindmup.com/map/ai-deep-learning",
      category: "AI/ML"
    },
    {
      title: "Data Engineering",
      description: "Data pipeline and infrastructure",
      icon: GitBranch,
      mindMapUrl: "https://www.mindmup.com/map/data-engineering",
      category: "Engineering"
    },
    {
      title: "MLOps",
      description: "ML operations and deployment",
      icon: Cpu,
      mindMapUrl: "https://www.mindmup.com/map/mlops",
      category: "Operations"
    },
    {
      title: "Python Programming Fundamentals",
      description: "Core Python concepts and syntax",
      icon: Code,
      mindMapUrl: "https://www.mindmup.com/map/python-fundamentals",
      category: "Programming"
    },
    {
      title: "R Programming Fundamentals",
      description: "Statistical computing with R",
      icon: Code,
      mindMapUrl: "https://www.mindmup.com/map/r-fundamentals",
      category: "Programming"
    },
    {
      title: "Python and R Packages",
      description: "Essential libraries and frameworks",
      icon: Code,
      mindMapUrl: "https://www.mindmup.com/map/python-r-packages",
      category: "Programming"
    },
    {
      title: "SQL Concepts",
      description: "Database querying and management",
      icon: Database,
      mindMapUrl: "https://www.mindmup.com/map/sql-concepts",
      category: "Database"
    },
    {
      title: "Big Data Technologies",
      description: "Hadoop, Spark, and distributed systems",
      icon: Database,
      mindMapUrl: "https://www.mindmup.com/map/big-data-tech",
      category: "Big Data"
    },
    {
      title: "Tableau",
      description: "Data visualization with Tableau",
      icon: BarChart3,
      mindMapUrl: "https://www.mindmup.com/map/tableau",
      category: "Visualization"
    },
    {
      title: "Power BI",
      description: "Microsoft Power BI dashboards",
      icon: BarChart3,
      mindMapUrl: "https://www.mindmup.com/map/power-bi",
      category: "Visualization"
    },
    {
      title: "IoT",
      description: "Internet of Things development",
      icon: Cpu,
      mindMapUrl: "https://www.mindmup.com/map/iot",
      category: "IoT"
    },
    {
      title: "Ethical Hacking and Cyber Security",
      description: "Security practices and penetration testing",
      icon: Shield,
      mindMapUrl: "https://www.mindmup.com/map/cyber-security",
      category: "Security"
    },
    {
      title: "Full Stack Web Development",
      description: "Frontend and backend development",
      icon: Monitor,
      mindMapUrl: "https://www.mindmup.com/map/full-stack-dev",
      category: "Web Development"
    },
    {
      title: "Machine Learning using Python, R",
      description: "ML algorithms and implementations",
      icon: BrainIcon,
      mindMapUrl: "https://www.mindmup.com/map/ml-python-r",
      category: "AI/ML"
    },
    {
      title: "Agile Certified Practitioner (PMI-ACP)",
      description: "Agile project management methodology",
      icon: Map,
      mindMapUrl: "https://www.mindmup.com/map/agile-pmi-acp",
      category: "Project Management"
    },
    {
      title: "Comprehensive Cloud Computing",
      description: "Cloud platforms and services",
      icon: Database,
      mindMapUrl: "https://www.mindmup.com/map/cloud-computing",
      category: "Cloud"
    },
    {
      title: "AWS Cloud Solution Architect",
      description: "AWS architecture and best practices",
      icon: Database,
      mindMapUrl: "https://www.mindmup.com/map/aws-architect",
      category: "Cloud"
    }
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses");
        const fetchedCourses: Course[] = response.data.courses;

        console.log("Fetched courses:", fetchedCourses);

        if (!fetchedCourses || !Array.isArray(fetchedCourses)) {
          console.error("Invalid courses data structure");
          return;
        }

        const featuredOrTrendingCourses = fetchedCourses.filter(
          (course) => course.featured === true || course.trending === true
        );

        console.log("Featured or trending courses found:", featuredOrTrendingCourses.length);
        console.log("Courses by category:", featuredOrTrendingCourses.map(c => ({ title: c.title, category: c.courseCategory, featured: c.featured, trending: c.trending })));

        const categorizedCourses = featuredOrTrendingCourses.reduce(
          (acc, course) => {
            const category = course.courseCategory?.trim();
            if (!category) {
              console.warn("Course missing courseCategory:", course.title);
              return acc;
            }

            if (!acc[category]) {
              acc[category] = [];
            }

            const courseId = course._id || course.id;
            if (!courseId) {
              console.warn("Course missing ID:", course.title);
              return acc;
            }

            acc[category].push({
              ...course,
              name: course.title,
              icon: iconMap[course.iconName] || Brain,
              path: `/courses/${courseId}`,
            });
            return acc;
          },
          {} as { [key: string]: Course[] }
        );

        const courseData: CourseCategory[] = Object.entries(
          categorizedCourses
        ).map(([category, items]) => ({
          category,
          items,
        }));

        console.log("Final categorized courses:", courseData);
        setCourses(courseData);
        setAllCourses(fetchedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const router = useRouter();

  // Handle search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setIsSearchFocused(false);
      setIsMenuOpen(false);
    }
  };

  const handleSearchInputChange = (value: string) => {
    setSearchTerm(value);

    if (value.trim().length >= 2) {
      const searchLower = value.toLowerCase();
      const suggestions = allCourses
        .filter(
          (course) =>
            course.title.toLowerCase().includes(searchLower) ||
            course.description.toLowerCase().includes(searchLower) ||
            course.courseCategory.toLowerCase().includes(searchLower) ||
            (course.instructor &&
              course.instructor.toLowerCase().includes(searchLower))
        )
        .slice(0, 5);
      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(e as any);
    }
    if (e.key === "Escape") {
      setSearchTerm("");
      setIsSearchFocused(false);
      setSearchSuggestions([]);
    }
  };

  // Handle user logout
  const handleAuthLogout = () => {
    logout();
    router.push('/login');
  };

  const handleSuggestionClick = (course: Course) => {
    const courseId = course._id || course.id;
    if (courseId) {
      // Close all navigation states immediately for better UX
      setIsMenuOpen(false);
      setIsMobileCoursesOpen(false);
      setIsCoursesOpen(false);
      setSearchTerm("");
      setIsSearchFocused(false);
      setSearchSuggestions([]);

      // Navigate to course
      router.push(`/courses/${courseId}`);
    }
  };

  const handleSearchWithSuggestion = (courseName: string) => {
    router.push(`/courses?search=${encodeURIComponent(courseName)}`);
    setSearchTerm("");
    setIsSearchFocused(false);
    setSearchSuggestions([]);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
        setIsMobileCoursesOpen(false);
        setIsMobileLearningResourcesOpen(false);
        setIsLearningResourcesOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.target.closest(".courses-dropdown")) {
        setIsCoursesOpen(false);
      }
      if (!event.target.closest(".learning-resources-dropdown")) {
        setIsLearningResourcesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-xl border-b border-cyan-400/30 shadow-lg shadow-cyan-500/10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo - Responsive */}
          <Link href={"/"}>
            <div className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-black/10 group-hover:bg-black/20 transition-colors duration-300 flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="AlgoForgeStudios Logo"
                  fill
                  sizes="(max-width: 640px) 40px, 48px"
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              <span className="text-lg sm:text-xl lg:text-2xl font-medium bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent transition-all duration-300 group-hover:from-cyan-300 group-hover:via-purple-300 group-hover:to-pink-300 hidden xs:block">
                AlgoForgeStudios
              </span>
              <span className="text-lg font-medium bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent xs:hidden">
                AlgoForgeStudios
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {/* Courses Dropdown */}
              <div
                className="relative courses-dropdown"
                onMouseEnter={() => setIsCoursesOpen(true)}
                onMouseLeave={() => setIsCoursesOpen(false)}
              >
                <button className="flex items-center space-x-1 text-white hover:text-cyan-400 px-3 xl:px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20 group">
                  <BookOpen className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent group-hover:from-cyan-200 group-hover:to-purple-200 transition-all duration-300">
                    Courses
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${isCoursesOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Courses Mega Menu */}
                <div
                  className={`absolute top-full left-0 mt-2 w-[85vw] max-w-4xl bg-black/95 backdrop-blur-xl border border-cyan-400/30 rounded-2xl shadow-2xl shadow-cyan-500/20 transition-all duration-300 ${isCoursesOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible translate-y-4"
                    }`}
                  style={{
                    left: "max(-2rem, calc(-40vw + 50%))",
                    right: "auto",
                  }}
                >
                  <div className="p-6">
                    <div
                      className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      {courses.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="space-y-3">
                          <h3 className="text-base font-semibold text-cyan-300 border-b border-cyan-500/30 pb-2 mb-3 sticky top-0 bg-black/95 z-10">
                            {category.category}
                          </h3>
                          <div className="space-y-2">
                            {category.items.map((course, courseIndex) => (
                              <Link
                                href={course.path || "#"}
                                key={courseIndex}
                                onClick={(e) => {
                                  if (
                                    !course.path ||
                                    course.path.includes("undefined")
                                  ) {
                                    e.preventDefault();
                                    console.error(
                                      "Invalid course path:",
                                      course.path,
                                      course
                                    );
                                    return;
                                  }
                                  // Close desktop course menu immediately
                                  setIsCoursesOpen(false);
                                }}
                              >
                                <div className="group relative p-3 rounded-lg bg-gradient-to-r from-cyan-500/8 to-purple-500/8 border border-cyan-500/25 hover:border-cyan-400/60 transition-all duration-200 hover:shadow-md hover:shadow-cyan-500/15 cursor-pointer transform hover:scale-[1.03] hover:bg-gradient-to-r hover:from-cyan-500/15 hover:to-purple-500/15">
                                  <div className="flex items-start space-x-2.5">
                                    <div className="p-1.5 rounded-md bg-gradient-to-br from-cyan-500/25 to-purple-500/25 group-hover:from-cyan-400/35 group-hover:to-purple-400/35 transition-all duration-200 flex-shrink-0">
                                      {course.icon && (
                                        <course.icon className="w-4 h-4 text-cyan-300 group-hover:text-cyan-200 transition-colors duration-200" />
                                      )}
                                      {!course.icon && (
                                        <BookOpen className="w-4 h-4 text-cyan-300 group-hover:text-cyan-200 transition-colors duration-200" />
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-start justify-between mb-1">
                                        <h4 className="text-white font-medium group-hover:text-cyan-200 transition-colors duration-200 text-sm leading-tight truncate pr-2">
                                          {course.name}
                                        </h4>
                                        <div className="flex space-x-1">
                                          {course.featured && (
                                            <span className="px-1.5 py-0.5 text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white rounded animate-pulse">
                                              Featured
                                            </span>
                                          )}
                                          {course.trending && (
                                            <span className="px-1.5 py-0.5 text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded">
                                              Trending
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                      <p className="text-xs text-gray-400 mb-2 line-clamp-1 leading-tight">
                                        {course.description}
                                      </p>
                                      <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center space-x-2">
                                          <span className="px-1.5 py-0.5 bg-gray-800/60 text-gray-300 rounded">
                                            {course.duration}
                                          </span>
                                          <span className="px-1.5 py-0.5 bg-gray-800/60 text-gray-300 rounded">
                                            {course.level}
                                          </span>
                                        </div>
                                        <div className="flex items-center space-x-1 bg-gray-800/60 px-1.5 py-0.5 rounded">
                                          <span className="text-yellow-400">
                                            ★
                                          </span>
                                          <span className="text-gray-300 font-medium">
                                            {course.rating}
                                          </span>
                                          <span className="text-gray-500">
                                            ({course.students?.replace("+", "")}
                                            )
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                                  <div className="absolute inset-0 rounded-lg border border-cyan-400/0 group-hover:border-cyan-400/30 transition-all duration-200 pointer-events-none"></div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-2 border-t border-cyan-500/20 text-center">
                      <Button
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 hover:scale-105"
                        onClick={() => router.push("/courses")}
                      >
                        View All Courses
                      </Button>
                    </div>
                  </div>
                  <style jsx>{`
                    .grid::-webkit-scrollbar {
                      width: 6px;
                    }
                    .grid::-webkit-scrollbar-track {
                      background: rgba(30, 41, 59, 0.3);
                      border-radius: 3px;
                    }
                    .grid::-webkit-scrollbar-thumb {
                      background: rgba(6, 182, 212, 0.5);
                      border-radius: 3px;
                    }
                    .grid::-webkit-scrollbar-thumb:hover {
                      background: rgba(6, 182, 212, 0.7);
                    }
                  `}</style>
                </div>
              </div>

              {/* Navigation Links */}
              <Link
                href="/careers"
                className="text-gray-300 hover:text-cyan-300 px-3 xl:px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20 group"
              >
                <span className="group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-purple-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Careers
                </span>
              </Link>
              {/* Learning Resources Link */}
              <Link
                href="/learning-resources"
                className="text-gray-300 hover:text-cyan-300 px-3 xl:px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20 group flex items-center space-x-1"
              >
                <Map className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-purple-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Learning Resources
                </span>
              </Link>
              <Link
                href="/blog"
                className="text-gray-300 hover:text-cyan-300 px-3 xl:px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20 group"
              >
                <span className="group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-purple-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Blog
                </span>
              </Link>
            </div>
          </div>

          {/* Desktop Search and Profile Section */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <form onSubmit={handleSearch} className="relative group">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-all duration-300 z-10 ${isSearchFocused || searchTerm
                    ? "text-cyan-300 scale-110"
                    : "text-cyan-400 group-hover:text-cyan-300"
                    }`}
                />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => handleSearchInputChange(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() =>
                    setTimeout(() => {
                      setIsSearchFocused(false);
                      setSearchSuggestions([]);
                    }, 200)
                  }
                  onKeyDown={handleSearchKeyDown}
                  className={`bg-black/50 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none transition-all duration-300 w-48 xl:w-56 ${isSearchFocused || searchTerm
                    ? "border-cyan-400 ring-2 ring-cyan-400/50 shadow-lg shadow-cyan-500/20 bg-black/70"
                    : "border-cyan-500/30 hover:border-cyan-400/50"
                    }`}
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      setSearchSuggestions([]);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-300 transition-colors duration-200 z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>

              {/* Search Suggestions Dropdown */}
              {searchSuggestions.length > 0 &&
                (isSearchFocused || searchTerm) && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-xl border border-cyan-400/30 rounded-xl shadow-2xl shadow-cyan-500/20 z-50 max-h-80 overflow-y-auto scrollbar-hide">
                    <div className="p-2">
                      <div className="flex items-center justify-between px-3 py-2 border-b border-cyan-500/20 mb-2">
                        <span className="text-xs font-medium text-cyan-300">
                          Course Suggestions
                        </span>
                        <span className="text-xs text-gray-400">
                          {searchSuggestions.length} found
                        </span>
                      </div>
                      {searchSuggestions.map((course, index) => {
                        const courseId = course._id || course.id;
                        return (
                          <div
                            key={courseId || index}
                            onClick={() => handleSuggestionClick(course)}
                            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-cyan-500/10 cursor-pointer transition-all duration-200 group"
                          >
                            <div className="p-1.5 rounded-md bg-gradient-to-br from-cyan-500/25 to-purple-500/25 group-hover:from-cyan-400/35 group-hover:to-purple-400/35 transition-all duration-200 flex-shrink-0">
                              {iconMap[course.iconName] ? (
                                React.createElement(iconMap[course.iconName], {
                                  className: "w-4 h-4 text-cyan-300",
                                })
                              ) : (
                                <BookOpen className="w-4 h-4 text-cyan-300" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-medium group-hover:text-cyan-200 transition-colors duration-200 text-sm leading-tight truncate">
                                {course.title}
                              </h4>
                              <p className="text-xs text-gray-400 truncate mt-1">
                                {course.description}
                              </p>
                              <div className="flex items-center space-x-2 mt-2">
                                <span className="px-1.5 py-0.5 bg-gray-800/60 text-gray-300 rounded text-xs">
                                  {course.duration}
                                </span>
                                <span className="px-1.5 py-0.5 bg-gray-800/60 text-gray-300 rounded text-xs">
                                  {course.level}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div className="border-t border-cyan-500/20 mt-2 pt-2">
                        <button
                          onClick={() => handleSearchWithSuggestion(searchTerm)}
                          className="w-full flex items-center justify-center space-x-2 p-2 rounded-lg hover:bg-cyan-500/10 transition-all duration-200 text-cyan-300 hover:text-cyan-200"
                        >
                          <Search className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            Search all courses for "{searchTerm}"
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
            </div>

            {/* Authentication Section */}
            {isAuthenticated && currentUser ? (
              <div className="flex items-center space-x-3">
                {/* Profile Dropdown */}
                <div
                  className="relative profile-dropdown"
                  onMouseEnter={() => setIsProfileOpen(true)}
                  onMouseLeave={() => setIsProfileOpen(false)}
                >
                  <button className="flex items-center space-x-2 text-white hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20 group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                      {(currentUser?.name || 'A').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </div>
                    <div className="hidden xl:block text-left">
                      <p className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">
                        {currentUser?.name || currentUser?.email}
                      </p>
                      <p className="text-xs text-gray-400 capitalize">
                        {currentUser?.role}
                      </p>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Profile Dropdown Menu */}
                  <div
                    className={`absolute top-full right-0 mt-2 w-64 bg-black/95 backdrop-blur-xl border border-cyan-400/30 rounded-2xl shadow-2xl shadow-cyan-500/20 transition-all duration-300 ${isProfileOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible translate-y-4"
                      }`}
                  >
                    <div className="p-4">
                      {/* Profile Header */}
                      <div className="flex items-center space-x-3 pb-3 mb-3 border-b border-cyan-500/20">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                          {(currentUser?.name || 'A').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-base">
                            {currentUser?.name || currentUser?.email}
                          </h3>
                          <p className="text-gray-400 text-sm">{currentUser?.email}</p>
                          <p className="text-cyan-400 text-xs font-medium capitalize bg-cyan-500/10 px-2 py-0.5 rounded-full inline-block mt-1">
                            {currentUser?.role}
                          </p>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="space-y-1">
                        {currentUser.role === 'student' && (
                          <>
                            {/* <Link
                              href="/dashboards"
                              className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-all duration-200 group"
                            >
                              <User className="w-4 h-4" />
                              <span className="text-sm font-medium">Dashboard</span>
                            </Link> */}
                            <Link
                              href="https://dev-lms-prototype.vercel.app/courses"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-all duration-200 group"
                            >
                              <BookOpen className="w-4 h-4" />
                              <span className="text-sm font-medium">Navigate to LMS</span>
                            </Link>

                            {/* <Link
                              href="/certificates"
                              className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-all duration-200 group"
                            >
                              <Award className="w-4 h-4" />
                              <span className="text-sm font-medium">Certificates</span>
                            </Link> */}
                          </>
                        )}

                        {currentUser.role === 'admin' && (
                          <Link
                            href="/admin"
                            className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg transition-all duration-200 group"
                          >
                            <Shield className="w-4 h-4" />
                            <span className="text-sm font-medium">Admin Panel</span>
                          </Link>
                        )}

                        {/* <Link
                          href="/profile/settings"
                          className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-all duration-200 group"
                        >
                          <Settings className="w-4 h-4" />
                          <span className="text-sm font-medium">Settings</span>
                        </Link> */}

                        <div className="border-t border-cyan-500/20 mt-2 pt-2">
                          <button
                            onClick={handleAuthLogout}
                            className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200 group"
                          >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm font-medium">Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                {/* <Button
                  onClick={() => router.push("/signup")}
                  variant="outline"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200 font-medium px-3 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Up</span>
                </Button> */}
                <Button
                  onClick={() => router.push("/login")}
                  variant="outline"
                  className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-200 font-medium px-3 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Button>
                <Button
                  onClick={() => router.push("/contact")}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-medium px-3 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 hover:scale-105 flex items-center space-x-2"
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden xl:inline">Contact</span>
                </Button>
              </div>
            )}
          </div>

          {/* FIXED: Tablet & Mobile Actions - Only contact button for sm tablets, hamburger for all below lg */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Contact Button - Only show on tablets (md and up) but hide on mobile */}
            <div className="hidden md:block lg:hidden">
              <Button
                size="sm"
                onClick={() => router.push("/contact")}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-medium px-3 py-2 rounded-lg transition-all duration-300 flex items-center space-x-1"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">Contact</span>
              </Button>
            </div>

            {/* Hamburger Menu Button - Shows on ALL tablets and mobile (below lg) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-cyan-300 p-2 rounded-lg hover:bg-cyan-500/10 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* FIXED: Mobile/Tablet Navigation - Now properly shows "View All Courses" button */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-cyan-500/20 max-h-[85vh] overflow-hidden flex flex-col">
          <div className="px-4 pt-4 pb-2 flex-shrink-0">
            {/* Mobile Search */}
            <div className="mb-4 relative">
              <form onSubmit={handleSearch} className="relative">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-all duration-300 ${searchTerm ? "text-cyan-300" : "text-cyan-400"
                    }`}
                />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => handleSearchInputChange(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() =>
                    setTimeout(() => {
                      setIsSearchFocused(false);
                      setSearchSuggestions([]);
                    }, 200)
                  }
                  onKeyDown={handleSearchKeyDown}
                  className={`w-full bg-black/50 border rounded-xl pl-10 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 ${searchTerm
                    ? "pr-12 border-cyan-400/50"
                    : "pr-4 border-cyan-500/30"
                    }`}
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      setSearchSuggestions([]);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-300 transition-colors duration-200 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>

              {/* Mobile Search Suggestions Dropdown */}
              {searchSuggestions.length > 0 && (isSearchFocused || searchTerm) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-xl border border-cyan-400/30 rounded-xl shadow-2xl shadow-cyan-500/20 z-50 max-h-80 overflow-y-auto scrollbar-hide">
                  <div className="p-2">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-cyan-500/20 mb-2">
                      <span className="text-xs font-medium text-cyan-300">
                        Course Suggestions
                      </span>
                      <span className="text-xs text-gray-400">
                        {searchSuggestions.length} found
                      </span>
                    </div>
                    {searchSuggestions.map((course, index) => {
                      const courseId = course._id || course.id;
                      return (
                        <div
                          key={courseId || index}
                          onClick={() => {
                            handleSuggestionClick(course);
                          }}
                          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-cyan-500/10 cursor-pointer transition-all duration-200 group"
                        >
                          <div className="p-1.5 rounded-md bg-gradient-to-br from-cyan-500/25 to-purple-500/25 group-hover:from-cyan-400/35 group-hover:to-purple-400/35 transition-all duration-200 flex-shrink-0">
                            {iconMap[course.iconName] ? (
                              React.createElement(iconMap[course.iconName], {
                                className: "w-4 h-4 text-cyan-300",
                              })
                            ) : (
                              <BookOpen className="w-4 h-4 text-cyan-300" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-medium group-hover:text-cyan-200 transition-colors duration-200 text-sm leading-tight truncate">
                              {course.title}
                            </h4>
                            <p className="text-xs text-gray-400 truncate mt-1">
                              {course.description}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <span className="px-1.5 py-0.5 bg-gray-800/60 text-gray-300 rounded text-xs">
                                {course.duration}
                              </span>
                              <span className="px-1.5 py-0.5 bg-gray-800/60 text-gray-300 rounded text-xs">
                                {course.level}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="border-t border-cyan-500/20 mt-2 pt-2">
                      <button
                        onClick={() => handleSearchWithSuggestion(searchTerm)}
                        className="w-full flex items-center justify-center space-x-2 p-2 rounded-lg hover:bg-cyan-500/10 transition-all duration-200 text-cyan-300 hover:text-cyan-200"
                      >
                        <Search className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Search all courses for "{searchTerm}"
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-4 pb-2">
            <div className="space-y-1">
              {/* Mobile Courses Dropdown */}
              <div>
                <button
                  onClick={() => setIsMobileCoursesOpen(!isMobileCoursesOpen)}
                  className="w-full text-left text-cyan-300 flex items-center justify-between px-4 py-3 text-base font-medium rounded-lg hover:bg-cyan-500/10 transition-all duration-300"
                >
                  <span className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Courses</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${isMobileCoursesOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Scrollable Mobile courses dropdown */}
                {isMobileCoursesOpen && (
                  <div className="pl-6 pr-4 pb-2">
                    {/* Scrollable courses container */}
                    <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
                      {courses.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="space-y-2">
                          <h4 className="text-cyan-300 font-medium text-sm px-2 py-1 sticky top-0 bg-black/95 z-10 border-b border-cyan-500/20">
                            {category.category}
                          </h4>
                          {category.items.map((course, courseIndex) => (
                            <Link
                              href={course.path || "#"}
                              key={courseIndex}
                              onClick={(e) => {
                                if (
                                  !course.path ||
                                  course.path.includes("undefined")
                                ) {
                                  e.preventDefault();
                                  console.error(
                                    "Invalid course path:",
                                    course.path,
                                    course
                                  );
                                  return;
                                }
                                // Close mobile menu immediately for better UX
                                setIsMenuOpen(false);
                                setIsMobileCoursesOpen(false);
                              }}
                            >
                              <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-cyan-500/10 transition-all duration-300 cursor-pointer group">
                                {course.icon && (
                                  <course.icon className="w-4 h-4 text-cyan-400 flex-shrink-0 group-hover:text-cyan-300 transition-colors duration-200" />
                                )}
                                {!course.icon && (
                                  <BookOpen className="w-4 h-4 text-cyan-400 flex-shrink-0 group-hover:text-cyan-300 transition-colors duration-200" />
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="text-white text-sm font-medium truncate group-hover:text-cyan-100 transition-colors duration-200">
                                      {course.name}
                                    </span>
                                    <div className="flex space-x-1">
                                      {course.featured && (
                                        <span className="px-1.5 py-0.5 text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex-shrink-0 animate-pulse">
                                          Featured
                                        </span>
                                      )}
                                      {course.trending && (
                                        <span className="px-1.5 py-0.5 text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex-shrink-0">
                                          Trending
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-xs text-gray-400 truncate group-hover:text-gray-300 transition-colors duration-200">
                                    {course.description}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>

                    {/* Sticky "View All Courses" button - Always visible when courses dropdown is open */}
                    <div className="sticky bottom-0 pt-3 mt-3 border-t border-cyan-500/20 bg-black/95 backdrop-blur-sm">
                      <Button
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsMobileCoursesOpen(false);
                          router.push("/courses");
                        }}
                        className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center space-x-2"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>View All Courses</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Navigation Links */}
              <Link
                href="/careers"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-cyan-300 block px-4 py-3 text-base font-medium rounded-lg hover:bg-cyan-500/10 transition-all duration-300"
              >
                Careers
              </Link>
              <Link
                href="/learning-resources"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-cyan-300 block px-4 py-3 text-base font-medium rounded-lg hover:bg-cyan-500/10 transition-all duration-300"
              >
                Learning Resources
              </Link>
              <Link
                href="/blog"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-cyan-300 block px-4 py-3 text-base font-medium rounded-lg hover:bg-cyan-500/10 transition-all duration-300"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Fixed Bottom CTA Buttons */}
          <div className="flex-shrink-0 px-4 pt-2 pb-4 border-t border-cyan-500/20 bg-black/95 backdrop-blur-sm">
            <div className="space-y-3">
              {/* Contact button only shows on mobile (below md) since tablets already have it in header */}
              <div className="md:hidden">
                <Button
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push("/contact");
                  }}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-medium py-3 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Contact Us</span>
                </Button>
              </div>

              {/* Mobile Authentication Buttons */}
              {isAuthenticated && currentUser ? (
                <div className="space-y-2">
                  {currentUser.role === 'admin' && (
                    <Button
                      onClick={() => {
                        setIsMenuOpen(false);
                        router.push('/admin');
                      }}
                      className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-medium py-3 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Admin Panel</span>
                    </Button>
                  )}
                  {currentUser.role === 'student' && (
                    <Button
                      onClick={() => {
                        setIsMenuOpen(false);
                        window.location.href = 'https://dev-lms-prototype.vercel.app/courses';
                      }}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-medium py-3 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
                    >
                      <User className="w-4 h-4" />
                      <span>Navigate to LMS</span>
                    </Button>
                  )}

                  <Button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleAuthLogout();
                    }}
                    variant="outline"
                    className="w-full border-red-500/50 text-red-300 hover:bg-red-500/10 hover:text-red-200 font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {/* <Button
              onClick={() => {
                setIsMenuOpen(false);
                router.push('/signup');
              }}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-medium py-3 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Sign Up as Student</span>
            </Button> */}
                  <Button
                    onClick={() => {
                      setIsMenuOpen(false);
                      router.push('/login');
                    }}
                    variant="outline"
                    className="w-full border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-200 font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </Button>
                </div>
              )}

              {/* {isAdminLoggedIn ? (
          <div className="space-y-2">
            <Button
              onClick={() => {
                setIsMenuOpen(false);
                router.push('/admin');
              }}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-medium py-3 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Admin Panel</span>
            </Button>
            <Button
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
              variant="outline"
              className="w-full border-red-500/50 text-red-300 hover:bg-red-500/10 hover:text-red-200 font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Logout</span>
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => {
              setIsMenuOpen(false);
              router.push('/admin/login');
            }}
            variant="outline"
            className="w-full border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-200 font-medium py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Admin Login</span>
          </Button>
        )} */}
            </div>
          </div>

          {/* Custom Scrollbar Styles */}
          <style jsx>{`
      .overflow-y-auto::-webkit-scrollbar {
        width: 4px;
      }
      .overflow-y-auto::-webkit-scrollbar-track {
        background: rgba(30, 41, 59, 0.3);
        border-radius: 2px;
      }
      .overflow-y-auto::-webkit-scrollbar-thumb {
        background: rgba(6, 182, 212, 0.5);
        border-radius: 2px;
      }
      .overflow-y-auto::-webkit-scrollbar-thumb:hover {
        background: rgba(6, 182, 212, 0.7);
      }
    `}</style>
        </div>
      )}


    </nav>
  );
}
