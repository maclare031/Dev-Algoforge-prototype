"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Users,
  Star,
  Clock,
  Award,
  BookOpen,
  Code,
  Globe,
  Target,
  TrendingUp,
  MessageSquare,
  Shield,
  User,
  Phone,
  Mail,
  ArrowRight,
  Play,
  Download,
  Share2,
  Heart,
  Languages,
  GraduationCap,
  X,
  Bell,
  Sparkles,
  ChevronRight,
  Info,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SyllabusItem {
  module: string;
  topics: string[];
}

interface Course {
  _id?: string;
  id?: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  duration: string;
  mode?: string;
  students?: string;
  rating?: number;
  level?: string;
  skills?: string[];
  price?: string;
  originalPrice?: string;
  tags?: string[];
  courseCategory?: string;
  instructor?: string;
  lessons?: number;
  projects?: number;
  certificate?: boolean;
  language?: string;
  prerequisites?: string;
  curriculum?: any[];
  syllabus?: SyllabusItem[];
  iconName?: string;
  featured?: boolean;
  trending?: boolean;
}

// Optimized text truncation hook
const useTruncatedText = (text: string, maxLength: number = 100) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > maxLength;
  const displayText =
    isExpanded || !shouldTruncate ? text : text.substring(0, maxLength) + "...";

  return {
    displayText,
    isExpanded,
    shouldTruncate,
    toggleExpanded: () => setIsExpanded(!isExpanded),
  };
};

// Compact enrollment modal
const EnrollmentModal = ({
  course,
  isOpen,
  onClose,
}: {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsEnrolled(true);
      setIsSubmitting(false);
    }, 1200);
  };

  const resetModal = () => {
    setIsEnrolled(false);
    setFormData({ name: "", email: "", phone: "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-white text-center">
            {isEnrolled ? "Enrollment Successful! 🎉" : `Enroll in Course`}
          </DialogTitle>
        </DialogHeader>

        <div className="p-4">
          {!isEnrolled ? (
            <>
              {/* Compact Course Summary */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-3 mb-4 border border-cyan-500/20">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-cyan-300 font-medium text-xs">
                    Course Fee
                  </span>
                  <div className="flex items-center gap-1">
                    {course.originalPrice && (
                      <span className="text-gray-500 line-through text-xs">
                        ₹{course.originalPrice}
                      </span>
                    )}
                    <span className="text-white font-bold text-sm">
                      {course.price ? `${course.price}` : "Free"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </span>
                  {course.level && (
                    <span className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {course.level}
                    </span>
                  )}
                </div>
              </div>

              {/* Compact Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <User className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-cyan-400" />
                  <Input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-7 h-8 text-xs bg-black/60 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-400"
                    required
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-cyan-400" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-7 h-8 text-xs bg-black/60 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-400"
                    required
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-cyan-400" />
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-7 h-8 text-xs bg-black/60 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-400"
                    required
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetModal}
                    className="flex-1 h-8 text-xs border-gray-600 text-gray-300 hover:border-gray-500"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 h-8 text-xs bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-medium"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </div>
                    ) : (
                      <>
                        <GraduationCap className="w-3 h-3 mr-1" />
                        Enroll Now
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center border border-green-500/30"
              >
                <CheckCircle className="w-8 h-8 text-green-400" />
              </motion.div>

              <div>
                <h3 className="text-lg font-bold text-green-400 mb-2">
                  Welcome Aboard! 🚀
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  Thank you for enrolling in{" "}
                  <span className="text-cyan-300 font-medium">
                    {course.title}
                  </span>
                </p>
                <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-3 border border-cyan-500/20">
                  <p className="text-xs text-gray-300">
                    📧 Check your email for course details
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    📞 Our team will contact you within 24 hours
                  </p>
                </div>
              </div>

              <Button
                onClick={resetModal}
                className="w-full h-8 text-xs bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400"
              >
                Continue Exploring
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = React.use(params);

  const [course, setCourse] = useState<Course | null>(null);
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);

  // Compact text truncation
  const descriptionText = useTruncatedText(course?.description || "", 80);
  const longDescriptionText = useTruncatedText(
    course?.longDescription || "",
    120
  );
  const prerequisitesText = useTruncatedText(course?.prerequisites || "", 100);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/courses/${resolvedParams.id}`);
        setCourse(response.data.course);
      } catch (error) {
        console.error("Error fetching course details, falling back", error);
        try {
          const response = await axios.get(`/api/courses`);
          const allCourses: Course[] = response.data.courses;
          const course = allCourses.find(
            (c: Course) =>
              c._id === resolvedParams.id || c.id === resolvedParams.id
          );
          setCourse(course || null);
        } catch (fallbackError) {
          console.error("Error fetching fallback courses", fallbackError);
          setCourse(null);
        }
      } finally {
        setLoading(false);
      }
    };

    if (resolvedParams.id) {
      fetchCourse();
    }
  }, [resolvedParams.id]);

  const getModeIcon = (mode: string) => {
    switch (mode?.toLowerCase()) {
      case "online":
        return <Globe className="w-4 h-4" />;
      case "hybrid":
        return <Target className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative mb-3">
            <div className="w-8 h-8 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-8 h-8 border-2 border-transparent border-t-purple-400 rounded-full animate-spin animate-reverse mx-auto"></div>
          </div>
          <p className="text-white text-sm">Loading course details...</p>
          <p className="text-gray-400 text-xs mt-1">
            Please wait while we fetch the information
          </p>
        </div>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
        <Card className="bg-gray-900/90 border-gray-700/50 p-6 text-center max-w-xs w-full">
          <CardContent className="p-0">
            <div className="w-12 h-12 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
              <X className="w-6 h-6 text-red-400" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">
              Course Not Found
            </h2>
            <p className="text-gray-400 text-xs mb-4">
              The requested course could not be loaded.
            </p>
            <Button
              onClick={() => router.push("/courses")}
              className="w-full h-8 text-xs bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400"
            >
              <ArrowRight className="w-3 h-3 mr-1" />
              Browse Courses
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-14 sm:pt-16 pb-6">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        {/* Compact Hero Section */}
        <section className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Compact Badges */}
              <div className="flex flex-wrap gap-1">
                {course.trending && (
                  <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-300 text-xs px-2 py-0.5">
                    <TrendingUp className="w-2.5 h-2.5 mr-1" />
                    Trending
                  </Badge>
                )}
                {course.featured && (
                  <Badge className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-300 text-xs px-2 py-0.5">
                    <Star className="w-2.5 h-2.5 mr-1" />
                    Featured
                  </Badge>
                )}
                {course.courseCategory && (
                  <Badge
                    variant="outline"
                    className="text-cyan-400 border-cyan-400/30 text-xs px-2 py-0.5"
                  >
                    {course.courseCategory}
                  </Badge>
                )}
              </div>

              {/* Compact Title & Description */}
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {course.title}
                </h1>

                {course.subtitle && (
                  <h2 className="text-lg text-cyan-300 font-medium">
                    {course.subtitle}
                  </h2>
                )}

                {/* Main Description */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {descriptionText.displayText}
                  </p>
                  {descriptionText.shouldTruncate && (
                    <button
                      onClick={descriptionText.toggleExpanded}
                      className="text-cyan-400 hover:text-cyan-300 text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      {descriptionText.isExpanded ? (
                        <>
                          Show Less <ChevronUp className="w-3 h-3" />
                        </>
                      ) : (
                        <>
                          Read More <ChevronDown className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Long Description */}
                {course.longDescription && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {longDescriptionText.displayText}
                    </p>
                    {longDescriptionText.shouldTruncate && (
                      <button
                        onClick={longDescriptionText.toggleExpanded}
                        className="text-cyan-400 hover:text-cyan-300 text-xs font-medium flex items-center gap-1 transition-colors"
                      >
                        {longDescriptionText.isExpanded ? (
                          <>
                            Show Less <ChevronUp className="w-3 h-3" />
                          </>
                        ) : (
                          <>
                            Read More <ChevronDown className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Compact Rating & Students */}
              <div className="flex flex-wrap items-center gap-4">
                {course.rating && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(course.rating!)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-white font-semibold text-sm">
                      {course.rating}
                    </span>
                    <span className="text-gray-400 text-xs">rating</span>
                  </div>
                )}
                {course.students && (
                  <div className="flex items-center gap-1 text-gray-300 text-xs">
                    <Users className="w-3 h-3 text-cyan-400" />
                    <span className="font-medium">{course.students}</span>
                    <span>students</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Compact Course Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-lg font-bold text-white mb-3">
                Course Information
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {course.duration && (
                  <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-700/50 hover:border-cyan-400/30 transition-all duration-300 group">
                    <CardContent className="p-2 text-center">
                      <Clock className="w-5 h-5 text-cyan-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                      <h4 className="text-white font-medium mb-0.5 text-xs">
                        Duration
                      </h4>
                      <p className="text-gray-300 text-xs">{course.duration}</p>
                    </CardContent>
                  </Card>
                )}

                {course.level && (
                  <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-700/50 hover:border-purple-400/30 transition-all duration-300 group">
                    <CardContent className="p-2 text-center">
                      <Target className="w-5 h-5 text-purple-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                      <h4 className="text-white font-medium mb-0.5 text-xs">
                        Level
                      </h4>
                      <p className="text-gray-300 text-xs">{course.level}</p>
                    </CardContent>
                  </Card>
                )}

                {course.mode && (
                  <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-700/50 hover:border-green-400/30 transition-all duration-300 group">
                    <CardContent className="p-2 text-center">
                      <div className="w-5 h-5 text-green-400 mx-auto mb-1 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {getModeIcon(course.mode)}
                      </div>
                      <h4 className="text-white font-medium mb-0.5 text-xs">
                        Mode
                      </h4>
                      <p className="text-gray-300 text-xs">{course.mode}</p>
                    </CardContent>
                  </Card>
                )}

                {course.lessons && (
                  <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-700/50 hover:border-blue-400/30 transition-all duration-300 group">
                    <CardContent className="p-2 text-center">
                      <BookOpen className="w-5 h-5 text-blue-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                      <h4 className="text-white font-medium mb-0.5 text-xs">
                        Lessons
                      </h4>
                      <p className="text-gray-300 text-xs">{course.lessons}</p>
                    </CardContent>
                  </Card>
                )}

                {course.projects && (
                  <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-700/50 hover:border-orange-400/30 transition-all duration-300 group">
                    <CardContent className="p-2 text-center">
                      <Code className="w-5 h-5 text-orange-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                      <h4 className="text-white font-medium mb-0.5 text-xs">
                        Projects
                      </h4>
                      <p className="text-gray-300 text-xs">{course.projects}</p>
                    </CardContent>
                  </Card>
                )}

                {course.certificate && (
                  <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-700/50 hover:border-yellow-400/30 transition-all duration-300 group">
                    <CardContent className="p-2 text-center">
                      <Award className="w-5 h-5 text-yellow-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                      <h4 className="text-white font-medium mb-0.5 text-xs">
                        Certificate
                      </h4>
                      <p className="text-gray-300 text-xs">Included</p>
                    </CardContent>
                  </Card>
                )}

                {course.language && (
                  <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-700/50 hover:border-pink-400/30 transition-all duration-300 group">
                    <CardContent className="p-2 text-center">
                      <Languages className="w-5 h-5 text-pink-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                      <h4 className="text-white font-medium mb-0.5 text-xs">
                        Language
                      </h4>
                      <p className="text-gray-300 text-xs">{course.language}</p>
                    </CardContent>
                  </Card>
                )}

                {course.instructor && (
                  <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-700/50 hover:border-indigo-400/30 transition-all duration-300 group">
                    <CardContent className="p-2 text-center">
                      <User className="w-5 h-5 text-indigo-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                      <h4 className="text-white font-medium mb-0.5 text-xs">
                        Instructor
                      </h4>
                      <p className="text-gray-300 text-xs">
                        {course.instructor}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </motion.div>

            {/* Compact Skills */}
            {course.skills && course.skills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-3"
              >
                <h3 className="text-lg font-bold text-white">
                  Skills You'll Master
                </h3>
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-cyan-300 border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 transition-all duration-300 px-2 py-1 text-xs font-medium"
                    >
                      <Sparkles className="w-2.5 h-2.5 mr-1" />
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Compact Prerequisites */}
            {course.prerequisites && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-700/50">
                  <CardContent className="p-4">
                    <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-cyan-400" />
                      Prerequisites
                    </h3>
                    <div className="space-y-1">
                      <p className="text-gray-300 leading-relaxed text-xs">
                        {prerequisitesText.displayText}
                      </p>
                      {prerequisitesText.shouldTruncate && (
                        <button
                          onClick={prerequisitesText.toggleExpanded}
                          className="text-cyan-400 hover:text-cyan-300 text-xs font-medium flex items-center gap-1 transition-colors"
                        >
                          {prerequisitesText.isExpanded ? (
                            <>
                              Show Less <ChevronUp className="w-3 h-3" />
                            </>
                          ) : (
                            <>
                              Read More <ChevronDown className="w-3 h-3" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Compact Enrollment Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="sticky top-20"
            >
              <Card className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-cyan-500/20 shadow-xl shadow-cyan-500/10 overflow-hidden">
                <CardContent className="p-0">
                  {/* Compact Pricing Header */}
                  <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-4 border-b border-gray-700/50">
                    <div className="text-center space-y-2">
                      {course.price ? (
                        <div className="space-y-1">
                          <div className="flex items-center justify-center gap-2">
                            {course.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                {course.originalPrice}
                              </span>
                            )}
                            <span className="text-2xl font-bold text-white">
                              {course.price}
                            </span>
                          </div>
                          {/* {course.originalPrice && (
                            <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30 text-xs">
                              Save ₹{parseInt(course.originalPrice) - parseInt(course.price)}
                            </Badge>
                          )} */}
                        </div>
                      ) : (
                        <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                          Free Course
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    {/* Compact CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() => setIsEnrollmentModalOpen(true)}
                        className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold py-3 text-sm rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/25"
                      >
                        <GraduationCap className="w-4 h-4 mr-2" />
                        Enroll Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>

                    {/* Compact Highlights */}
                    <div className="space-y-2">
                      <h4 className="text-white font-medium flex items-center gap-1 text-xs">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        What's Included:
                      </h4>
                      <div className="space-y-1 text-xs">
                        {Number(course.lessons) !==0 && (
                          <div className="flex items-center gap-1 text-gray-300">
                            <BookOpen className="w-3 h-3 text-cyan-400" />
                            <span>
                              {Number(course.lessons)} comprehensive lesson
                              {Number(course.lessons) === 1 ? "" : "s"}
                            </span>
                          </div>
                        )}

                        {course.projects && (
                          <div className="flex items-center gap-1 text-gray-300">
                            <Code className="w-3 h-3 text-purple-400" />
                            <span>{course.projects} hands-on projects</span>
                          </div>
                        )}
                        {course.certificate && (
                          <div className="flex items-center gap-1 text-gray-300">
                            <Award className="w-3 h-3 text-yellow-400" />
                            <span>Certificate of completion</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-gray-300">
                          <Shield className="w-3 h-3 text-green-400" />
                          <span>Lifetime access</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-300">
                          <MessageSquare className="w-3 h-3 text-blue-400" />
                          <span>Community support</span>
                        </div>
                      </div>
                    </div>

                    {/* Compact Actions */}
                    <div className="pt-2 border-t border-gray-700/50">
                      <div className="grid grid-cols-3 gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors h-7"
                        >
                          <Heart className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors h-7"
                        >
                          <Share2 className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors h-7"
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Compact Support */}
                    <div className="pt-2 border-t border-gray-700/50 text-center">
                      <p className="text-xs text-gray-400 mb-2">Need help?</p>
                      <div className="flex justify-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-cyan-400 hover:bg-cyan-500/10 transition-colors text-xs h-6"
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-cyan-400 hover:bg-cyan-500/10 transition-colors text-xs h-6"
                        >
                          <MessageSquare className="w-3 h-3 mr-1" />
                          Chat
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Compact Syllabus Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-white">
              Course{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Curriculum
              </span>
            </h2>
            <p className="text-gray-300 text-sm max-w-xl mx-auto">
              Comprehensive learning path designed by industry experts
            </p>
          </div>

          {course.syllabus && course.syllabus.length > 0 ? (
            <div className="space-y-3">
              {course.syllabus.map((module, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 overflow-hidden">
                    <button
                      onClick={() =>
                        setOpenModule(openModule === idx ? null : idx)
                      }
                      className="w-full p-4 flex justify-between items-center text-left hover:bg-gray-800/20 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-300 rounded-lg font-bold text-sm group-hover:scale-105 transition-transform">
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-white mb-1 pr-4 group-hover:text-cyan-300 transition-colors">
                            {module.module}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              {module.topics?.length || 0} topics
                            </span>
                            <span className="flex items-center gap-1">
                              <Info className="w-3 h-3" />
                              {openModule === idx
                                ? "Click to collapse"
                                : "Click to expand"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <motion.div
                          animate={{ rotate: openModule === idx ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-4 h-4 text-cyan-400" />
                        </motion.div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {openModule === idx && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-700/50"
                        >
                          <div className="p-4 bg-black/20">
                            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg p-3 border border-gray-700/30">
                              <h4 className="text-xs font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                                <CheckCircle className="w-3 h-3" />
                                Learning Objectives:
                              </h4>
                              {module.topics && module.topics.length > 0 ? (
                                <div className="grid sm:grid-cols-2 gap-2">
                                  {module.topics.map((topic, i) => (
                                    <motion.div
                                      key={i}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{
                                        duration: 0.3,
                                        delay: i * 0.03,
                                      }}
                                      className="flex items-start gap-2 text-gray-300 p-2 rounded hover:bg-gray-800/30 transition-colors group"
                                    >
                                      <ChevronRight className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                                      <span className="leading-relaxed text-xs">
                                        {topic}
                                      </span>
                                    </motion.div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-6">
                                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                                    <BookOpen className="w-6 h-6 text-cyan-400" />
                                  </div>
                                  <p className="text-gray-400 text-xs italic">
                                    Detailed topics will be updated soon. Stay
                                    tuned!
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-gray-700/50">
              <CardContent className="text-center py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center"
                >
                  <BookOpen className="w-8 h-8 text-cyan-400" />
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-3">
                  Curriculum Under Development
                </h3>
                <p className="text-gray-400 mb-4 text-xs max-w-xs mx-auto">
                  Our expert curriculum team is crafting a comprehensive
                  learning experience. The detailed syllabus will be available
                  soon!
                </p>
                <Button
                  variant="outline"
                  className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 text-xs h-8"
                >
                  <Bell className="w-3 h-3 mr-1" />
                  Get Notified
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.section>

        {/* Compact Tags */}
        {course.tags && course.tags.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="max-w-3xl mx-auto mt-12 text-center space-y-4"
          >
            <h3 className="text-lg font-bold text-white">Related Topics</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {course.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-purple-300 border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 transition-all duration-300 px-2 py-1 text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.section>
        )}

        {/* Compact Final CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 backdrop-blur-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="max-w-2xl mx-auto space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Ready to Transform Your Career?
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Join thousands of successful learners who have advanced their
                  careers with our comprehensive courses. Start your journey
                  today!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <Button
                    onClick={() => setIsEnrollmentModalOpen(true)}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold px-6 py-2 text-sm rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/25"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Learning Now
                  </Button>
                  <Button
                    variant="outline"
                    className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 px-6 py-2 text-sm rounded-lg transition-all duration-300"
                    onClick={() => router.push("/courses")}
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Explore All Courses
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>

      {/* Enrollment Modal */}
      <EnrollmentModal
        course={course}
        isOpen={isEnrollmentModalOpen}
        onClose={() => setIsEnrollmentModalOpen(false)}
      />
    </main>
  );
}
