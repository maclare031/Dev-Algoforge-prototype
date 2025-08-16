"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageCircle,
  Star,
  Shield,
  Zap,
  ArrowRight,
  ExternalLink,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

// Define the Zod schema for form validation
const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Full Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().optional(),
  subject: z.string().min(1, { message: "Subject is required." }),
  message: z.string().min(1, { message: "Message is required." }),
  inquiryType: z.string().min(1, { message: "Please select an inquiry type." }),
});

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize react-hook-form
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      inquiryType: "",
    },
  });

  const { errors, isSubmitting } = form.formState;

  useEffect(() => {
    // Effect to display toast errors
    for (const key in errors) {
      const errorMessage = errors[key as keyof typeof errors]?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    }
  }, [errors]);

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    try {
      const response = await fetch("https://formspree.io/f/myzpwnnq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Formspree error response:", {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
        throw new Error("Form submission failed");
      }

      setIsSubmitted(true);
      toast.success("Message sent successfully!");
      form.reset();

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error(error);
      setIsSubmitted(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "enquiry@algoforgestudios.com",
      subdetails: "We'll respond within 24 hours",
      color: "from-cyan-500 to-blue-500",
      href: "mailto:enquiry@algoforgestudios.com?subject=Inquiry from AlgoForgeStudios Website&body=Hi there,%0D%0A%0D%0AI have a question about your services.%0D%0A%0D%0AThank you!",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 93055 26047",
      subdetails: "Mon-Fri 9AM-6PM IST",
      color: "from-purple-500 to-pink-500",
      href: "tel:+919305526047",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Lucknow",
      subdetails: "Uttar Pradesh",
      color: "from-emerald-500 to-green-500",
      href: "https://maps.google.com/?q=Lucknow,Uttar+Pradesh,India",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Fri: 9AM-6PM",
      subdetails: "Weekend: 10AM-4PM",
      color: "from-orange-500 to-red-500",
    },
  ];

  const features = [
    {
      icon: Star,
      title: "Expert Support",
      description: "Get help from our ML experts",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is safe with us",
    },
    {
      icon: Zap,
      title: "Quick Response",
      description: "24-hour response guarantee",
    },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-3 sm:p-4 relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-emerald-500/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{ left: "20%", top: "20%" }}
          />
          <motion.div
            className="absolute w-48 h-48 sm:w-64 sm:h-64 bg-green-500/20 rounded-full blur-2xl"
            animate={{ scale: [1.2, 1, 1.2], rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity }}
            style={{ right: "30%", bottom: "30%" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative max-w-md w-full bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-emerald-500/20 p-6 sm:p-8 text-center shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              type: "spring",
              bounce: 0.5,
            }}
            className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-emerald-500/50"
          >
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full opacity-30"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Message Sent!
            </span>
          </h2>
          <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
            Thank you for reaching out! We've received your message and will get
            back to you within 24 hours.
          </p>

          <div className="bg-emerald-500/20 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
            <p className="text-emerald-100 text-xs sm:text-sm">
              🎉 <strong>Bonus:</strong> Check your email for our exclusive ML
              resources guide!
            </p>
          </div>

          <Button
            onClick={() => setIsSubmitted(false)}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
          >
            Send Another Message
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [-50, 50, -50],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: "15%", top: "15%" }}
        />
        <motion.div
          className="absolute w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [50, -50, 50],
            y: [50, -50, 50],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{ right: "15%", bottom: "15%" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-16">
  {/* Header Section */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-center mb-8 sm:mb-10 lg:mb-12"
  >
    <div className="flex justify-center mb-3 sm:mb-4">
      <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-cyan-500/30">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-cyan-300 font-medium text-xs sm:text-sm">
            Get In Touch
          </span>
        </div>
      </div>
    </div>

    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 leading-tight">
  <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
    Let's Start a
    <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
    {" "} New Conversation
  </span>
  </span>
  <br />

</h1>


    <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
      Have questions about our ML programs? Need help with your AI
      journey? Our experts are here to help you succeed.
    </p>
  </motion.div>

  <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
    {/* Contact Information Cards */}
    <div className="lg:col-span-1 space-y-3">
      {contactInfo.map((info, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="group relative"
        >
          {info.href ? (
            <motion.a
              href={info.href}
              target={info.href.startsWith("http") ? "_blank" : "_self"}
              rel={
                info.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.99 }}
              className="block p-3 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-xl border border-gray-700/50 hover:border-transparent transition-all duration-500 overflow-hidden cursor-pointer shadow-lg hover:shadow-xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${info.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />
              <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <div className="relative flex items-start space-x-2.5 z-10">
                <motion.div
                  className={`w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-r ${info.color} rounded-lg flex items-center justify-center shadow-lg flex-shrink-0`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <info.icon className="w-4 h-4 text-white" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white mb-0.5 group-hover:text-cyan-300 transition-colors duration-300 truncate">
                    {info.title}
                  </h3>
                  <p className="text-xs text-gray-300 font-medium group-hover:text-white transition-colors duration-300 truncate">
                    {info.details}
                  </p>
                  <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {info.subdetails}
                  </p>
                </div>
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
                  whileHover={{ x: 2 }}
                >
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                </motion.div>
              </div>
            </motion.a>
          ) : (
            <div className="p-3 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
              <div className="flex items-start space-x-2.5">
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-r ${info.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0`}
                >
                  <info.icon className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white mb-0.5 truncate">
                    {info.title}
                  </h3>
                  <p className="text-xs text-gray-300 font-medium truncate">
                    {info.details}
                  </p>
                  <p className="text-xs text-gray-400">
                    {info.subdetails}
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      ))}

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-xl border border-gray-700/50 p-3"
      >
        <h3 className="text-sm sm:text-base font-bold text-white mb-2">
          Why Choose Us?
        </h3>
        <div className="space-y-2">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-2"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-6 h-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mt-0.5 flex-shrink-0">
                <feature.icon className="w-3 h-3 text-cyan-400" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-white text-xs">
                  {feature.title}
                </h4>
                <p className="text-gray-400 text-xs">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>

    {/* Contact Form */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="lg:col-span-2"
    >
      <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-xl border border-gray-700/50 p-3 sm:p-4">
        <div className="mb-4">
          <h2 className="text-base sm:text-lg font-bold text-white mb-1">
            Send us a Message
          </h2>
          <p className="text-gray-300 text-xs">
            Fill out the form below and we'll get back to you shortly.
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3"
        >
          <div className="grid md:grid-cols-2 gap-3">
            {/* Name */}
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="block text-xs font-medium text-gray-300"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                {...form.register("name")}
                className="w-full px-2.5 py-2 rounded-lg bg-gray-800/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm text-xs"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-300"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...form.register("email")}
                className="w-full px-2.5 py-2 rounded-lg bg-gray-800/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm text-xs"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {/* Phone */}
            <div className="space-y-1">
              <label
                htmlFor="phone"
                className="block text-xs font-medium text-gray-300"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
                {...form.register("phone")}
                className="w-full px-2.5 py-2 rounded-lg bg-gray-800/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm text-xs"
              />
            </div>

            {/* Inquiry Type */}
            <div className="space-y-1">
              <label
                htmlFor="inquiryType"
                className="block text-xs font-medium text-gray-300"
              >
                Inquiry Type *
              </label>
              <select
                id="inquiryType"
                {...form.register("inquiryType")}
                className="w-full px-2.5 py-2 rounded-lg bg-gray-800/50 border border-gray-600/50 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm text-xs"
                required
              >
                <option value="">Select inquiry type</option>
                <option value="programs">Course Programs</option>
                <option value="enterprise">Enterprise Solutions</option>
                <option value="partnership">Partnership</option>
                <option value="support">Technical Support</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-1">
            <label
              htmlFor="subject"
              className="block text-xs font-medium text-gray-300"
            >
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              placeholder="What's this about?"
              {...form.register("subject")}
              className="w-full px-2.5 py-2 rounded-lg bg-gray-800/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm text-xs"
              required
            />
          </div>

          {/* Message */}
          <div className="space-y-1">
            <label
              htmlFor="message"
              className="block text-xs font-medium text-gray-300"
            >
              Message *
            </label>
            <textarea
              id="message"
              rows={3}
              placeholder="Tell us more about your inquiry..."
              {...form.register("message")}
              className="w-full px-2.5 py-2 rounded-lg bg-gray-800/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm resize-none text-xs"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between pt-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 flex-shrink-0" />
                <span>Secure & Encrypted</span>
              </div>
              <div className="w-1 h-1 bg-gray-500 rounded-full hidden sm:block" />
              <span>Response within 24 hours</span>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="group relative bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold py-2 px-4 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 border-0 overflow-hidden w-full sm:w-auto text-xs"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <div className="relative z-10">
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <motion.div
                        whileHover={{ rotate: -10, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Send className="w-3 h-3" />
                      </motion.div>
                      <span>Send Message</span>
                    </div>
                  )}
                </div>
              </Button>
            </motion.div>
          </div>
        </form>
      </div>
    </motion.div>
  </div>

  {/* FAQ Quick Links */}
  {/* <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.6 }}
    className="text-center"
  >
    <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">
        Looking for Quick Answers?
      </h3>
      <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm">
        Check out our frequently asked questions or browse our help center
      </p>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
        <motion.div
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto"
        >
          <Button
            variant="outline"
            className="group relative bg-gradient-to-r from-black/60 to-gray-900/60 border-2 border-cyan-500/50 text-cyan-300 hover:border-transparent px-3 sm:px-4 py-2 rounded-xl transition-all duration-500 overflow-hidden backdrop-blur-xl shadow-lg hover:shadow-cyan-500/30 w-full sm:w-auto text-xs"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div className="relative flex items-center justify-center z-10">
              <HelpCircle className="mr-1.5 w-3 h-3" />
              <span className="font-medium group-hover:text-white transition-colors duration-300">
                Browse FAQ
              </span>
              <ArrowRight className="ml-1.5 w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto"
        >
          <Button
            variant="outline"
            className="group relative bg-gradient-to-r from-black/60 to-gray-900/60 border-2 border-purple-500/50 text-purple-300 hover:border-transparent px-3 sm:px-4 py-2 rounded-xl transition-all duration-500 overflow-hidden backdrop-blur-xl shadow-lg hover:shadow-purple-500/30 w-full sm:w-auto text-xs"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div className="relative flex items-center justify-center z-10">
              <BookOpen className="mr-1.5 w-3 h-3" />
              <span className="font-medium group-hover:text-white transition-colors duration-300">
                Help Center
              </span>
              <ArrowRight className="ml-1.5 w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Button>
        </motion.div>
      </div>
    </div>
  </motion.div> */}
</div>

    </div>
  );
}
