"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Lock, Database, Users, FileText, CheckCircle, ArrowRight } from "lucide-react";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: [
        {
          subtitle: "Personal Information",
          text: "We collect information you provide directly, such as your name, email address, phone number, and any other information you choose to provide when contacting us or using our services."
        },
        {
          subtitle: "Usage Information",
          text: "We automatically collect information about how you interact with our website, including pages visited, time spent on pages, and referral sources."
        },
        {
          subtitle: "Device Information",
          text: "We collect information about the device and browser you use to access our services, including IP address, browser type, and operating system."
        }
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        {
          subtitle: "Service Provision",
          text: "To provide, maintain, and improve our AI/ML services, courses, and consulting offerings."
        },
        {
          subtitle: "Communication",
          text: "To respond to your inquiries, send updates about our services, and provide customer support."
        },
        {
          subtitle: "Analytics",
          text: "To understand how our services are used and to improve user experience through analytics and optimization."
        }
      ]
    },
    {
      title: "Information Sharing",
      icon: Users,
      content: [
        {
          subtitle: "Third-Party Services",
          text: "We may share information with trusted third-party service providers who assist in operating our website and providing services, subject to confidentiality agreements."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose information when required by law, to protect our rights, or to ensure the safety of our users and the public."
        },
        {
          subtitle: "Business Transfers",
          text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction."
        }
      ]
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        {
          subtitle: "Protection Measures",
          text: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
        },
        {
          subtitle: "Data Encryption",
          text: "Sensitive information is encrypted during transmission and storage using industry-standard encryption protocols."
        },
        {
          subtitle: "Access Controls",
          text: "Access to personal information is restricted to authorized personnel who need the information to perform their job functions."
        }
      ]
    },
    {
      title: "Your Rights",
      icon: Shield,
      content: [
        {
          subtitle: "Access and Correction",
          text: "You have the right to access, update, or correct your personal information. Contact us to exercise these rights."
        },
        {
          subtitle: "Data Deletion",
          text: "You may request deletion of your personal information, subject to legal and legitimate business requirements."
        },
        {
          subtitle: "Opt-Out",
          text: "You can opt-out of marketing communications at any time by following the unsubscribe instructions in our emails or contacting us directly."
        }
      ]
    },
    {
      title: "Cookies and Tracking",
      icon: FileText,
      content: [
        {
          subtitle: "Cookie Usage",
          text: "We use cookies and similar technologies to enhance your browsing experience, analyze site usage, and assist in marketing efforts."
        },
        {
          subtitle: "Cookie Management",
          text: "You can control cookie settings through your browser preferences. However, disabling cookies may affect the functionality of our website."
        },
        {
          subtitle: "Third-Party Tracking",
          text: "Our website may include third-party tracking technologies for analytics and advertising purposes, subject to their respective privacy policies."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
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
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Privacy Policy
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            We are committed to protecting your privacy and ensuring the security of your personal information. This policy explains how we collect, use, and safeguard your data.
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
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              </div>
              
              <div className="space-y-6">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="space-y-2">
                    <h3 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
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

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Questions About Privacy?</h2>
          <p className="text-gray-300 mb-6">
            If you have any questions about this Privacy Policy or our data practices, please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:enquiry@algoforgestudios.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105"
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
