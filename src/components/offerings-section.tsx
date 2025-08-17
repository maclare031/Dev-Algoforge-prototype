"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useRouter } from "next/navigation"
import { useState, Fragment } from "react"
import { Dialog, Transition } from '@headlessui/react'
import { Button } from "@/components/ui/button"
import { EnterpriseLeadForm } from "./EnterpriseLeadForm"
import { 
  GraduationCap, 
  Building, 
  ArrowRight, 
  Users, 
  Award, 
  Briefcase, 
  CheckCircle,
  Clock,
  Target,
  Sparkles,
  Zap,
  Brain,
  X
} from "lucide-react"

export function OfferingsSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const router = useRouter() // Add router hook

  // Enterprise demo modal state
  const [enterpriseModalOpen, setEnterpriseModalOpen] = useState(false);

  const handleEnterpriseModalClose = () => {
    setEnterpriseModalOpen(false);
  };

  // Add click handler function
  const handleCTAClick = (offeringId: string) => {
    if (offeringId === "academy") {
      router.push("/courses")
    } else if (offeringId === "agency") {
      setEnterpriseModalOpen(true);
    }
  }

  const offerings = [
    {
      id: "academy",
      title: "ML Academy",
      subtitle: "Transform Your Career",
      description: "Master machine learning through hands-on projects and expert mentorship. Get job-ready with our industry-proven curriculum.",
      icon: GraduationCap,
      features: [
        "Live project-based learning",
        "1-on-1 expert mentorship", 
        "Job placement guarantee",
        "Industry-recognized certification"
      ],
      stats: [
        { icon: Users, value: "15,000+", label: "Students Placed" },
        { icon: Award, value: "95%", label: "Job Success Rate" },
        { icon: Clock, value: "6 months", label: "Avg. Time to Job" }
      ],
      cta: "Start Learning Journey",
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-cyan-500/10 to-blue-500/10",
      iconColor: "text-cyan-500",
      borderColor: "border-cyan-500/20"
    },
    {
      id: "agency", 
      title: "AI Agency",
      subtitle: "Scale Your Business",
      description: "Custom AI solutions that deliver measurable ROI. From strategy to deployment, we're your complete AI transformation partner.",
      icon: Building,
      features: [
        "Custom ML model development",
        "End-to-end AI implementation",
        "Dedicated engineering team",
        "24/7 production support"
      ],
      stats: [
        { icon: Briefcase, value: "500+", label: "Companies Served" },
        { icon: Target, value: "10x", label: "Avg. ROI Increase" },
        { icon: Clock, value: "30 days", label: "Avg. Deployment" }
      ],
      cta: "Get Enterprise Demo",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      iconColor: "text-purple-500",
      borderColor: "border-purple-500/20"
    }
  ]

  return (
    <section
      ref={ref}
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-black via-gray-900/95 to-black relative overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [-50, 50, -50],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: "10%", top: "20%" }}
        />
        <motion.div
          className="absolute w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [50, -50, 50],
            y: [50, -50, 50],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ right: "10%", bottom: "20%" }}
        />
      </div>

      {/* Enterprise Demo Modal */}
      <Transition.Root show={enterpriseModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleEnterpriseModalClose}>
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
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
                  
                  {/* Close Button - Enhanced */}
                  <button
                    onClick={handleEnterpriseModalClose}
                    className="absolute top-2 right-2 z-10 w-9 h-9 bg-red-500/90 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-all duration-200 shadow-lg hover:shadow-red-500/25"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  {/* Modal Header */}
                  <div className="relative text-center py-4 px-3">
                    <div className="flex justify-center mb-2">
                      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full px-3 py-1 text-xs text-purple-200 font-semibold border border-purple-500/30">
                        🚀 Enterprise Demo
                      </div>
                    </div>

                    <h2 className="text-white text-xl font-bold mb-1 leading-tight">
                      Get Your Custom AI Solution
                    </h2>

                    <p className="text-gray-400 text-sm mb-4">
                      Discover how our AI solutions can transform your business.
                    </p>
                  </div>
                  
                  {/* Enterprise Lead Form */}
                  <EnterpriseLeadForm formType="EnterpriseDemo" />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
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
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-cyan-300 font-semibold text-xs sm:text-sm">
                  Our Solutions
                </span>
              </div>
            </div>
          </motion.div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
            Choose Your Path Forward
            </span>
          </h2>
          <p className="text-sm text-white leading-relaxed mb-8 max-w-lg mx-auto">
          Whether you're looking to advance your career or transform your business, we have the expertise and solutions to help you succeed.
          </p>
        </motion.div>

        {/* Enhanced Offerings Grid */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 place-items-center mb-8 sm:mb-10">
          {offerings.map((offering, index) => (
            <motion.div
              key={offering.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-700/50 rounded-xl overflow-hidden hover:border-transparent transition-all duration-300 w-full max-w-md shadow-xl"
            >
              {/* Hover Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${offering.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
              />

              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

              {/* Compact Header */}
              <div
                className={`relative bg-gradient-to-br ${offering.bgGradient} border-b ${offering.borderColor} p-3 sm:p-4`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <motion.div
                    className={`w-10 h-10 ${offering.iconColor} bg-gradient-to-r from-white/90 to-white/80 rounded-lg shadow-md flex items-center justify-center flex-shrink-0`}
                    whileHover={{ rotate: 180, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <offering.icon className="w-5 h-5" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                      {offering.title}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm font-medium ${offering.iconColor} opacity-90`}
                    >
                      {offering.subtitle}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {offering.description}
                </p>
              </div>

              {/* Compact Content */}
              <div className="relative p-3 sm:p-4">
                {/* Features - Minimized */}
                <div className="mb-4">
                  <h4 className="font-semibold text-white mb-2 text-xs sm:text-sm">
                    Key Features:
                  </h4>
                  <div className="space-y-1.5">
                    {offering.features
                      .slice(0, 3)
                      .map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          className="flex items-start gap-2"
                          whileHover={{ x: 2 }}
                          transition={{ duration: 0.15 }}
                        >
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-xs leading-relaxed">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    {offering.features.length > 3 && (
                      <p className="text-xs text-gray-400 ml-5">
                        +{offering.features.length - 3} more features
                      </p>
                    )}
                  </div>
                </div>

                {/* Compact Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 p-2.5 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/30">
                  {offering.stats.map((stat, statIndex) => (
                    <motion.div
                      key={statIndex}
                      className="text-center"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.15 }}
                    >
                      <stat.icon
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${offering.iconColor} mx-auto mb-1`}
                      />
                      <div
                        className={`text-xs sm:text-sm font-bold ${offering.iconColor}`}
                      >
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-400 leading-tight">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Compact CTA Button with routing */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    onClick={() => handleCTAClick(offering.id)} // Add click handler
                    className={`w-full bg-gradient-to-r ${offering.gradient} hover:opacity-90 text-white font-semibold py-2.5 text-xs sm:text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200 group/btn relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                    <div className="relative flex items-center justify-center gap-1.5">
                      <span>{offering.cta}</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                    </div>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
      
      </div>
    </section>
  );
}
