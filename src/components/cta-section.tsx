"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { ArrowRight, GraduationCap, Building, Sparkles, Zap, Users, Trophy, X, Brain } from "lucide-react"
import { NewCTAForm } from "./new-cta-form"
import { useState } from "react"

export function CTASection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })
  
  const [showForm, setShowForm] = useState(false)

  return (
    <section ref={ref} className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-black via-gray-900/95 to-black relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [-50, 50, -50], 
            y: [-50, 50, -50],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: "10%", top: "20%" }}
        />
        <motion.div
          className="absolute w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [50, -50, 50], 
            y: [50, -50, 50],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ right: "10%", bottom: "20%" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        {/* Compact Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          {/* Branded Badge */}
          <motion.div 
            className="flex justify-center mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-2.5 border border-cyan-500/30 shadow-lg">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-cyan-300 font-semibold text-xs sm:text-sm">Transform Your Journey</span>
              </div>
            </div>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              Ready to Transform
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Your Future?
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
            Join thousands of professionals mastering ML or partner with us to scale AI across your organization
          </p>
        </motion.div>

        {/* Compact Dual CTA Cards */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12">
          {/* Academy CTA - Minimized */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group relative p-4 sm:p-6 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/50 rounded-xl hover:border-transparent transition-all duration-300 shadow-xl"
          >
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            <div className="relative z-10">
              {/* Compact Header */}
              <div className="flex items-center mb-4">
                <motion.div 
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0"
                  whileHover={{ rotate: 180, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                </motion.div>
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">ML Academy</h3>
                  <p className="text-purple-300 text-xs sm:text-sm opacity-90">Transform Your Career</p>
                </div>
              </div>

              {/* Compact Benefits */}
              <div className="space-y-2 mb-4 sm:mb-6">
                <div className="flex items-center text-gray-300">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Industry-leading ML curriculum</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Expert mentorship & community</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">95% job placement guarantee</span>
                </div>
              </div>

              {/* Compact CTA Button */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button 
                  onClick={() => setShowForm(true)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-semibold py-2.5 sm:py-3 rounded-lg text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-purple-500/25 group/btn relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                  <div className="relative flex items-center justify-center gap-1.5">
                    <span>Start Learning Journey</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                  </div>
                </Button>
              </motion.div>

              {/* Compact Additional info */}
              <div className="mt-2 sm:mt-3 text-center">
                <span className="text-xs text-gray-400">Free trial • No credit card required</span>
              </div>
            </div>
          </motion.div>

          {/* Agency CTA - Minimized */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group relative p-4 sm:p-6 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/50 rounded-xl hover:border-transparent transition-all duration-300 shadow-xl"
          >
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            <div className="relative z-10">
              {/* Compact Header */}
              <div className="flex items-center mb-4">
                <motion.div 
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0"
                  whileHover={{ rotate: 180, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Building className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                </motion.div>
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">AI Agency</h3>
                  <p className="text-cyan-300 text-xs sm:text-sm opacity-90">Scale Your Business</p>
                </div>
              </div>

              {/* Compact Benefits */}
              <div className="space-y-2 mb-4 sm:mb-6">
                <div className="flex items-center text-gray-300">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Custom ML solutions & deployment</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Dedicated AI engineering team</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Proven ROI & scalability</span>
                </div>
              </div>

              {/* Compact CTA Button */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button 
                  onClick={() => setShowForm(true)}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold py-2.5 sm:py-3 rounded-lg text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 group/btn relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                  <div className="relative flex items-center justify-center gap-1.5">
                    <span>Get Enterprise Demo</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                  </div>
                </Button>
              </motion.div>

              {/* Compact Additional info */}
              <div className="mt-2 sm:mt-3 text-center">
                <span className="text-xs text-gray-400">Custom pricing • Free consultation</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Compact Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-xl border border-gray-700/50 p-4 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-50" />
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-xl" />
            
            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3">
                Still have questions?
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-4 sm:mb-6 max-w-xl mx-auto leading-relaxed">
                Our ML experts are here to help you choose the right path forward
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mb-4 sm:mb-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="bg-gradient-to-r from-black/60 to-gray-900/60 border-2 border-cyan-500/50 text-cyan-300 hover:border-transparent hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 hover:text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-500 backdrop-blur-xl shadow-lg hover:shadow-cyan-500/30"
                  >
                    Schedule a Call
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="bg-gradient-to-r from-black/60 to-gray-900/60 border-2 border-purple-500/50 text-purple-300 hover:border-transparent hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 hover:text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-500 backdrop-blur-xl shadow-lg hover:shadow-purple-500/30"
                  >
                    View Pricing
                  </Button>
                </motion.div>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-1.5" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-1.5" />
                  <span>Money-back Guarantee</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-1.5" />
                  <span>Industry Partnerships</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Enhanced Modal for CTA Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4"
          onClick={() => setShowForm(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="relative max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 z-10 bg-white hover:bg-gray-100 rounded-full p-2 text-gray-600 hover:text-black transition-colors shadow-lg"
              onClick={() => setShowForm(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
            <NewCTAForm />
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
