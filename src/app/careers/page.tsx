"use client";

import { useState } from "react";
import axios from 'axios';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Send,
  CheckCircle,
  Upload,
  MapPin,
  Clock,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  Building2,
  Globe,
  Mail,
  Phone,
  User,
  Briefcase,
  FileText,
  Star,
  Zap,
  Target,
  TrendingUp,
  Code,
  Brain,
} from "lucide-react";

export default function CareerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    if (selectedFile) {
      formData.append('resume', selectedFile);
    }

    try {
      const response = await axios.post('/api/careers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900/95 to-black flex items-center justify-center p-3 relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{ left: "20%", top: "20%" }}
          />
          <motion.div
            className="absolute w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl"
            animate={{ scale: [1.2, 1, 1.2], rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity }}
            style={{ right: "30%", bottom: "30%" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative max-w-md w-full bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-2xl rounded-2xl border border-emerald-500/20 p-6 text-center shadow-2xl"
        >
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              type: "spring",
              bounce: 0.5,
            }}
            className="relative w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/50"
          >
            <CheckCircle className="w-8 h-8 text-white" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full opacity-30"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-cyan-400/60 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -80],
                x: [0, (i - 3) * 15],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                repeatDelay: 2,
              }}
              style={{
                left: `${30 + i * 8}%`,
                top: "40%",
              }}
            />
          ))}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl font-bold text-white mb-3"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Application Submitted!
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-gray-300 mb-6 leading-relaxed text-sm"
          >
            Thank you for your interest in joining AlgoForgeStudios! We'll
            review your application and get back to you within{" "}
            <span className="text-cyan-400 font-semibold">
              2-3 business days
            </span>
            .
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="space-y-3"
          >
            <Button
              onClick={() => window.location.reload()}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white py-2.5 rounded-lg shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 text-sm"
            >
              Submit Another Application
            </Button>

            <div className="flex items-center justify-center gap-3 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Quick Response</span>
              </div>
              <div className="w-1 h-1 bg-gray-600 rounded-full" />
              <div className="flex items-center gap-1">
                <Award className="w-3 h-3" />
                <span>Professional Team</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/80 via-gray-900/90 to-black text-white relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-48 h-48 sm:w-64 sm:h-64 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [-50, 50, -50],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: "15%", top: "15%" }}
        />
        <motion.div
          className="absolute w-48 h-48 sm:w-64 sm:h-64 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [50, -50, 50],
            y: [50, -50, 50],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{ right: "15%", bottom: "15%" }}
        />
        <motion.div
          className="absolute w-32 h-32 bg-pink-500/10 rounded-full blur-2xl"
          animate={{
            x: [-30, 30, -30],
            y: [30, -30, 30],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-b from-gray-900/80 to-transparent border-b border-gray-700/40">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 text-xs font-medium px-3 py-1.5 rounded-full mb-4 border border-cyan-500/30 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-3 h-3 animate-pulse" />
              We're hiring amazing talent
            </motion.div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Build the Future
              </span>
              <br />
              <span className="text-white">of AI with Us</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed">
              Join AlgoForgeStudios in revolutionizing AI and machine learning.
              We're looking for passionate innovators to help us make AI
              accessible to everyone.
            </p>

            {/* Company highlights */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-cyan-400" />
                <span>Uttar Pradesh, India</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3 h-3 text-purple-400" />
                <span>50+ AI Engineers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3 h-3 text-pink-400" />
                <span>Remote-First</span>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span>Rapidly Growing</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-12 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Company Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Why{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  AlgoForgeStudios
                </span>
                ?
              </h2>
              <p className="text-gray-300 mb-4 leading-relaxed text-sm sm:text-base">
                We're building cutting-edge AI solutions that impact millions of
                users. Join a team of passionate engineers, researchers, and
                creators who are forging the future of machine learning and
                artificial intelligence.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Brain,
                  title: "AI Innovation",
                  description:
                    "Work on breakthrough ML models and cutting-edge AI research projects.",
                  color: "from-cyan-500 to-blue-500",
                },
                {
                  icon: Users,
                  title: "Collaborative Culture",
                  description:
                    "Join passionate ML engineers in a supportive, inclusive environment.",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  icon: Zap,
                  title: "Flexible Work",
                  description:
                    "Remote-first company with flexible hours and work-life balance.",
                  color: "from-emerald-500 to-green-500",
                },
                {
                  icon: Target,
                  title: "Fast-Growing",
                  description:
                    "Be part of a rapidly scaling AI company with exciting challenges.",
                  color: "from-orange-500 to-red-500",
                },
              ].map(({ icon: Icon, title, description, color }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/40 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300"
                >
                  <div
                    className={`w-8 h-8 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1 text-sm">
                      {title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-gray-700/40 backdrop-blur-sm">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2 text-sm">
                <Award className="w-4 h-4 text-yellow-400" />
                What we offer
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  "Competitive compensation",
                  "Health & wellness benefits",
                  "Learning & development budget",
                  "Flexible working arrangements",
                  "Stock options program",
                  "Latest ML/AI tools & hardware",
                ].map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: Application Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-gray-700/40 rounded-xl p-5 shadow-2xl sticky top-8"
          >
            <div className="mb-6">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Apply Now</h3>
                  <p className="text-gray-400 text-xs">
                    Join our AI revolution
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">
                    First name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    className="w-full px-3 py-2.5 bg-gray-800/50 border border-gray-600/50 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 placeholder:text-gray-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">
                    Last name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    className="w-full px-3 py-2.5 bg-gray-800/50 border border-gray-600/50 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-800/50 border border-gray-600/50 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 placeholder:text-gray-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 9876543210"
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-800/50 border border-gray-600/50 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Position *
                </label>
                <select
                  name="position"
                  className="w-full px-3 py-2.5 bg-gray-800/50 border border-gray-600/50 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
                  required
                >
                  <option value="">Select a position</option>
                  <option value="senior-ml-engineer">Senior ML Engineer</option>
                  <option value="ai-researcher">AI Research Scientist</option>
                  <option value="data-instructor">
                    Data Science Instructor
                  </option>
                  <option value="backend-dev">Backend Developer</option>
                  <option value="frontend-dev">Frontend Developer</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Experience level
                </label>
                <select name="experienceLevel" className="w-full px-3 py-2.5 bg-gray-800/50 border border-gray-600/50 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300">
                  <option value="">Select experience level</option>
                  <option value="entry">Entry level (0-2 years)</option>
                  <option value="mid">Mid level (2-5 years)</option>
                  <option value="senior">Senior level (5+ years)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Resume *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="sr-only"
                    id="resume-upload"
                    required
                  />
                  <label
                    htmlFor="resume-upload"
                    className="w-full border-2 border-dashed border-gray-600/50 bg-gray-800/30 rounded-lg px-3 py-6 hover:border-cyan-500/50 hover:bg-gray-800/50 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center group"
                  >
                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 mb-2 transition-colors" />
                    {selectedFile ? (
                      <span className="text-xs text-white font-medium">
                        {selectedFile.name}
                      </span>
                    ) : (
                      <>
                        <span className="text-xs text-gray-300 font-medium mb-1">
                          Click to upload your resume
                        </span>
                        <span className="text-xs text-gray-500">
                          PDF, DOC, or DOCX up to 10MB
                        </span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Portfolio or LinkedIn
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="url"
                    name="portfolioUrl"
                    placeholder="https://linkedin.com/in/johndoe"
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-800/50 border border-gray-600/50 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Why are you interested in this role?
                </label>
                <textarea
                  name="coverLetter"
                  placeholder="Tell us what excites you about joining our AI revolution..."
                  className="w-full px-3 py-2.5 bg-gray-800/50 border border-gray-600/50 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 h-20 resize-none transition-all duration-300 placeholder:text-gray-500"
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/30 text-sm"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Submitting application...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Send className="w-3.5 h-3.5 ml-2" />
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center leading-relaxed">
                By submitting this form, you agree to our privacy policy and
                terms of service. We'll never share your information with third
                parties.
              </p>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer section */}
      <div className="relative bg-gradient-to-t from-gray-900/80 to-transparent border-t border-gray-700/40 py-12">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 text-center">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
            Questions about working at{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              AlgoForgeStudios
            </span>
            ?
          </h3>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto leading-relaxed text-sm">
            Feel free to reach out to our team. We're happy to chat about
            opportunities, our culture, or anything else you'd like to know
            about joining our AI revolution.
          </p>
          <motion.a
            href="mailto:careers@algoforgestudios.com?subject=Career Inquiry - AlgoForgeStudios&body=Hi there,%0D%0A%0D%0AI have some questions about career opportunities at AlgoForgeStudios.%0D%0A%0D%0AThank you!"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="inline-block"
          >
            <Button
              variant="outline"
              className="group relative bg-gradient-to-r from-gray-900/80 to-black/80 border-2 border-gray-600/50 text-gray-300 hover:border-transparent px-5 py-2.5 rounded-lg text-sm transition-all duration-500 overflow-hidden backdrop-blur-xl shadow-2xl hover:shadow-cyan-500/50"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="relative flex items-center z-10">
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Mail className="w-3.5 h-3.5 mr-2 text-gray-400 group-hover:text-white transition-all duration-300" />
                </motion.div>
                <span className="font-semibold group-hover:text-white transition-colors duration-300">
                  Contact our team
                </span>
                
                {/* Bouncing arrow */}
                <motion.div
                  className="ml-2 opacity-0 group-hover:opacity-100"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </motion.div>
              </div>
              
              {/* Pulsing dots */}
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping" />
              </div>
            </Button>
          </motion.a>
        </div>
      </div>
    </div>
  );
}
