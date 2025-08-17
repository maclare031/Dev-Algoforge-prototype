"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, Users, Clock } from "lucide-react"

export function TestimonialsSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const testimonials = [
    {
      name: "Kirra Lawson",
      role: "CEO",
      company: "Altruim",
      image: "https://img.freepik.com/free-vector/people-care-logo-design-template_474888-1892.jpg?semt=ais_hybrid&w=740",
      rating: 5,
      text: "Impressed with the machine learning solutions from Algoforgestudios.They optimized our systems, providing insights that elevated our operations. Great team to work with!",
      category: "Agency",
    },
    {
      name: "Shubham Rawal",
      role: "Founder",
      company: "MegMagnet",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.5,
      text: "The chatbots developed by algoforgestudios have revolutionized our customer interactions. Seamless, intelligent, and user-friendly exactly what our business needed.",
      category: "Agency",
      metric: "400% efficiency boost",
    },
    {
      name: "Daniel Ferl",
      role: "President",
      company: "FinNova",
      image: "https://vesperaaisolutions.com/wp-content/uploads/2024/07/Untitled-design-16.png",
      rating: 5,
      text: "Algoforgestudios delivered exceptional Al solutions, enhancing our processes and decision-making. Their expertise in artificial intelligence is truly commendable.",
      category: "Agency",
      metric: "500% efficiency boost",
    },
    {
      name: "Michael Thompson",
      role: "Product Manager",
      company: "AI Innovations",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Our partnership with AlgoForgeStudios revolutionized our entire product suite. Their custom ML algorithms improved our recommendation system's accuracy by 45%. Outstanding results.",
      category: "Agency",
      metric: "45% accuracy increase",
    },
    {
      name: "Lisa Park",
      role: "AI Researcher",
      company: "Research Lab",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "From zero to ML expert in just 6 months. The structured learning path, practical assignments, and supportive community made complex concepts accessible. Highly recommended!",
      category: "Academy",
      salary: "$60K → $115K",
      duration: "6 months"
    }
  ]

  useEffect(() => {
    if (!isAutoPlay) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 4500)
    
    return () => clearInterval(interval)
  }, [isAutoPlay, testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlay(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlay(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlay(false)
  }

  // Main card stars (same size as before)
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`}
      />
    ))
  }

  // Mini card stars (smaller but still showing all 5 stars)
  const renderMiniStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-2.5 h-2.5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`}
      />
    ))
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section ref={ref} className="relative py-2 sm:py-2 lg:py-4 bg-gradient-to-b from-black to-black overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-24 h-24 sm:w-32 sm:h-32 bg-blue-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-28 h-28 sm:w-36 sm:h-36 bg-purple-500/3 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-20 h-20 sm:w-24 sm:h-24 bg-cyan-500/3 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gray-800/40 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-700/30 mb-4">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold text-xs sm:text-sm text-cyan-300">Success Stories</span>
          </div>
          
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
              What Our Community Says
            </span>
          </h2>
          <p className="text-sm text-white leading-relaxed mb-8 max-w-lg mx-auto">
            Real transformations from students who advanced their careers and companies that scaled with AI
          </p>
        </motion.div>

        {/* Main Testimonial Card */}
        <div className="relative mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700/40 p-4 sm:p-6 shadow-xl"
            >
              {/* Quote icon */}
              <div className="absolute -top-2 -left-2 w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Quote className="w-3.5 h-3.5 text-white" />
              </div>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                  currentTestimonial.category === 'Academy' 
                    ? 'bg-purple-500/15 text-purple-300 border-purple-500/25' 
                    : 'bg-blue-500/15 text-blue-300 border-blue-500/25'
                }`}>
                  {currentTestimonial.category}
                </span>
                
                {currentTestimonial.salary && (
                  <div className="flex items-center gap-1.5 bg-emerald-500/15 rounded-full px-2.5 py-1 border border-emerald-500/25">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span className="text-xs font-medium text-emerald-300">{currentTestimonial.salary}</span>
                  </div>
                )}
                
                {currentTestimonial.metric && (
                  <div className="flex items-center gap-1.5 bg-amber-500/15 rounded-full px-2.5 py-1 border border-amber-500/25">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span className="text-xs font-medium text-amber-300">{currentTestimonial.metric}</span>
                  </div>
                )}
              </div>

              {/* Testimonial text */}
              <blockquote className="text-sm sm:text-base text-gray-200 text-center mb-4 leading-relaxed">
                "{currentTestimonial.text}"
              </blockquote>

              {/* Rating */}
              <div className="flex justify-center mb-4">
                <div className="flex items-center gap-1 bg-gray-700/40 rounded-full px-3 py-1.5">
                  {renderStars(currentTestimonial.rating)}
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center justify-center gap-3">
                <div className="relative">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-10 h-10 rounded-full border-2 border-gray-600"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-gray-800 rounded-full" />
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-semibold text-white text-sm">{currentTestimonial.name}</div>
                  <div className="text-blue-400 text-xs">{currentTestimonial.role}</div>
                  <div className="text-gray-400 text-xs">{currentTestimonial.company}</div>
                  {currentTestimonial.duration && currentTestimonial.category === 'Academy' && (
                    <div className="text-purple-400 text-xs mt-0.5 inline-flex items-center gap-1 bg-purple-500/10 px-1.5 py-0.5 rounded-full">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{currentTestimonial.duration} program</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation - Hidden on mobile */}
          <div className="hidden sm:flex items-center justify-between absolute top-1/2 -translate-y-1/2 w-full px-1">
            <button
              onClick={prevTestimonial}
              className="w-8 h-8 bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-500/40 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-8 h-8 bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-500/40 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex sm:hidden justify-center gap-4 mb-6">
          <button
            onClick={prevTestimonial}
            className="w-8 h-8 bg-gray-800/60 border border-gray-600/50 rounded-full flex items-center justify-center text-gray-400"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextTestimonial}
            className="w-8 h-8 bg-gray-800/60 border border-gray-600/50 rounded-full flex items-center justify-center text-gray-400"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mb-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-blue-500 scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Mini Cards - Desktop/Tablet Only */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:grid md:grid-cols-3 gap-3"
        >
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={`mini-${index}`}
              whileHover={{ scale: 1.02 }}
              className="p-3 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-700/30 hover:border-blue-500/30 transition-all cursor-pointer"
              onClick={() => goToTestimonial(index)}
            >
              <div className="flex items-start gap-2 mb-2">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-6 h-6 rounded-full border border-gray-600"
                />
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-white text-xs truncate">{testimonial.name}</div>
                  <div className="text-blue-400 text-xs truncate">{testimonial.role}</div>
                </div>
              </div>
              
              <p className="text-gray-300 text-xs leading-relaxed line-clamp-2 mb-2">
                "{testimonial.text.substring(0, 75)}..."
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {renderMiniStars(testimonial.rating)}
                </div>
                <span className={`px-1.5 py-0.5 rounded text-xs ${
                  testimonial.category === 'Academy' 
                    ? 'bg-purple-500/15 text-purple-300' 
                    : 'bg-blue-500/15 text-blue-300'
                }`}>
                  {testimonial.category}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
