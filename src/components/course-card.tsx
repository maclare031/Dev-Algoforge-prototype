"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Users,
  Star,
  BookOpen,
  Award,
  Play,
  Brain,
  Code,
  Database,
  BarChart3,
  Globe,
  Shield,
  Sparkles,
  Megaphone,
  Palette,
} from "lucide-react";

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

export function CourseCard({ course, inView, index }: { course: Course, inView: boolean, index: number }) {
  // Icon mapping for dynamic course icons
  const iconMap: { [key: string]: any } = {
    Brain,
    Code,
    Database,
    BarChart3,
    Globe,
    Shield,
    Sparkles,
    Megaphone,
    Palette,
  };

  // Get the appropriate icon component
  const IconComponent = iconMap[course.iconName] || Brain;

  const handleCourseClick = (courseId: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = `/courses/${courseId}`;
    }
  };

  // Function to truncate text with ellipsis
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <motion.div
      key={course.id || course._id}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
      onClick={() => handleCourseClick(course.id || course._id || '')}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer md:max-w-sm   mx-auto w-full h-full flex flex-col"
    >
      {/* Course Header with Background */}
      <div
        className="relative h-28 sm:h-32 p-3 text-white overflow-hidden flex-shrink-0"
        style={{ background: course.bgImage || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        {/* Duration Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {course.duration}
          </span>
        </div>

        {/* Tags */}
        <div className="absolute top-3 right-3 flex flex-col gap-1 max-w-[100px]">
          {course.tags?.slice(0, 2).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-xs font-medium text-center"
              title={tag} // Show full text on hover
            >
              {truncateText(tag, 10)}
            </span>
          ))}
        </div>

        {/* Course Icon */}
        <div className="absolute bottom-3 left-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <IconComponent className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Play Button */}
        <div className="absolute bottom-3 right-3">
          <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <Play className="w-4 h-4 text-white ml-0.5" />
          </button>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        {/* Title and Subtitle */}
        <div className=" mb-1 flex flex-col justify-start">
          <h3 
            className="text-base sm:text-lg font-bold text-gray-900 mb-0 group-hover:text-blue-600 transition-colors leading-tight"
            title={course.title} // Show full title on hover
          >
            {truncateText(course.title, 60)} {/* Adjust character limit as needed */}
          </h3>
          {/* {course.subtitle && (
            <p 
              className="text-blue-600 font-medium text-xs"
              title={course.subtitle}
            >
              {truncateText(course.subtitle, 40)}
            </p>
          )} */}
        </div>

        {/* Description - Optional */}
        {course.description && (
          <div className="mb-2 min-h-[32px]">
            <p 
              className="text-gray-700 text-xs leading-relaxed"
              title={course.description}
            >
              {truncateText(course.description, 80)}
            </p>
          </div>
        )}

        {/* Course Info */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 text-gray-500 flex-shrink-0" />
            <span 
              className="text-gray-700"
              title={course.students}
            >
              {truncateText(course.students || '0', 10)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500 flex-shrink-0" />
            <span className="text-gray-700">{course.rating || '4.5'}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-3 h-3 text-gray-500 flex-shrink-0" />
            <span 
              className="text-gray-700"
              title={course.mode}
            >
              {truncateText(course.mode || 'Online', 12)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-3 h-3 text-gray-500 flex-shrink-0" />
            <span 
              className="text-gray-700"
              title={course.level}
            >
              {truncateText(course.level || 'Beginner', 12)}
            </span>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-3 min-h-[28px] flex items-center">
          <div className="flex flex-wrap gap-1">
            {course.skills?.slice(0, 2).map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium"
                title={skill} // Show full skill name on hover
              >
                {truncateText(skill, 12)}
              </span>
            ))}
            {(course.skills?.length || 0) > 2 && (
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-medium">
                +{(course.skills?.length || 0) - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Price and CTA - Fixed at bottom */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-gray-100 mt-auto">
          <div>
            <div className="flex items-center gap-1">
              <span className="text-base sm:text-lg font-bold text-gray-900">
                {course.price || 'Free'}
              </span>
              {course.originalPrice && (
                <span className="text-xs text-gray-500 line-through">
                  {course.originalPrice}
                </span>
              )}
            </div>
            {course.originalPrice && course.price !== 'Free' && (
              <span className="text-xs text-green-600 font-medium">
                Save 22%
              </span>
            )}
          </div>
          <Button
            size="sm"
            className={`${
              course.gradient 
                ? `bg-gradient-to-r ${course.gradient}` 
                : 'bg-gradient-to-r from-blue-600 to-purple-600'
            } hover:opacity-90 text-white font-semibold rounded-lg transition-all duration-300 w-full sm:w-auto px-3 py-1.5 text-xs`}
          >
            Enroll Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
