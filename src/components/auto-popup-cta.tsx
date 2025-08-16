"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Star, Shield, Zap, Users, Gift, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

// Define the Zod schema for form validation
const formSchema = z.object({
  program: z.string().min(1, { message: "Please select a program." }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .min(10, { message: "Contact number must be at least 10 digits." }),
  experience: z.string().min(1, { message: "Please select your experience." }),
});

interface AutoPopupCTAProps {
  showOnMLHeroOnly?: boolean;
}

export function AutoPopupCTA({ showOnMLHeroOnly = false }: AutoPopupCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasShownOnce, setHasShownOnce] = useState(false);

  // Initialize react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      program: "",
      name: "",
      email: "",
      phone: "",
      experience: "",
    },
  });

  const { errors, isSubmitting } = form.formState;

  useEffect(() => {
    setIsClient(true);
    // Check if popup has been shown before (use localStorage for persistent storage)
    const popupShown = localStorage.getItem('autoPopupShown');
    if (popupShown === 'true') {
      setHasShownOnce(true);
    }
  }, []);

  // Effect to display toast errors
  useEffect(() => {
    for (const key in errors) {
      const errorMessage = errors[key as keyof typeof errors]?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    }
  }, [errors]);

  useEffect(() => {
    if (!isClient || hasShownOnce) return;

    // Only show popup if it hasn't been shown before and we're explicitly on ML hero section
    if (showOnMLHeroOnly) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasShownOnceGlobally();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isClient, hasShownOnce, showOnMLHeroOnly]);

  const setHasShownOnceGlobally = () => {
    setHasShownOnce(true);
    localStorage.setItem('autoPopupShown', 'true');
  };

  const handleClose = () => {
    setIsVisible(false);
    // Mark as shown globally so it doesn't appear again
    setHasShownOnceGlobally();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("https://formspree.io/f/mzzvrjvn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setIsSubmitted(true);
      toast.success("Form submitted successfully!");
      form.reset(); // Reset form fields after successful submission
      setTimeout(handleClose, 1500);
    } catch (error) {
      toast.error("Failed to submit form. Please try again.");
      console.error(error);
      setIsSubmitted(false); // Ensure form can be resubmitted if error occurs
    }
  };

  if (!isClient) return null;

  if (isSubmitted) {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-lg p-1"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-sm w-full bg-gradient-to-br from-emerald-900/50 to-green-900/75 rounded-xl border border-emerald-700/40 p-3 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Thank You!</h3>
              <p className="text-emerald-200 text-xs mb-2">
                We'll contact you soon with program details.
              </p>
              <Button
                onClick={handleClose}
                className="bg-gradient-to-r from-emerald-500 to-green-500 text-xs font-semibold py-2 px-3 rounded-lg w-full"
              >
                Continue
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-lg p-1"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.93, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.93, opacity: 0, y: 20 }}
            transition={{ duration: 0.22, type: "spring", stiffness: 250 }}
            className="relative max-w-xs w-full bg-gradient-to-br from-gray-900 to-black rounded-xl border border-cyan-600/30 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-1 right-1 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white focus:outline-none"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="text-center py-3 px-2">
              <div className="flex justify-center mb-1">
                <div className="bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full px-2 py-0.5 text-[12px] text-cyan-200 font-semibold">
                  Limited Offer
                </div>
              </div>
              <h2 className="text-cyan-100 text-lg sm:text-2xl font-bold mb-0.5 leading-tight">
                Transform With AI/ML
              </h2>
              <div className="flex items-center justify-center gap-1 text-xs text-gray-400 mt-0.5 mb-1">
                <span className="flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  &nbsp;4.9
                </span>
                <span className="h-1 w-1 bg-gray-600 rounded-full" />
                <span className="flex items-center gap-0.5">
                  <Shield className="w-3 h-3 text-green-400" />
                  &nbsp;Certified
                </span>
                <span className="h-1 w-1 bg-gray-600 rounded-full" />
                <span className="flex items-center gap-0.5">
                  <Users className="w-3 h-3 text-blue-400" />
                  &nbsp;95% Placmnt
                </span>
              </div>
            </div>

            {/* Offer */}
            <div className="bg-yellow-500/15 rounded-lg px-2 py-1 text-yellow-100 text-xs text-center mx-3 mb-1 border border-yellow-600/20 flex items-center justify-center gap-1">
              <Gift className="w-3 h-3" /> 50% Off + Free Mentorship!
            </div>

            {/* Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 px-3 py-2">
              <select
                {...form.register("program")}
                required
                aria-label="Program"
                className="bg-gray-800/70 border border-gray-600/60 text-white text-xs rounded-lg py-2 px-2 focus:ring-2 focus:ring-cyan-500/30 mb-0"
              >
                <option value="">Program *</option>
                <option value="ml-fundamentals">ML Fundamentals (Beg.)</option>
                <option value="advanced-ml">Advanced ML</option>
                <option value="ai-specialization">AI Specialization</option>
                <option value="data-science">Data Science</option>
                <option value="enterprise-ai">Enterprise AI</option>
              </select>
              <input
                type="text"
                {...form.register("name")}
                required
                aria-label="Name"
                placeholder="Full Name *"
                className="bg-gray-800/70 border border-gray-600/60 text-white text-xs rounded-lg py-2 px-2 focus:ring-2 focus:ring-cyan-500/30 mb-0"
              />
              <input
                type="email"
                {...form.register("email")}
                required
                autoComplete="email"
                aria-label="Email"
                placeholder="Email *"
                className="bg-gray-800/70 border border-gray-600/60 text-white text-xs rounded-lg py-2 px-2 focus:ring-2 focus:ring-cyan-500/30 mb-0"
              />
              <input
                type="tel"
                {...form.register("phone")}
                required
                autoComplete="tel"
                aria-label="Phone"
                placeholder="Phone *"
                className="bg-gray-800/70 border border-gray-600/60 text-white text-xs rounded-lg py-2 px-2 focus:ring-2 focus:ring-cyan-500/30 mb-0"
              />
              <select
                {...form.register("experience")}
                required
                aria-label="Experience"
                className="bg-gray-800/70 border border-gray-600/60 text-white text-xs rounded-lg py-2 px-2 focus:ring-2 focus:ring-cyan-500/30 mb-0"
              >
                <option value="">Experience *</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert/Lead</option>
              </select>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-xs font-bold py-2 px-2 rounded-lg mt-2 flex items-center justify-center gap-1 shadow-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing…</span>
                  </div>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Claim Now</span>
                  </>
                )}
              </Button>
              <div className="flex items-center justify-center gap-2 mt-1 text-[10px] text-gray-400">
                <Shield className="w-3 h-3" />
                <span>Secure</span>
                <span className="h-1 w-1 bg-gray-600 rounded-full" />
                <span>No Spam</span>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
