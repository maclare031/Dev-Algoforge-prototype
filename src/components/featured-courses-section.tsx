"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Eye,
  Sparkles,
  Brain,
  X,
  Shield,
} from "lucide-react";
import axios from "axios";
import { CourseCard } from "./course-card";

// Interface for Course
interface Course {
  _id?: string;
  id?: string;
  title: string;
  subtitle?: string;
  description: string;
  duration: string;
  category: string;
  level?: string;
  iconName: string;
  rating?: number;
  students?: string;
  mode?: string;
  price?: string;
  originalPrice?: string;
  skills?: string[];
  tags?: string[];
  featured?: boolean;
  trending?: boolean;
  icon?: any;
  bgImage?: string;
  gradient?: string;
}

// Interface for Form Data
interface FormData {
  name: string;
  email: string;
  phone: string;
  currentLevel: string;
  interests: string[];
  goals: string;
  timeCommitment: string;
}

export function FeaturedCoursesSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [courses, setCourses] = useState<Course[]>([]);
  const [showRecommendationForm, setShowRecommendationForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    currentLevel: "",
    interests: [],
    goals: "",
    timeCommitment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses");
        const allCourses = response.data.courses || [];
        
        const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;

        const count = isTablet ? 4 : 3;
        const featuredCourses = allCourses.filter(
          (course: Course) => course.featured
        );
        const coursesToShow =
          featuredCourses.length > 0
            ? featuredCourses.slice(0, count)
            : allCourses.slice(0, count);

        setCourses(coursesToShow);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [isClient]);

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmitRecommendation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submissionData = {
        formType: "Recommendation",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        experienceLevel: formData.currentLevel,
        interests: formData.interests,
        goal: formData.goals,
        availability: formData.timeCommitment,
        notes: `Time Commitment: ${formData.timeCommitment}. Goals: ${formData.goals || 'Not specified'}`
      };
      
      const response = await axios.post("/api/leads", submissionData);
      
      if (response.data.success) {
        alert("Thank you! We'll send you personalized recommendations within 24 hours.");
        setShowRecommendationForm(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          currentLevel: "",
          interests: [],
          goals: "",
          timeCommitment: "",
        });
      } else {
        throw new Error(response.data.error || "Submission failed");
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      const errorMessage = error.response?.data?.error || error.message || "Something went wrong. Please try again.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayedCourses = courses.map((course) => ({
    ...course,
    icon: Brain,
    id: course._id || course.id,
    bgImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    gradient: "from-cyan-500 to-purple-500",
    tags: course.tags || [course.level || "Beginner"],
    skills: course.skills || [],
    subtitle: course.subtitle || course.category,
  }));

  const interestOptions = [
    "Web Development", "Data Science", "Machine Learning", "Mobile Development",
    "Cloud Computing", "Cybersecurity", "UI/UX Design", "Digital Marketing",
    "DevOps", "Blockchain"
  ];

  return (
    <section
      ref={ref}
      className="py-12 md:py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ x: [-50, 50, -50], y: [-50, 50, -50], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: "10%", top: "20%" }}
        />
        <motion.div
          className="absolute w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ x: [50, -50, 50], y: [50, -50, 50], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ right: "10%", bottom: "20%" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-gray-800/30 backdrop-blur-sm rounded-full px-5 py-3 border border-gray-700/20 mb-3">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span className="font-semibold text-xs sm:text-sm text-cyan-300">
              Featured Programs
            </span>
          </div>

          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
              Featured Courses
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-2xl mx-auto leading-relaxed">
            Specialized programs designed to fit your schedule while advancing
            your career
          </p>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="py-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-2 md:mx-0 mx-[2rem]"
        >
          {displayedCourses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              inView={inView}
              index={index}
            />
          ))}
        </motion.div>

        {/* "View All Courses" Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => (window.location.href = "/courses")}
              className="group bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex items-center gap-2">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">View All Courses</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-50" />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl" />

            <div className="relative z-10">
              <motion.div
                className="flex justify-center mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </motion.div>

              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4">
                Can't Find the Perfect Course?
              </h3>
              <p className="text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                Our learning advisors will help you find the perfect program
                based on your goals, experience, and schedule.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    onClick={() => setShowRecommendationForm(true)}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                  >
                    Get Personalized Recommendation
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="bg-gradient-to-r from-black/60 to-gray-900/60 border-2 border-purple-500/50 text-purple-300 hover:border-transparent hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 hover:text-white px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-500 backdrop-blur-xl shadow-lg hover:shadow-purple-500/30"
                    onClick={() => (window.location.href = "/courses")}
                  >
                    View All Courses
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showRecommendationForm && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                setShowRecommendationForm(false);
                }
            }}
            >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-700/50 rounded-2xl max-w-md sm:max-w-lg w-full shadow-2xl max-h-[85vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
            >
                {/* Header - Fixed */}
                <div className="flex justify-between items-start p-4 sm:p-6 pb-0 flex-shrink-0">
                <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                    Get Personalized Recommendations
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm">
                    Tell us about yourself for perfect course matches
                    </p>
                </div>
                <button
                    onClick={() => setShowRecommendationForm(false)}
                    className="text-gray-400 hover:text-white transition-colors p-1"
                >
                    <X className="w-5 h-5" />
                </button>
                </div>

                {/* Scrollable Form Content */}
                <div className="flex-1 overflow-y-auto scrollbar-hide px-4 sm:px-6 pb-4 sm:pb-6">
                <form onSubmit={handleSubmitRecommendation} className="flex flex-col gap-3 pt-4 sm:pt-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="bg-gray-800/70 border border-gray-600/60 text-white text-xs sm:text-sm rounded-lg py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="Full Name *"
                    />
                    
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-gray-800/70 border border-gray-600/60 text-white text-xs sm:text-sm rounded-lg py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="Email Address *"
                    />
                    </div>

                    <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-gray-800/70 border border-gray-600/60 text-white text-xs sm:text-sm rounded-lg py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="Phone Number"
                    />

                    {/* Experience Level */}
                    <select
                    required
                    value={formData.currentLevel}
                    onChange={(e) => handleInputChange('currentLevel', e.target.value)}
                    className="bg-gray-800/70 border border-gray-600/60 text-white text-xs sm:text-sm rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    >
                    <option value="">Experience Level *</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    </select>

                    {/* Time Commitment */}
                    <select
                    required
                    value={formData.timeCommitment}
                    onChange={(e) => handleInputChange('timeCommitment', e.target.value)}
                    className="bg-gray-800/70 border border-gray-600/60 text-white text-xs sm:text-sm rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    >
                    <option value="">Time Commitment *</option>
                    <option value="1-3 hours/week">1-3 hours/week</option>
                    <option value="4-6 hours/week">4-6 hours/week</option>
                    <option value="7-10 hours/week">7-10 hours/week</option>
                    <option value="10+ hours/week">10+ hours/week</option>
                    </select>

                    {/* Interests */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {interestOptions.map((interest) => (
                        <button
                        key={interest}
                        type="button"
                        onClick={() => handleInterestToggle(interest)}
                        className={`p-2 text-xs rounded-lg border transition-all ${
                            formData.interests.includes(interest)
                            ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                            : 'border-gray-600 bg-gray-800/30 text-gray-300 hover:border-gray-500'
                        }`}
                        >
                        {interest}
                        </button>
                    ))}
                    </div>

                    {/* Goals */}
                    <textarea
                    value={formData.goals}
                    onChange={(e) => handleInputChange('goals', e.target.value)}
                    className="bg-gray-800/70 border border-gray-600/60 text-white text-xs sm:text-sm rounded-lg py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all h-16 resize-none"
                    placeholder="What are your learning goals? (optional)"
                    />

                    {/* Submit Button */}
                    <Button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.currentLevel || !formData.timeCommitment}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-2 px-4 rounded-lg text-xs sm:text-sm transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 disabled:cursor-not-allowed mt-2"
                    >
                    {isSubmitting ? (
                        <div className="flex items-center gap-2 justify-center">
                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 justify-center">
                        <Brain className="w-4 h-4" />
                        <span>Get My Recommendations</span>
                        </div>
                    )}
                    </Button>

                    <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-400">
                    <Shield className="w-3 h-3" />
                    <span>Secure</span>
                    <span className="h-1 w-1 bg-gray-600 rounded-full" />
                    <span>No Spam</span>
                    </div>
                </form>
                </div>
            </motion.div>
            </motion.div>
        )}
        </AnimatePresence>
    </section>
  );
}