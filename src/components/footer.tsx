"use client"

import { Github, Twitter, Linkedin, Mail, MapPin, Phone, Sparkles, ArrowRight, ExternalLink, X, Instagram } from "lucide-react"
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion"
import { useState, Fragment } from "react"
import { Dialog, Transition } from '@headlessui/react'
import { EnterpriseLeadForm } from "./EnterpriseLeadForm"

export function Footer() {
  const router = useRouter();
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleServiceClick = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsServiceModalOpen(true);
  };

  const closeServiceModal = () => {
    setIsServiceModalOpen(false);
    setSelectedService("");
  };

  return (
    <footer className="relative bg-gradient-to-b from-black/60 via-gray-900/90 to-black/95 border-t border-cyan-500/30 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-40 sm:w-80 h-40 sm:h-80 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-24 sm:w-48 h-24 sm:h-48 bg-pink-500/5 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-12 sm:py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">
          
          {/* Company Info */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-1 lg:col-span-2 space-y-6"
          >
            {/* Logo & Brand */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AlgoForgeStudios
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-md">
              Forging the future with AI. We create intelligent solutions that transform businesses and drive innovation across industries through cutting-edge machine learning and data science.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Uttar Pradesh, India</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <a href="tel:+918292222569" className="hover:text-cyan-400 transition-colors">
                +91 93055 26047
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-pink-400 flex-shrink-0" />
                <a href="mailto:enquiry@algoforgestudios.com" className="hover:text-cyan-400 transition-colors">
                  enquiry@algoforgestudios.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              {[
                { icon: Github, href: "#", color: "hover:text-purple-400" },
                { icon: X, href: "https://x.com/AlgoforgeS", color: "hover:text-cyan-400" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/algoforge-studios/", color: "hover:text-blue-400" },
                { icon: Instagram, href: "https://www.instagram.com/algoforgestudio", color: "hover:text-pink-400" },
                { icon: Mail, href: "mailto:enquiry@algoforgestudios.com", color: "hover:text-pink-400" }
              ].map(({ icon: Icon, href, color }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 bg-gray-800/50 border border-gray-700/50 rounded-full flex items-center justify-center text-gray-400 ${color} transition-all duration-300 hover:border-current backdrop-blur-sm`}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services and Company - Side by Side on Mobile */}
          <div className="col-span-1 lg:col-span-2 grid grid-cols-2 gap-6 lg:gap-8">
            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-3 sm:mb-4 lg:mb-6 relative">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Services
                </span>
                <div className="absolute -bottom-2 left-0 w-6 sm:w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"></div>
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "AI Development",
                  "Machine Learning",
                  "Data Analytics", 
                  "ML Training Programs",
                  "Enterprise AI Solutions"
                ].map((service, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => handleServiceClick(service)}
                      className="group flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-400 hover:text-cyan-400 transition-all duration-300 w-full text-left"
                    >
                      <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300 leading-tight">
                        {service}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-3 sm:mb-4 lg:mb-6 relative">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Company
                </span>
                <div className="absolute -bottom-2 left-0 w-6 sm:w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  { name: "About Us", path: "/about" },
                  { name: "Careers", path: "/careers" },
                  { name: "Contact", path: "/contact" },
                  { name: "Blog", path: "/blog" },
                  // { name: "Success Stories", path: "/testimonials" }
                ].map(({ name, path }, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => handleNavigation(path)}
                      className="group flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-400 hover:text-purple-400 transition-all duration-300 w-full text-left"
                    >
                      <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300 leading-tight">
                        {name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Newsletter Signup */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-gray-700/40 p-6 sm:p-8 mb-12 lg:mb-16"
        >
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg sm:text-xl font-bold text-white">Stay Updated</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-400 mb-6">
              Get the latest AI insights, ML tutorials, and industry trends delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-sm"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm">
                Subscribe
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div> */}

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-700/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-400">
            <p>© 2025 AlgoForgeStudios. All rights reserved.</p>
            <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full" />
            <p className="hidden sm:block">Made with ❤️ in India</p>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <a href="/privacy" className="text-gray-400 hover:text-cyan-400 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-cyan-400 transition-colors">
              Terms of Service
            </a>
            <a href="/cookies" className="text-gray-400 hover:text-cyan-400 transition-colors">
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>

      {/* Service Modal */}
      <Transition appear show={isServiceModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeServiceModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-900 border border-gray-700/50 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-bold text-white bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                    >
                      {selectedService} Inquiry
                    </Dialog.Title>
                    <button
                      onClick={closeServiceModal}
                      className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800/50"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-4">
                    Tell us about your {selectedService.toLowerCase()} needs and we'll get back to you with a customized solution.
                  </p>
                  
                  <EnterpriseLeadForm 
                    formType="EnterpriseSolutions" 
                    onSuccess={closeServiceModal}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </footer>
  )
}
