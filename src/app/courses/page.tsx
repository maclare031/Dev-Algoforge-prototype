"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  BookOpen, 
  X, 
  Filter, 
  Grid3X3, 
  List, 
  Star, 
  Users, 
  Clock, 
  Award, 
  Zap,
  Gift,
  TrendingUp,
  ChevronRight,
  Brain,
  Code,
  Database,
  Sparkles,
  BarChart3
} from "lucide-react";
import { CourseCard } from "@/components/course-card";

interface Course {
  id?: string;
  _id?: string;
  title: string;
  subtitle?: string;
  description: string;
  duration: string;
  level?: string;
  skills?: string[];
  price?: string;
  originalPrice?: string;
  tags?: string[];
  category: string;
  courseCategory?: string;
  instructor?: string;
  students?: string;
  rating?: number;
  mode?: string;
  curriculum?: Array<{
    module: string;
    lessons: number;
    duration: string;
    description?: string;
  }>;
  syllabus?: Array<{
    module: string;
    topics: string[];
  }>;
}

function CoursesContent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterCourseCategory, setFilterCourseCategory] = useState("all");
  const [viewMode, setViewMode] = useState<'category' | 'grid'>('category');
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();

  // Prevent hydration issues and handle URL search params
  useEffect(() => {
    setIsClient(true);
    const urlSearchTerm = searchParams?.get('search');
    if (urlSearchTerm) {
      setSearchTerm(decodeURIComponent(urlSearchTerm));
      setViewMode('grid'); // Switch to grid view when searching
    }
  }, [searchParams]);

  // Enhanced category mapping with icons and descriptions - matching Course model
  const courseCategories = useMemo(() => [
    { 
      value: "all", 
      label: "All Categories",
      icon: Grid3X3,
      description: "Browse all available courses",
      gradient: "from-cyan-500 to-purple-500"
    },
    {
      value: "Data Analytics & Business Intelligence",
      label: "Data Analytics & BI",
      icon: BarChart3,
      description: "Transform data into actionable insights",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      value: "Data Science",
      label: "Data Science",
      icon: Database,
      description: "Master data manipulation and statistical analysis",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      value: "Machine Learning",
      label: "Machine Learning",
      icon: Code,
      description: "Build intelligent systems and algorithms",
      gradient: "from-orange-500 to-red-500"
    },
    { 
      value: "Generative AI (Gen AI)", 
      label: "Generative AI",
      icon: Brain,
      description: "Master the future of AI technology",
      gradient: "from-purple-500 to-pink-500"
    },
  ], []);

  const levels = useMemo(() => [
    { value: "all", label: "All Levels" },
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
  ], []);

  // Enhanced data fetching with better processing
  useEffect(() => {
    let isMounted = true;
    
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/courses");
        const data = await response.json();
        
        if (isMounted) {
          const processedCourses = (data.courses || []).map((course: any) => ({
            ...course,
            iconName: course.iconName || "Brain",
            bgImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            gradient: "from-cyan-500 to-purple-500",
            tags: course.tags || [course.level || "Beginner"],
            skills: course.skills || [],
            subtitle: course.subtitle || course.category,
            id: course._id || course.id,
            isFree: course.price === "0" || course.price === "Free" || course.price === "free" || !course.price
          }));
          setCourses(processedCourses);
          setFilteredCourses(processedCourses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCourses();
    return () => { isMounted = false; };
  }, []);

  // Enhanced filtering
  const filterCourses = useCallback((searchValue: string, levelValue: string, categoryValue: string, courseList: Course[]) => {
    let filtered = courseList;

    if (levelValue !== "all") {
      filtered = filtered.filter((course) => course.level === levelValue);
    }

    if (categoryValue !== "all") {
      filtered = filtered.filter((course) => course.courseCategory === categoryValue);
    }

    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.category.toLowerCase().includes(searchLower) ||
        (course.instructor && course.instructor.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  }, []);

  useEffect(() => {
    const filtered = filterCourses(searchTerm, filterLevel, filterCourseCategory, courses);
    setFilteredCourses(filtered);
  }, [courses, searchTerm, filterLevel, filterCourseCategory, filterCourses]);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setFilterLevel("all");
    setFilterCourseCategory("all");
  }, []);

  const hasActiveFilters = useMemo(() => 
    searchTerm || filterLevel !== "all" || filterCourseCategory !== "all"
  , [searchTerm, filterLevel, filterCourseCategory]);

  // Get courses by category for category view
  const coursesByCategory = useMemo(() => {
    const categorized = {};
    courses.forEach(course => {
      const category = course.courseCategory || 'Other';
      if (!categorized[category]) {
        categorized[category] = [];
      }
      categorized[category].push(course);
    });
    return categorized;
  }, [courses]);

  // Get free courses
  const freeCourses = useMemo(() => {
    return courses.filter(course => course.isFree).slice(0, 6); // Show max 6 free courses
  }, [courses]);

  // Get featured/trending courses
  const featuredCourses = useMemo(() => {
    return courses.filter(course => course.featured || course.trending).slice(0, 8);
  }, [courses]);

  // Course statistics
  const courseStats = useMemo(() => {
    const totalStudents = courses.reduce((sum, course) => {
      const studentCount = parseInt(course.students?.replace(/[^0-9]/g, '') || '0');
      return sum + studentCount;
    }, 0);
    
    const avgRating = courses.reduce((sum, course) => sum + (course.rating || 0), 0) / courses.length || 0;
    
    return {
      totalCourses: courses.length,
      totalStudents,
      avgRating: avgRating.toFixed(1),
      freeCoursesCount: freeCourses.length
    };
  }, [courses, freeCourses.length]);

  // Loading state
  if (!isClient || loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20 pb-12">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="relative">
            <div className="w-8 h-8 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-8 h-8 border-4 border-transparent border-t-purple-400 rounded-full animate-spin animate-reverse"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black will-change-auto">
      <div className="pt-16 sm:pt-20 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Responsive Header */}
          <header className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 backdrop-blur-sm rounded-full border border-cyan-500/30 mb-4 sm:mb-6 shadow-lg shadow-cyan-500/10">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 text-xs sm:text-sm font-medium">
                Learning Center
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight px-2">
              Training Courses for{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                All Learners
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto px-4">
              Courses for learners at every level to develop skills and grow.
            </p>
          </header>

          {/* Fixed Filter Section with Proper Icon Spacing */}
          <Card className="mb-6 sm:mb-8 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-lg shadow-cyan-500/10">
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {/* Optimized Search Input */}
                <div className="relative group w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors pointer-events-none" />
                  <Input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 bg-black/60 border border-cyan-600/30 rounded-lg text-white placeholder-gray-400 text-sm h-9 sm:h-10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 hover:border-cyan-500/50 transition-all duration-200 w-full"
                    autoComplete="off"
                  />
                </div>

                {/* Fixed Category Filter with Proper Icon Spacing */}
                <div className="relative w-full">
                  <Select
                    value={filterCourseCategory}
                    onValueChange={setFilterCourseCategory}
                  >
                    <SelectTrigger className="bg-black/60 border border-cyan-600/30 rounded-lg text-gray-200 h-9 sm:h-10 text-sm hover:border-cyan-500/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-200 w-full pl-3 pr-8 flex items-center justify-between">
                      <SelectValue placeholder="Category" className="flex-1 text-left truncate" />
                    </SelectTrigger>
                    <SelectContent 
                      className="bg-gray-900/98 backdrop-blur-md border border-gray-600 rounded-lg shadow-2xl min-w-[200px] max-h-[280px] z-[200] overflow-hidden"
                      position="popper" 
                      sideOffset={6}
                      align="start"
                      collisionPadding={8}
                      avoidCollisions={true}
                    >
                      <div className="p-1 max-h-[270px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-500/30">
                        {courseCategories.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="text-gray-200 hover:bg-cyan-500/20 hover:text-cyan-300 focus:bg-cyan-500/20 focus:text-cyan-300 text-sm py-2.5 px-3 cursor-pointer transition-colors duration-150 rounded-md data-[highlighted]:bg-cyan-500/20 data-[highlighted]:text-cyan-300 relative"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </div>
                    </SelectContent>
                  </Select>
                </div>

                {/* Fixed Level Filter with Proper Icon Spacing */}
                <div className="relative w-full sm:col-span-2 lg:col-span-1">
                  <Select value={filterLevel} onValueChange={setFilterLevel}>
                    <SelectTrigger className="bg-black/60 border border-cyan-600/30 rounded-lg text-gray-200 h-9 sm:h-10 text-sm hover:border-cyan-500/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-200 w-full pl-3 pr-8 flex items-center justify-between">
                      <SelectValue placeholder="Level" className="flex-1 text-left truncate" />
                    </SelectTrigger>
                    <SelectContent 
                      className="bg-gray-900/98 backdrop-blur-md border border-gray-600 rounded-lg shadow-2xl min-w-[140px] max-h-[220px] z-[200] overflow-hidden"
                      position="popper" 
                      sideOffset={6}
                      align="start"
                      collisionPadding={8}
                      avoidCollisions={true}
                    >
                      <div className="p-1 max-h-[210px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-500/30">
                        {levels.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="text-gray-200 hover:bg-cyan-500/20 hover:text-cyan-300 focus:bg-cyan-500/20 focus:text-cyan-300 text-sm py-2.5 px-3 cursor-pointer transition-colors duration-150 rounded-md data-[highlighted]:bg-cyan-500/20 data-[highlighted]:text-cyan-300 relative"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </div>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Enhanced Filter Status - Mobile Optimized */}
              {hasActiveFilters && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 pt-4 border-t border-gray-700/50 gap-3">
                  <div className="flex items-center gap-2 text-xs sm:text-sm flex-wrap">
                    <span className="text-gray-400 font-medium whitespace-nowrap">
                      {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} found
                    </span>
                    {searchTerm && (
                      <Badge
                        variant="outline"
                        className="text-cyan-400 border-cyan-400/50 bg-cyan-500/10 text-xs px-2 py-0.5"
                      >
                        "{searchTerm}"
                      </Badge>
                    )}
                    {filterLevel !== "all" && (
                      <Badge
                        variant="outline"
                        className="text-purple-400 border-purple-400/50 bg-purple-500/10 text-xs px-2 py-0.5"
                      >
                        {filterLevel}
                      </Badge>
                    )}
                    {filterCourseCategory !== "all" && (
                      <Badge
                        variant="outline"
                        className="text-pink-400 border-pink-400/50 bg-pink-500/10 text-xs px-2 py-0.5"
                      >
                        {courseCategories.find((c) => c.value === filterCourseCategory)?.label}
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="text-gray-400 border-gray-600 hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-500/10 h-7 sm:h-8 px-3 text-xs font-medium transition-all duration-200 flex-shrink-0 whitespace-nowrap"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Clear All
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Optimized Stats Card */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <Card className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-xl shadow-lg shadow-cyan-500/10">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  </div>
                  <div className="flex items-baseline gap-1 sm:gap-2">
                    <span className="text-white font-bold text-lg sm:text-xl">
                      {courses.length}
                    </span>
                    <span className="text-cyan-300 text-xs sm:text-sm font-medium">
                      Available Courses
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced View Mode Toggle - Mobile Optimized */}
          {!hasActiveFilters && (
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-lg p-1 w-full sm:w-auto max-w-xs">
                <Button
                  variant={viewMode === 'category' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('category')}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 min-w-0 ${
                    viewMode === 'category'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <List className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                  <span className="truncate">By Category</span>
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 min-w-0 ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  <Grid3X3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                  <span className="truncate">Grid View</span>
                </Button>
              </div>
            </div>
          )}

          {/* Enhanced Free Courses Section - Mobile Optimized */}
          {!hasActiveFilters && freeCourses.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 sm:mb-12"
            >
              <Card className="bg-gradient-to-br from-emerald-900/40 to-green-900/20 backdrop-blur-xl border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden relative">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-400/10 to-transparent rounded-tr-full"></div>
                
                <CardContent className="p-4 sm:p-6 lg:p-8 relative z-10">
                  {/* Enhanced Header - Mobile Responsive */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="p-2.5 sm:p-3 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl ring-2 ring-emerald-400/20">
                        <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">
                          Free Courses
                        </h2>
                        <p className="text-emerald-200 text-xs sm:text-sm opacity-90">
                          Start learning today at no cost
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-3 py-1.5 text-sm font-semibold">
                        {freeCourses.length} Free
                      </Badge>
                      <div className="hidden sm:flex items-center gap-1 text-emerald-300/70 text-xs">
                        <Sparkles className="w-3 h-3" />
                        <span>Limited time</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Grid - Mobile Optimized */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                    {freeCourses.map((course, index) => (
                      <motion.div
                        key={course.id || course._id}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ 
                          delay: index * 0.1,
                          duration: 0.3,
                          ease: "easeOut"
                        }}
                        className="group"
                      >
                        <div className="relative">
                          {/* Free Badge Overlay */}
                          <div className="absolute -top-2 -right-2 z-20 bg-gradient-to-r from-emerald-400 to-green-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                            FREE
                          </div>
                          <CourseCard
                            course={course}
                            inView={true}
                            index={index}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Additional Features - Mobile Friendly */}
                  <div className="mt-6 sm:mt-8 pt-6 border-t border-emerald-500/20">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-emerald-200/80 text-xs sm:text-sm">
                        <Award className="w-4 h-4" />
                        <span>Certificate of completion included</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-200/80 text-xs sm:text-sm">
                        <Clock className="w-4 h-4" />
                        <span>Self-paced learning</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          )}

          {/* Main Courses Content */}
          <section className="relative">
            {loading ? (
              <div className="flex justify-center items-center py-16 sm:py-20">
                <div className="relative">
                  <div className="w-8 h-8 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-8 h-8 border-4 border-transparent border-t-purple-400 rounded-full animate-spin animate-reverse"></div>
                </div>
              </div>
            ) : hasActiveFilters || viewMode === 'grid' ? (
              // Filtered view or Grid view
              filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  <AnimatePresence mode="popLayout">
                    {filteredCourses.map((course, index) => (
                      <motion.div
                        key={course.id || course._id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ 
                          duration: 0.2,
                          delay: index * 0.05
                        }}
                        className="transform-gpu"
                      >
                        <CourseCard
                          course={course}
                          inView={true}
                          index={index}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-lg">
                  <CardContent className="text-center py-16 sm:py-20 px-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                      <Search className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
                      No courses found
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 sm:mb-6 max-w-sm mx-auto">
                      We couldn't find any courses matching your criteria. Try adjusting your filters.
                    </p>
                    <Button
                      onClick={clearFilters}
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 text-sm sm:text-base"
                    >
                      View All Courses
                    </Button>
                  </CardContent>
                </Card>
              )
            ) : (
              // Enhanced Category view - Mobile Optimized
              <div className="space-y-8 sm:space-y-12">
                {courseCategories.slice(1).map((category) => {
                  const categoryIcon = category.icon;
                  const categoryCourses = coursesByCategory[category.value] || [];
                  
                  if (categoryCourses.length === 0) return null;
                  
                  return (
                    <motion.div
                      key={category.value}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-xl border border-gray-700/30 rounded-2xl shadow-xl overflow-hidden">
                        <CardContent className="p-4 sm:p-6 lg:p-8">
                          {/* Enhanced Category Header - Mobile Responsive */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
                            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                              <div className={`p-2.5 sm:p-3 bg-gradient-to-r ${category.gradient}/20 rounded-xl ring-2 ring-white/10 flex-shrink-0`}>
                                {React.createElement(categoryIcon, { 
                                  className: `w-5 h-5 sm:w-6 sm:h-6 text-white` 
                                })}
                              </div>
                              <div className="min-w-0 flex-1">
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 truncate">
                                  {category.label}
                                </h2>
                                <p className="text-gray-300 text-xs sm:text-sm opacity-90 line-clamp-2">
                                  {category.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 self-start sm:self-center flex-shrink-0">
                              <Badge 
                                className={`bg-gradient-to-r ${category.gradient}/20 text-white border-0 px-2.5 py-1 text-xs sm:text-sm font-semibold`}
                              >
                                {categoryCourses.length} Course{categoryCourses.length !== 1 ? 's' : ''}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setFilterCourseCategory(category.value);
                                  setViewMode('grid');
                                }}
                                className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm"
                              >
                                <span className="hidden sm:inline">View All</span>
                                <span className="sm:hidden">All</span>
                                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                          
                          {/* Enhanced Category Courses Grid - Mobile Optimized */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                            {categoryCourses.slice(0, 6).map((course, index) => (
                              <motion.div
                                key={course.id || course._id}
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ 
                                  delay: index * 0.1,
                                  duration: 0.3,
                                  ease: "easeOut"
                                }}
                                className="group"
                              >
                                <CourseCard
                                  course={course}
                                  inView={true}
                                  index={index}
                                />
                              </motion.div>
                            ))}
                          </div>
                          
                          {/* Enhanced Show more indicator - Mobile Friendly */}
                          {categoryCourses.length > 6 && (
                            <div className="mt-6 sm:mt-8 text-center">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setFilterCourseCategory(category.value);
                                  setViewMode('grid');
                                }}
                                className="text-cyan-400 border-cyan-400/30 hover:bg-cyan-500/10 hover:border-cyan-400 px-4 sm:px-6 py-2 sm:py-2.5 text-sm transition-all duration-200 group"
                              >
                                <span className="flex items-center gap-2">
                                  <span>View {categoryCourses.length - 6} More Course{categoryCourses.length - 6 !== 1 ? 's' : ''}</span>
                                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
                
                {/* Show message if no courses in any category */}
                {Object.keys(coursesByCategory).length === 0 && (
                  <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-lg">
                    <CardContent className="text-center py-16 sm:py-20 px-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                        <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
                        No courses available
                      </h3>
                      <p className="text-gray-400 text-sm max-w-sm mx-auto">
                        We're working on adding new courses. Check back soon!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20 pb-12">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="relative">
            <div className="w-8 h-8 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-8 h-8 border-4 border-transparent border-t-purple-400 rounded-full animate-spin animate-reverse"></div>
          </div>
        </div>
      </main>
    }>
      <CoursesContent />
    </Suspense>
  );
}
