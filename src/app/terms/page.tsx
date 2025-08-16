"use client";

import { motion } from "framer-motion";
import { FileText, Scale, AlertTriangle, Users, Shield, BookOpen, CheckCircle, ArrowRight } from "lucide-react";

export default function TermsOfServicePage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: Scale,
      content: [
        {
          subtitle: "Agreement",
          text: "By accessing and using AlgoForgeStudios' website and services, you accept and agree to be bound by the terms and provision of this agreement."
        },
        {
          subtitle: "Modifications",
          text: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website."
        },
        {
          subtitle: "Eligibility",
          text: "You must be at least 18 years old or have parental consent to use our services. By using our services, you represent that you meet these requirements."
        }
      ]
    },
    {
      title: "Services Description",
      icon: BookOpen,
      content: [
        {
          subtitle: "AI/ML Services",
          text: "We provide artificial intelligence and machine learning consulting, development, and training services to businesses and individuals."
        },
        {
          subtitle: "Educational Content",
          text: "Our courses and educational materials are designed to teach AI/ML concepts and practical applications."
        },
        {
          subtitle: "Consulting Services",
          text: "We offer personalized consulting services to help organizations implement AI/ML solutions tailored to their specific needs."
        }
      ]
    },
    {
      title: "User Responsibilities",
      icon: Users,
      content: [
        {
          subtitle: "Account Security",
          text: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
        },
        {
          subtitle: "Accurate Information",
          text: "You agree to provide accurate, current, and complete information when using our services and to update such information as necessary."
        },
        {
          subtitle: "Prohibited Uses",
          text: "You may not use our services for any illegal purpose, to violate any laws, or to infringe upon the rights of others."
        }
      ]
    },
    {
      title: "Intellectual Property",
      icon: Shield,
      content: [
        {
          subtitle: "Our Content",
          text: "All content, materials, and intellectual property on our website and in our services are owned by AlgoForgeStudios or our licensors and are protected by copyright and other laws."
        },
        {
          subtitle: "User Content",
          text: "You retain ownership of any content you submit to us, but grant us a license to use, modify, and distribute such content in connection with our services."
        },
        {
          subtitle: "Respect for IP",
          text: "You agree not to copy, modify, distribute, or create derivative works based on our proprietary content without explicit written permission."
        }
      ]
    },
    {
      title: "Payment Terms",
      icon: FileText,
      content: [
        {
          subtitle: "Fees and Billing",
          text: "Fees for our services are as described on our website or in separate agreements. Payment is due according to the specified billing terms."
        },
        {
          subtitle: "Refund Policy",
          text: "Refunds are handled on a case-by-case basis and may be subject to specific conditions outlined in your service agreement."
        },
        {
          subtitle: "Late Payments",
          text: "Late payments may result in suspension of services and may incur additional fees as outlined in your service agreement."
        }
      ]
    },
    {
      title: "Disclaimers and Limitations",
      icon: AlertTriangle,
      content: [
        {
          subtitle: "Service Availability",
          text: "We strive to maintain service availability but do not guarantee uninterrupted access. Services may be temporarily unavailable for maintenance or other reasons."
        },
        {
          subtitle: "Educational Nature",
          text: "Our courses and materials are for educational purposes. We do not guarantee specific outcomes or results from using our educational content."
        },
        {
          subtitle: "Limitation of Liability",
          text: "Our liability is limited to the maximum extent permitted by law. We are not liable for indirect, incidental, or consequential damages."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-pink-500/5 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Terms of Service
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            These terms govern your use of AlgoForgeStudios' services. Please read them carefully as they contain important information about your rights and obligations.
          </p>
          <div className="mt-6 text-sm text-gray-400">
            <p>Last updated: August 2025</p>
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl border border-gray-700/40 p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              </div>
              
              <div className="space-y-6">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="space-y-2">
                    <h3 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      {item.subtitle}
                    </h3>
                    <p className="text-gray-300 leading-relaxed pl-6">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 bg-gradient-to-r from-orange-900/20 to-red-900/20 backdrop-blur-xl rounded-2xl border border-orange-500/20 p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-400" />
            <h2 className="text-xl font-bold text-white">Important Notice</h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            These terms constitute a legally binding agreement between you and AlgoForgeStudios. 
            If you do not agree to these terms, please do not use our services. For questions 
            about these terms, please contact our legal team.
          </p>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Questions About Terms?</h2>
          <p className="text-gray-300 mb-6">
            If you have any questions about these Terms of Service or need clarification on any provision, please contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:enquiry@algoforgestudios.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105"
            >
              Contact Legal Team
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
