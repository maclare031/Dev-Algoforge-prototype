"use client";

import { motion } from "framer-motion";
import { Cookie, Settings, BarChart3, Shield, Globe, Trash2, CheckCircle, ArrowRight } from "lucide-react";

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      title: "Essential Cookies",
      icon: Shield,
      description: "These cookies are necessary for the website to function properly and cannot be disabled.",
      examples: [
        "Session management",
        "Security authentication",
        "Basic site functionality",
        "Load balancing"
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Analytics Cookies",
      icon: BarChart3,
      description: "These cookies help us understand how visitors interact with our website.",
      examples: [
        "Google Analytics",
        "Page view tracking",
        "User behavior analysis",
        "Performance monitoring"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Functional Cookies",
      icon: Settings,
      description: "These cookies enable enhanced functionality and personalization.",
      examples: [
        "Language preferences",
        "Theme settings",
        "Form data storage",
        "User preferences"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Marketing Cookies",
      icon: Globe,
      description: "These cookies are used to deliver relevant advertisements and track campaign effectiveness.",
      examples: [
        "Social media integration",
        "Advertisement targeting",
        "Campaign tracking",
        "Cross-site tracking"
      ],
      color: "from-orange-500 to-red-500"
    }
  ];

  const sections = [
    {
      title: "What Are Cookies?",
      content: "Cookies are small text files that are stored on your device when you visit a website. They help websites remember your preferences, login status, and other information to improve your browsing experience."
    },
    {
      title: "Why We Use Cookies",
      content: "We use cookies to provide you with a better experience on our website, analyze how our site is used, remember your preferences, and deliver relevant content and advertisements."
    },
    {
      title: "Cookie Duration",
      content: "Some cookies are session cookies that expire when you close your browser, while others are persistent cookies that remain on your device for a specified period or until you delete them."
    },
    {
      title: "Third-Party Cookies",
      content: "Our website may contain third-party services like Google Analytics, social media widgets, and advertising networks that may set their own cookies. These are governed by their respective privacy policies."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
              <Cookie className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 bg-clip-text text-transparent">
              Cookie Policy
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            This Cookie Policy explains how AlgoForgeStudios uses cookies and similar technologies to provide and improve our services.
          </p>
          <div className="mt-6 text-sm text-gray-400">
            <p>Last updated: August 2025</p>
          </div>
        </motion.div>

        {/* Cookie Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {cookieTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl border border-gray-700/40 p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-10 h-10 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center`}>
                  <type.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{type.title}</h3>
              </div>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                {type.description}
              </p>
              
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Examples:</h4>
                <ul className="space-y-1">
                  {type.examples.map((example, exampleIndex) => (
                    <li key={exampleIndex} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Information Sections */}
        <div className="space-y-8 mb-16">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl border border-gray-700/40 p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Cookie Management */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-8 mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Managing Your Cookie Preferences</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">Browser Settings</h3>
              <p className="text-gray-300 leading-relaxed">
                You can control and delete cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="space-y-2">
                {[
                  "View and delete existing cookies",
                  "Block cookies from specific sites",
                  "Block third-party cookies",
                  "Clear all cookies when closing browser"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-400">Impact of Disabling Cookies</h3>
              <p className="text-gray-300 leading-relaxed">
                Disabling cookies may affect your experience:
              </p>
              <ul className="space-y-2">
                {[
                  "Loss of personalized settings",
                  "Repeated login requirements",
                  "Limited website functionality",
                  "Less relevant content"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-300">
                    <Trash2 className="w-4 h-4 text-red-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="bg-gradient-to-r from-orange-900/20 to-yellow-900/20 backdrop-blur-xl rounded-2xl border border-orange-500/20 p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Questions About Cookies?</h2>
          <p className="text-gray-300 mb-6">
            If you have any questions about our use of cookies or this Cookie Policy, please don't hesitate to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:enquiry@algoforgestudios.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </a>
            <span className="text-gray-400 text-sm">
              enquiry@algoforgestudios.com
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
