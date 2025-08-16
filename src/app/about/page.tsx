"use client";

import { StatsSection } from "@/components/stats-section";
import TeamSection from "@/components/team";
import { TestimonialsSection } from "@/components/testimonials-section";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Target, 
  Eye, 
  Brain,
  Code,
  TrendingUp,
  Zap,
  ArrowRight
} from "lucide-react";

export default function AboutPage() {
  const services = [
    {
      icon: Brain,
      title: "AI Solutions",
      description: "Cutting-edge AI implementations"
    },
    {
      icon: Code,
      title: "Custom Development", 
      description: "Tailored software solutions"
    },
    {
      icon: TrendingUp,
      title: "Data Analytics",
      description: "Transform data into insights"
    },
    {
      icon: Zap,
      title: "Process Automation",
      description: "Streamline operations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-24 h-24 sm:w-32 sm:h-32 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-1/4 w-28 h-28 sm:w-36 sm:h-36 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative mt-9 sm:mt-9 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-cyan-400 font-medium text-xs sm:text-sm">About Us</span>
            </div>
            
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 leading-tight">
              <span className="block text-white mb-1">Fueling</span>
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Digital Brilliance
              </span>
            </h1>
            
            <p className="text-sm text-gray-300 max-w-3xl mx-auto">
              Business agency for brand development
            </p>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="relative py-0 sm:py-0 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-xl rounded-xl border border-gray-700/40 p-4 sm:p-6"
          >
            <div className="text-center mb-6 sm:mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-block mb-4"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                  Welcome to
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ALGOFORGESTUDIOS
                </div>
              </motion.div>
            </div>
            
            <p className="text-sm text-gray-300 leading-relaxed text-center max-w-4xl mx-auto">
              We deliver cutting-edge digital solutions that transform ideas into reality. Our team drives innovation and success in the digital landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-12 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 backdrop-blur-xl rounded-xl border border-cyan-500/20 p-4 sm:p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Target className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-sm sm:text-base font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Empower businesses with innovative digital solutions that drive growth and success.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-xl rounded-xl border border-purple-500/20 p-4 sm:p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Eye className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-sm sm:text-base font-bold text-white">Our Vision</h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Pioneer transformative solutions, empowering businesses to thrive in the digital age.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection/>

      {/* Services Overview */}
      <section className="relative py-12 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
                What We Do
              </span>
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Transforming businesses through innovative technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                className="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-xl rounded-xl border border-gray-700/40 p-4 text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-7 h-7 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-3.5 h-3.5 text-white" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-300 text-xs">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection/>

      <TeamSection/>

      {/* CTA Section */}
      <section className="relative py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 backdrop-blur-xl rounded-xl border border-cyan-500/20 p-4 sm:p-6 text-center"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
              Let's Work Together
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-6 max-w-2xl mx-auto">
              Ready to transform your business with AI and digital solutions? Let's discuss your goals.
            </p>
            
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/25 text-xs sm:text-sm"
            >
              Get Started Today
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
