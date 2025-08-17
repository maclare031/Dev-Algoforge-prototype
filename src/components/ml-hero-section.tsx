 "use client";

import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Star, Shield, Zap, Gift } from "lucide-react";
import {
  Play,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Building,
  Calendar,
  Award,
  CheckCircle,
  Users
} from "lucide-react";

import Scene from "./robot/Scene";
import { AutoPopupCTA } from "./auto-popup-cta";
import Link from "next/link";
import { EnterpriseLeadForm } from "./EnterpriseLeadForm";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  experienceLevel: z.string().min(1, "Experience level is required"),
  interests: z.string().optional(),
  goal: z.string().optional(),
  availability: z.string().optional(),
  preferredTime: z.string().optional(),
  notes: z.string().optional()
});

export function MLHeroSection() {
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [formType, setFormType] = useState<'ScheduleCall' | 'JoinProjects' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enterpriseFormModalOpen, setEnterpriseFormModalOpen] = useState(false);
  
  // FIX: State to prevent hydration errors
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // FIX: Set isMounted to true only on the client-side
    setIsMounted(true);
  }, []);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema)
  });

  const openFormModal = (type: 'ScheduleCall' | 'JoinProjects') => {
    setFormType(type);
    reset(); // Reset form when opening
    setFormModalOpen(true);
  };

  const closeFormModal = () => {
    setFormModalOpen(false);
    reset(); // Reset form when closing
    setFormType(null);
  };

  const openEnterpriseFormModal = () => {
    setEnterpriseFormModalOpen(true);
  };

  const closeEnterpriseFormModal = () => {
    setEnterpriseFormModalOpen(false);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!formType) {
      alert('Please select a form type');
      return;
    }
  
    const submitData = {
      formType: formType,
      name: data.name?.trim() || '',
      email: data.email?.trim().toLowerCase() || '',
      phone: data.phone?.trim() || '',
      experienceLevel: data.experienceLevel || '',
      interests: data.interests?.trim() || '',
      goal: data.goal?.trim() || '',
      availability: data.availability?.trim() || '',
      preferredTime: data.preferredTime?.trim() || '',
      notes: data.notes?.trim() || ''
    };
  
    console.log('Submitting form data:', submitData);
  
    try {
      setIsSubmitting(true);
      
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });
  
      const result = await response.json();
      console.log('Form submission response:', result);
  
      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }
  
      alert(result.message || 'Form submitted successfully! We will contact you soon.');
      reset();
      closeFormModal();
  
    } catch (error: any) {
      console.error('Error submitting form:', error);
      let errorMessage = 'Failed to submit form. Please try again.';
      if (error.message) {
        errorMessage = error.message;
      }
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const openWhatsApp = () => {
    window.open("https://wa.me/8292222569", "_blank");
  };

  // useEffect(() => {
  //   const handleMouseMove = (e: MouseEvent) => {
  //     setMousePosition({ x: e.clientX, y: e.clientY });
  //   };
  //   window.addEventListener("mousemove", handleMouseMove);
  //   return () => window.removeEventListener("mousemove", handleMouseMove);
  // }, []);


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mt-4">
      <div className="absolute inset-0">
        <div className="absolute w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-cyan-500/10 rounded-full blur-3xl" style={{ left: "10%", top: "15%" }} />
        <div className="absolute w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-purple-500/10 rounded-full blur-3xl" style={{ right: "10%", bottom: "15%" }} />
        <div className="absolute w-32 h-32 sm:w-48 sm:h-48 lg:w-96 lg:h-96 bg-pink-500/10 rounded-full blur-3xl" style={{ left: "60%", top: "60%" }} />

        <div className="absolute inset-0 opacity-10 sm:opacity-20 hidden sm:block">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute border border-cyan-500/30 rounded-full" style={{ width: `${100 + i * 50}px`, height: `${100 + i * 50}px`, left: `${-50 - i * 25}px`, top: `${-50 - i * 25}px` }} />
            ))}
          </div>
        </div>

        {/* FIX: Conditionally render particles only on the client */}
        {isMounted && [...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-cyan-400/50 rounded-full hidden sm:block"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      {/* ... (rest of the file remains the same) ... */}
      
      {/* Lead Form Modal and other UI elements */}
      <Transition.Root show={formModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeFormModal}>
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-lg transition-opacity" />
    </Transition.Child>

    <div className="fixed inset-0 z-10 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-h-[90vh]">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-6 scale-95"
          enterTo="opacity-100 translate-y-0 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 scale-100"
          leaveTo="opacity-0 translate-y-6 scale-95"
        >
          <Dialog.Panel 
            className="relative w-full max-w-sm mx-auto bg-gradient-to-br from-gray-900 via-gray-900 to-black rounded-2xl border border-cyan-600/40 shadow-2xl overflow-hidden overflow-y-auto"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
            
            <button
              onClick={closeFormModal}
              className="absolute top-2 right-2 z-10 w-9 h-9 bg-red-500/90 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-all duration-200 shadow-lg hover:shadow-red-500/25"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative text-center py-4 px-3">
              <div 
                className="flex justify-center mb-2"
              >
                <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full px-3 py-1 text-xs text-cyan-200 font-semibold border border-cyan-500/30">
                  {formType === 'ScheduleCall' ? '🎯 Expert Consultation' : '🚀 Hands-on Learning'}
                </div>
              </div>

              <h2 
                className="text-white text-xl font-bold mb-1 leading-tight"
              >
                {formType === 'ScheduleCall' ? 'Get AI/ML Guidance' : 'Build Real Projects'}
              </h2>

              <div 
                className="flex items-center justify-center gap-1 text-xs text-gray-400 mb-2"
              >
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  4.9
                </span>
                <span className="w-1 h-1 bg-gray-600 rounded-full" />
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  Trusted
                </span>
                <span className="w-1 h-1 bg-gray-600 rounded-full" />
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-blue-400" />
                  15K+ Students
                </span>
              </div>

              <div 
                className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg px-3 py-2 text-yellow-100 text-xs text-center border border-yellow-500/30 flex items-center justify-center gap-1 shadow-lg"
              >
                <Gift className="w-3 h-3" />
                <span className="font-medium">
                  {formType === 'ScheduleCall' ? '✨ Free 30-min Session!' : '🎁 Free Project Access!'}
                </span>
              </div>
            </div>

            <div className="px-3 pb-4 max-h-[calc(100vh-16rem)] overflow-y-auto custom-scrollbar">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div
                  className="space-y-1"
                >
                  <label className="text-xs font-medium text-gray-300 block">
                    Full Name *
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="w-full bg-gray-800/70 border border-gray-600/60 text-white text-sm rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 placeholder-gray-400"
                  />
                </div>
                
                <div
                  className="space-y-1"
                >
                  <label className="text-xs font-medium text-gray-300 block">
                    Email Address *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="w-full bg-gray-800/70 border border-gray-600/60 text-white text-sm rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 placeholder-gray-400"
                  />
                </div>
                
                <div
                  className="space-y-1"
                >
                  <label className="text-xs font-medium text-gray-300 block">
                    Phone Number
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    autoComplete="tel"
                    placeholder="Enter your phone number"
                    className="w-full bg-gray-800/70 border border-gray-600/60 text-white text-sm rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 placeholder-gray-400"
                  />
                </div>
                
                <div
                  className="space-y-1"
                >
                  <label className="text-xs font-medium text-gray-300 block">
                    Experience Level *
                  </label>
                  <select
                    {...register('experienceLevel')}
                    required
                    className="w-full bg-gray-800/70 border border-gray-600/60 text-white text-sm rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
                  >
                    <option value="">Select your experience level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert/Lead</option>
                  </select>
                </div>

                {formType === 'ScheduleCall' && (
                  <>
                    <div
                      className="space-y-1"
                    >
                      <label className="text-xs font-medium text-gray-300 block">
                        Preferred Time
                      </label>
                      <input
                        {...register('preferredTime')}
                        placeholder="time"
                        className="w-full bg-gray-800/70 border border-gray-600/60 text-white text-sm rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 placeholder-gray-400"
                      />
                    </div>
                    <div
                      className="space-y-1"
                    >
                      <label className="text-xs font-medium text-gray-300 block">
                        Your Goal
                      </label>
                      <textarea
                        {...register('goal')}
                        placeholder="What do you want to achieve?"
                        rows={3}
                        className="w-full bg-gray-800/70 border border-gray-600/60 text-white text-sm rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 resize-none placeholder-gray-400"
                      />
                    </div>
                  </>
                )}

                {formType === 'JoinProjects' && (
                  <>
                    <div
                      className="space-y-1"
                    >
                      <label className="text-xs font-medium text-gray-300 block">
                        Your Interests
                      </label>
                      <textarea
                        {...register('interests')}
                        placeholder="What areas of ML interest you?"
                        rows={3}
                        className="w-full bg-gray-800/70 border border-gray-600/60 text-white text-sm rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 resize-none placeholder-gray-400"
                      />
                    </div>
                    <div
                      className="space-y-1"
                    >
                      <label className="text-xs font-medium text-gray-300 block">
                        Availability
                      </label>
                      <input
                        {...register('availability')}
                        placeholder="e.g., 10-15 hours per week"
                        className="w-full bg-gray-800/70 border border-gray-600/60 text-white text-sm rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 placeholder-gray-400"
                      />
                    </div>
                  </>
                )}
                
                <div
                  className="space-y-1"
                >
                  <label className="text-xs font-medium text-gray-300 block">
                    Additional Notes
                  </label>
                  <textarea
                    {...register('notes')}
                    placeholder="Any additional information..."
                    rows={2}
                    className="w-full bg-gray-800/70 border border-gray-600/60 text-white text-sm rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 resize-none placeholder-gray-400"
                  />
                </div>

                <div
                  className="pt-2"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/25 text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing…</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        <span>{formType === 'ScheduleCall' ? 'Book Free Call' : 'Join Projects'}</span>
                      </>
                    )}
                  </button>
                </div>

                <div 
                  className="flex items-center justify-center gap-2 mt-3 pt-2 border-t border-gray-700/50"
                >
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3 text-emerald-400" />
                      <span>100% Secure</span>
                    </div>
                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-cyan-400" />
                      <span>No Spam</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  </Dialog>
</Transition.Root>

<Transition.Root show={enterpriseFormModalOpen} as={Fragment}>
  <Dialog as="div" className="relative z-50" onClose={closeEnterpriseFormModal}>
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-lg transition-opacity" />
    </Transition.Child>

    <div className="fixed inset-0 z-10 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-h-[90vh]">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-6 scale-95"
          enterTo="opacity-100 translate-y-0 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 scale-100"
          leaveTo="opacity-0 translate-y-6 scale-95"
        >
          <Dialog.Panel 
            className="relative w-full max-w-sm mx-auto bg-gradient-to-br from-gray-900 via-gray-900 to-black rounded-2xl border border-cyan-600/40 shadow-2xl overflow-hidden overflow-y-auto"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
            
            <button
              onClick={closeEnterpriseFormModal}
              className="absolute top-2 right-2 z-10 w-9 h-9 bg-red-500/90 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-all duration-200 shadow-lg hover:shadow-red-500/25"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative text-center py-4 px-3">
              <div 
                className="flex justify-center mb-2"
              >
                <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full px-3 py-1 text-xs text-cyan-200 font-semibold border border-cyan-500/30">
                  Enterprise Solutions
                </div>
              </div>

              <h2 
                className="text-white text-xl font-bold mb-1 leading-tight"
              >
                Unlock Your Business Potential
              </h2>

              <p
                className="text-gray-400 text-sm mb-4"
              >
                Tailored AI/ML solutions for your enterprise needs.
              </p>
            </div>
            <EnterpriseLeadForm formType="EnterpriseSolutions" onSuccess={closeEnterpriseFormModal} />
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  </Dialog>
</Transition.Root>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
          <div
            className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 rounded-full border border-blue-200"
            >
              <Award className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
              <span className="text-blue-800 text-xs sm:text-sm font-medium">
                Leading ML Innovation Platform
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-2 sm:space-y-4"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white dark:text-white leading-tight"
              >
                Experience{" "}
                <motion.span 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Real-World Impact
                </motion.span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.3, ease: "easeOut" }}
                className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-500 font-semibold"
              >
                100% Practical Learning Through Live Projects.
              </motion.p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4, ease: "easeOut" }}
              className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed max-w-xl font-medium"
            >
              Transform your career or business with cutting-edge ML education
              and enterprise AI solutions. Join thousands of professionals
              mastering real-world machine learning skills.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="space-y-2 sm:space-y-3"
            >
              {[
                "Industry-vetted curriculum with live projects",
                "Expert mentorship from top ML practitioners",
                "95% job placement rate with guaranteed outcomes",
              ].map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.6 + (index * 0.1), ease: "easeOut" }}
                  className="flex items-start gap-2 sm:gap-3"
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm lg:text-base text-white/70 font-medium leading-relaxed">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </motion.div>
            
            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
              >
                <GraduationCap className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
               <Link href={'/courses'}>
               <span className="hidden sm:inline">Start Learning</span>
               <span className="sm:hidden">Start Learning</span>
               </Link>
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={openEnterpriseFormModal}
                className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Building className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Enterprise Solutions</span>
                <span className="sm:hidden">Enterprise</span>
              </Button>
            </div>
            
            <div
              className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 lg:gap-8 pt-4 sm:pt-6 lg:pt-8 border-t border-gray-200"
            >
              {[
                { number: 100, label: "Projects", color: "text-green-600" },
                { number: 95, label: "Placement Rate", color: "text-blue-600" },
                { number: 1000, label: "Students", color: "text-purple-600" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center transition-transform duration-300"
                >
                  <div className={`text-lg sm:text-xl lg:text-2xl font-bold ${stat.color}`}>
                    {stat.number}{index === 2 ? '+' : index === 1 ? '%' : '+'}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div
            className="relative h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[700px] flex items-center justify-center order-1 lg:order-2"
          >
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <div className="relative">
                <div className="relative bg-gradient-to-br from-white to-blue-50/50 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm overflow-hidden">
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-cyan-600/5"></div>
                    <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-18 sm:h-18 lg:w-24 lg:h-24 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-xl"></div>
                  </div>

                  <div className="relative z-10 p-4 sm:p-6 lg:p-8 text-center">
                    <div className="mb-4 sm:mb-6 lg:mb-8">
                      <div className="w-50 h-32 sm:h-40 lg:h-48 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full shadow-inner flex items-center justify-center relative overflow-hidden">
                        <div
                          className="absolute inset-2 sm:inset-4 border border-blue-300/30 rounded-full animate-spin"
                          style={{ animationDuration: "8s" }}
                        ></div>
                        <div
                          className="absolute inset-4 sm:inset-8 border border-purple-300/30 rounded-full animate-spin"
                          style={{
                            animationDuration: "6s",
                            animationDirection: "reverse",
                          }}
                        ></div>
                        <div
                          className="absolute inset-6 sm:inset-12 border border-cyan-300/30 rounded-full animate-spin"
                          style={{ animationDuration: "4s" }}
                        ></div>

                        <div className="relative z-10 text-center align-middle scale-75 sm:scale-90 lg:scale-100">
                          <Scene />
                        </div>

                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-blue-400/60 rounded-full"
                            style={{
                              left: `${20 + Math.sin((i * 60 * Math.PI) / 180) * 30}%`,
                              top: `${50 + Math.cos((i * 60 * Math.PI) / 180) * 30}%`,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div
                      className="space-y-3 sm:space-y-4"
                    >
                      <Button
                        size="lg"
                        onClick={() => openFormModal('ScheduleCall')}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group border-0 text-sm sm:text-base"
                      >
                        <Calendar className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Schedule a Call</span>
                        <span className="sm:hidden">Book Call</span>
                        <Sparkles className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
                      </Button>

                      <Button
                        size="lg"
                        onClick={() => openFormModal('JoinProjects')}
                        variant="outline"
                        className="w-full border-2 border-blue-200 bg-white/80 backdrop-blur-sm text-blue-700 hover:bg-blue-50 hover:border-blue-300 font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 group shadow-md hover:shadow-lg text-sm sm:text-base"
                      >
                        <Play className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Join Hands-on Projects</span>
                        <span className="sm:hidden">Start Projects</span>
                        <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>

                    <div
                      className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200/50"
                    >
                      <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                        <div>
                          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
                            24/7
                          </div>
                          <div className="text-xs text-gray-600 font-medium">
                            Support
                          </div>
                        </div>
                        <div>
                          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">
                            100%
                          </div>
                          <div className="text-xs text-gray-600 font-medium">
                            Practical
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-3 border border-white/50 z-20"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 font-medium">
                      Placement Rate
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-green-600">95%</div>
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-3 border border-white/50 z-20"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 font-medium">
                      Active Learners
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-blue-600">15K+</div>
                  </div>
                </div>
              </div>

              <div
                className="absolute top-1/2 -left-4 sm:-left-8 transform -translate-y-1/2 bg-white/95 backdrop-blur-md rounded-lg sm:rounded-xl shadow-lg p-1.5 sm:p-2 border border-white/50 z-20 hidden sm:block"
              >
                <div className="text-center">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-1">
                    <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                  </div>
                  <div className="text-xs text-gray-600 font-medium">Live</div>
                  <div className="text-xs font-bold text-purple-600">Projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50"
      >
        <button
          onClick={openWhatsApp}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-green-600 transition-colors hover:scale-110 duration-300"
          aria-label="Contact via WhatsApp"
        >
          <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.108" />
          </svg>
        </button>
      </div>
      
      <AutoPopupCTA showOnMLHeroOnly={true} />
    </section>
  );
}