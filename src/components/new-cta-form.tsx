"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { useEffect } from "react";

const formSchema = z.object({
  program: z.string().min(1, { message: "Please select a program." }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  contactNumber: z
    .string()
    .min(10, { message: "Contact number must be at least 10 digits." }),
  email: z.string().email({ message: "Invalid email address." }),
});

export function NewCTAForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      program: "",
      name: "",
      contactNumber: "",
      email: "",
    },
  });

  const { errors } = form.formState;

  useEffect(() => {
    for (const key in errors) {
      const errorMessage = errors[key as keyof typeof errors]?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      }
    }
  }, [errors]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
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

      toast.success("Form submitted successfully!");
      form.reset();
    } catch (error) {
      toast.error("Failed to submit form. Please try again.");
      console.error(error);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-800 to-black p-6 sm:p-8 rounded-2xl shadow-xl max-w-md w-full mx-auto"
    >
      <h2 className="text-center text-2xl sm:text-3xl font-bold text-white mb-2 leading-snug">
        Upskill & Transform
      </h2>
      <p className="text-center text-gray-400 text-xs sm:text-sm mb-4">
        Join our programs to level up your career.
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 text-sm">
        <select
          {...form.register("program")}
          className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Select Program</option>
          <option>Program 1</option>
          <option>Program 2</option>
        </select>

        <input
          type="text"
          placeholder="Name"
          {...form.register("name")}
          className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Contact Number"
          {...form.register("contactNumber")}
          className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <input
          type="email"
          placeholder="Email ID"
          {...form.register("email")}
          className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <Button
          type="submit"
          className="w-full mt-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-[1.02]"
        >
          Submit
        </Button>
      </form>
    </motion.div>
  );
}
