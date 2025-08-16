"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  Calendar,
  Target,
  Users,
  Play,
  Download,
  Star,
  ChevronRight,
  GraduationCap,
  Trophy
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AuthGuard } from '@/components/AuthGuard';

interface CourseProgress {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  category: string;
  instructor: string;
  rating: number;
  difficulty: string;
  estimatedTime: string;
}

function StudentDashboardContent() {
  const { user } = useAuth();
  const router = useRouter();
  const [enrolledCourses, setEnrolledCourses] = useState<CourseProgress[]>([]);

  useEffect(() => {
    // Mock data for enrolled courses
    setEnrolledCourses([
      {
        id: '1',
        title: 'Python for Data Science',
        description: 'Complete guide to Python programming for data analysis',
        progress: 65,
        totalLessons: 24,
        completedLessons: 16,
        category: 'Data Science',
        instructor: 'Dr. Sarah Johnson',
        rating: 4.8,
        difficulty: 'Intermediate',
        estimatedTime: '2h remaining'
      },
      {
        id: '2',
        title: 'Machine Learning Fundamentals',
        description: 'Introduction to ML algorithms and practical implementation',
        progress: 30,
        totalLessons: 18,
        completedLessons: 5,
        category: 'AI/ML',
        instructor: 'Prof. Mike Chen',
        rating: 4.9,
        difficulty: 'Beginner',
        estimatedTime: '8h remaining'
      },
      {
        id: '3',
        title: 'React Development Masterclass',
        description: 'Build modern web applications with React and Next.js',
        progress: 85,
        totalLessons: 32,
        completedLessons: 27,
        category: 'Web Development',
        instructor: 'Alex Rodriguez',
        rating: 4.7,
        difficulty: 'Advanced',
        estimatedTime: '1h remaining'
      }
    ]);
  }, []);

  const stats = [
    {
      icon: BookOpen,
      label: 'Enrolled Courses',
      value: enrolledCourses.length.toString(),
      subtext: 'Active learning',
      color: 'cyan'
    },
    {
      icon: Trophy,
      label: 'Completed Courses',
      value: '7',
      subtext: 'Certificates earned',
      color: 'purple'
    },
    {
      icon: Clock,
      label: 'Total Study Time',
      value: '142h',
      subtext: 'This month',
      color: 'pink'
    },
    {
      icon: Target,
      label: 'Learning Streak',
      value: '12',
      subtext: 'Days in a row',
      color: 'emerald'
    }
  ];

  const achievements = [
    {
      title: 'First Course Completed',
      description: 'Completed your first course successfully',
      icon: GraduationCap,
      earned: true
    },
    {
      title: 'Data Science Expert',
      description: 'Complete 5 Data Science courses',
      icon: TrendingUp,
      earned: true
    },
    {
      title: 'Perfect Week',
      description: 'Study 7 days in a row',
      icon: Calendar,
      earned: false
    },
    {
      title: 'Community Helper',
      description: 'Help 10 fellow students',
      icon: Users,
      earned: false
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome back, {user?.firstName}!
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Continue your learning journey and track your progress
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl bg-${stat.color}-500/20 border border-${stat.color}-500/30`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-gray-500 text-xs mt-1">{stat.subtext}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enrolled Courses */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <BookOpen className="w-6 h-6 text-cyan-400" />
                <span>Continue Learning</span>
              </h2>

              <div className="space-y-4">
                {enrolledCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 overflow-hidden group">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                              {course.title}
                            </h3>
                            <p className="text-gray-400 text-sm mb-3">{course.description}</p>
                            
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="flex items-center space-x-1">
                                <Award className="w-3 h-3" />
                                <span>{course.category}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <span>{course.instructor}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-400" />
                                <span>{course.rating}</span>
                              </span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center space-x-1"
                          >
                            <Play className="w-3 h-3" />
                            <span>Continue</span>
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white font-medium">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${course.progress}%` }}
                              transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{course.completedLessons} of {course.totalLessons} lessons</span>
                            <span>{course.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center pt-4"
                >
                  <Button
                    onClick={() => router.push('/courses')}
                    variant="outline"
                    className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-200"
                  >
                    Browse More Courses
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Achievements & Quick Actions */}
          <div className="space-y-6">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>Achievements</span>
              </h2>

              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <Card key={index} className={`bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-700/50 transition-all duration-300 ${achievement.earned ? 'border-yellow-500/30' : ''}`}>
                    <div className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${achievement.earned ? 'bg-yellow-500/20 border border-yellow-500/30' : 'bg-gray-700/50'}`}>
                          <achievement.icon className={`w-4 h-4 ${achievement.earned ? 'text-yellow-400' : 'text-gray-500'}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${achievement.earned ? 'text-yellow-300' : 'text-gray-400'}`}>
                            {achievement.title}
                          </h4>
                          <p className="text-xs text-gray-500">{achievement.description}</p>
                        </div>
                        {achievement.earned && (
                          <Award className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
              
              <div className="space-y-3">
                <Button
                  onClick={() => router.push('/courses')}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white justify-start"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Explore New Courses
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 justify-start"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Certificates
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 justify-start"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Join Study Groups
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  return (
    <AuthGuard requiredRole="student" redirectTo="/admin">
      <StudentDashboardContent />
    </AuthGuard>
  );
}
