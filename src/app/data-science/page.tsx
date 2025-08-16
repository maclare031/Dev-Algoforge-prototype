// app/data-science/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  CalendarDays,
  CheckCircle,
  Users,
  Star,
} from "lucide-react";

import Lottie from "lottie-react";
import dataScienceAnimation from "../assets/data-science.json";

interface CourseData {
  title: string;
  subtitle: string;
  duration: string;
  level: string;
  description: string;
  syllabus: {
    module: string;
    topics: string[];
  }[];
}

export default function DataSciencePage() {
  const [data, setData] = useState<CourseData | null>(null);
  const [openModule, setOpenModule] = useState<number | null>(null);

  useEffect(() => {
    fetch("/data/data-science.json")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <div className="text-white p-10">Loading...</div>;

  return (
    <main className="pt-24 px-6 md:px-16 pb-20 bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* register form */}
      <section className="grid md:grid-cols-2 gap-12 mb-20">
        {/* Left - Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold text-cyan-400">{data.title}</h1>
          <h2 className="text-xl text-purple-300">{data.subtitle}</h2>
          <p className="text-slate-300 leading-relaxed">{data.description}</p>

          <div className="flex gap-4 text-sm text-gray-400">
            <span className="bg-gray-800 px-3 py-1 rounded-full">
              Duration: {data.duration}
            </span>
            <span className="bg-gray-800 px-3 py-1 rounded-full">
              Level: {data.level}
            </span>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-400">Brought to you by</p>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              AlgoForgeStudios
            </h3>
          </div>
        </motion.div>

        {/* Right - Form and Fee */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <form className="bg-gray-900/70 p-8 rounded-2xl shadow-xl border border-cyan-500/10">
            <h3 className="text-xl font-semibold text-purple-300 mb-4">
              Register Now
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 rounded-lg bg-black/60 border border-cyan-500/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 rounded-lg bg-black/60 border border-cyan-500/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 rounded-lg bg-black/60 border border-cyan-500/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
              >
                Enroll Now
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* schedule info and fees */}
      <section className="grid md:grid-cols-2 gap-12 mb-20 ">
        {/* Schedule Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 p-4 bg-gray-900/80 flex items-center rounded-xl shadow border border-cyan-500/10"
        >
          <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-6">
            {/* Text Block */}
            <div className="flex-1 space-y-4">
              <h4 className="text-lg font-semibold text-blue-300">
                Calendar – On-Campus Classes
              </h4>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <CalendarDays className="text-blue-400" />
                  <div>
                    <p className="text-sm text-white font-semibold">
                      09<sup>th</sup> July
                    </p>
                    <p className="text-xs text-gray-400">Date</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-white font-semibold">
                    6:45 AM – 9:00 AM
                  </p>
                  <p className="text-xs text-gray-400">Timings</p>
                </div>
                <button className="ml-auto bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow hover:shadow-cyan-500/20 transition-all duration-300">
                  SHOW ALL CLASSES
                </button>
              </div>
            </div>

            {/* Animation Block */}
            <div className="w-full md:w-64 mt-6 md:mt-0">
              <Lottie animationData={dataScienceAnimation} loop={true} />
            </div>
          </div>
        </motion.div>

        {/* Fee Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-900/70 p-6 rounded-2xl shadow border border-cyan-500/10 mt-6"
        >
          <h4 className="text-xl font-semibold text-blue-300 mb-4">
            Course Fee
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
              <div>
                <p className="text-orange-400 font-semibold">
                  Classroom Training
                </p>
                <p className="text-sm text-white">
                  INR <s className="text-red-400">70,000</s>{" "}
                  <span className="text-green-400 font-bold">67,600</span>
                </p>
              </div>
              <CheckCircle className="text-green-500" />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
              <div>
                <p className="text-orange-400 font-semibold">VILT</p>
                <p className="text-sm text-white">
                  INR <s className="text-red-400">70,000</s>{" "}
                  <span className="text-green-400 font-bold">62,600</span>
                </p>
              </div>
              <CheckCircle className="text-green-500" />
            </div>

            <button className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
              Pay Now
            </button>
          </div>
        </motion.div>
      </section>

      {/* Course Overview */}
      <section className="mb-20 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Left Side – Overview Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2"
        >
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">
            Data Science Course Overview
          </h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            Data Science is among the most in-demand and future-proof fields
            today. This course helps you master the art of extracting insights
            from raw data using tools like Python, Pandas, NumPy, Scikit-learn,
            and more. You’ll also understand Machine Learning, Data
            Visualization, and real-world modeling techniques used across
            industries.
          </p>
          <h3 className="text-lg font-semibold text-purple-300 mb-2">
            What You’ll Learn:
          </h3>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            <li>Fundamentals of Python, Numpy, and Pandas</li>
            <li>Data Cleaning, Preprocessing, and Feature Engineering</li>
            <li>Machine Learning with Scikit-Learn</li>
            <li>Data Visualization using Matplotlib and Seaborn</li>
            <li>Mini projects with real-world datasets</li>
          </ul>
        </motion.div>

        {/* Right Side – Highlights/Box */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-900/80 rounded-2xl border border-cyan-500/10 p-6 shadow-lg flex flex-col justify-between"
        >
          <div>
            <h4 className="text-lg font-semibold text-blue-300 mb-4">
              Block Your Time
            </h4>
            <div className="space-y-3 text-white">
              <p className="text-base">
                <span className="text-3xl text-orange-400 font-bold">40</span>{" "}
                hours <br />
                <span className="text-sm text-gray-400">
                  Classroom Sessions
                </span>
              </p>
              <p className="text-base">
                <span className="text-3xl text-orange-400 font-bold">60+</span>{" "}
                hours <br />
                <span className="text-sm text-gray-400">Assignments</span>
              </p>
            </div>
          </div>

          <button className="mt-6 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-cyan-500/20">
            Enroll Now
          </button>
        </motion.div>
      </section>

      {/* Course Syllabus */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-purple-300 mb-6">Syllabus</h2>
        {data.syllabus.map((module, idx) => (
          <div
            key={idx}
            className="mb-4 bg-gray-800/70 rounded-xl border border-cyan-500/10"
          >
            <button
              onClick={() => setOpenModule(openModule === idx ? null : idx)}
              className="w-full px-6 py-4 flex justify-between items-center text-left text-white font-medium hover:bg-gray-800/80 rounded-xl"
            >
              {module.module}
              {openModule === idx ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openModule === idx && (
              <ul className="px-6 pb-4 text-slate-300 list-disc list-inside space-y-1">
                {module.topics.map((topic, i) => (
                  <li key={i}>{topic}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      {/* fee details and we should take it */}
      <section className="max-w-7xl mx-auto py-16 px-6 text-white">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold text-blue-400 text-center mb-12"
        >
          Course Fee Details
        </motion.h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Classroom Training */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900/80 rounded-2xl border border-cyan-500/10 shadow-lg p-6"
          >
            <div className="text-center text-xl font-semibold text-black bg-purple-100 py-2 rounded-t-xl mb-4">
              Classroom Training
            </div>
            <p className="text-sm text-blue-300 mb-2 font-medium">
              Mode of training: <span className="text-white">Classroom</span>
            </p>
            <ul className="text-sm space-y-2 mb-4 text-slate-300">
              <li>
                <CheckCircle className="inline w-4 h-4 mr-2 text-green-400" />
                Limited seats for classroom
              </li>
              <li>
                <CheckCircle className="inline w-4 h-4 mr-2 text-green-400" />
                Avail Monthly EMI at 0% Interest
              </li>
              <li>
                <CheckCircle className="inline w-4 h-4 mr-2 text-green-400" />
                Lifetime LMS Access
              </li>
              <li>
                <CheckCircle className="inline w-4 h-4 mr-2 text-green-400" />
                20+ hours masterclasses
              </li>
              <li>
                <CheckCircle className="inline w-4 h-4 mr-2 text-green-400" />
                Career support services
              </li>
            </ul>
            <div className="border-t border-gray-700 pt-4">
              <p className="text-sm text-gray-400">
                Next Batch:{" "}
                <span className="text-blue-300 font-semibold">
                  7th July 2025
                </span>
              </p>
              <p className="text-lg font-bold text-cyan-300 my-2">INR 67,600</p>
              <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/20">
                Pay Now
              </button>
              <div className="mt-4 text-xs text-gray-400 flex items-center justify-between">
                <span>
                  <Users className="inline w-4 h-4 mr-1" />
                  2064 Learners
                </span>
                <span>
                  <Star className="inline w-4 h-4 mr-1" />
                  485 Reviews
                </span>
              </div>
            </div>
          </motion.div>

          {/* VILT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900/80 rounded-2xl border border-cyan-500/10 shadow-lg p-6"
          >
            <div className="text-center text-xl font-semibold text-black bg-purple-100 py-2 rounded-t-xl mb-4">
              Virtual Instructor-led Training (VILT)
            </div>
            <p className="text-sm text-blue-300 mb-2 font-medium">
              Mode of training: <span className="text-white">Live Online</span>
            </p>
            <ul className="text-sm space-y-2 mb-4 text-slate-300">
              <li>
                <CheckCircle className="inline w-4 h-4 mr-2 text-green-400" />
                Live online – weekends & weekdays
              </li>
              <li>
                <CheckCircle className="inline w-4 h-4 mr-2 text-green-400" />
                365 days LMS access
              </li>
              <li>
                <CheckCircle className="inline w-4 h-4 mr-2 text-green-400" />
                0% EMI options
              </li>
              <li>
                <CheckCircle className="inline w-4 h-4 mr-2 text-green-400" />
                20+ masterclasses
              </li>
              <li>
                <CheckCircle className="inline w-4 h-4 mr-2 text-green-400" />
                Career support services
              </li>
            </ul>
            <div className="border-t border-gray-700 pt-4">
              <p className="text-sm text-gray-400">
                Next Batch:{" "}
                <span className="text-blue-300 font-semibold">
                  7th July 2025
                </span>
              </p>
              <p className="text-lg font-bold text-cyan-300 my-2">INR 62,600</p>
              <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/20">
                Pay Now
              </button>
              <div className="mt-4 text-xs text-gray-400 flex items-center justify-between">
                <span>
                  <Users className="inline w-4 h-4 mr-1" />
                  2064 Learners
                </span>
                <span>
                  <Star className="inline w-4 h-4 mr-1" />
                  485 Reviews
                </span>
              </div>
            </div>
          </motion.div>

          {/* Employee Upskilling */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-gray-900/80 rounded-2xl border border-cyan-500/10 shadow-lg p-6"
          >
            <div className="text-center text-xl font-semibold text-black bg-purple-100 py-2 rounded-t-xl mb-4">
              Employee Upskilling
            </div>
            <p className="text-sm text-blue-300 mb-2 font-medium">
              Mode of training:{" "}
              <span className="text-white">Onsite or Live Online</span>
            </p>
            <ul className="text-sm space-y-2 mb-4 text-slate-300">
              <li>
                <CheckCircle className="inline w-4 h-4 mr-2 text-green-400" />
                Customized training for organizations
              </li>
              <li>
                <CheckCircle className="inline w-4 h-4 mr-2 text-green-400" />
                Pre & Post Assessments
              </li>
              <li>
                <CheckCircle className="inline w-4 h-4 mr-2 text-green-400" />
                Corporate LMS & reporting
              </li>
              <li>
                <CheckCircle className="inline w-4 h-4 mr-2 text-green-400" />
                On-site / Remote Sessions
              </li>
              <li>
                <CheckCircle className="inline w-4 h-4 mr-2 text-green-400" />
                Free supplementary resources
              </li>
            </ul>
            <div className="border-t border-gray-700 pt-4">
              <p className="text-sm text-gray-400">
                Next Batch:{" "}
                <span className="text-blue-300 font-semibold">
                  7th July 2025
                </span>
              </p>

              <button className="w-full mt-11 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/20">
                Get Quote Today
              </button>
              <div className="mt-4 text-xs text-gray-400 flex items-center justify-between">
                <span>
                  <Users className="inline w-4 h-4 mr-1" />
                  2064 Learners
                </span>
                <span>
                  <Star className="inline w-4 h-4 mr-1" />
                  485 Reviews
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Why You Should Take This Program */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 max-w-5xl mx-auto bg-gradient-to-br from-black via-gray-900 to-black p-8 rounded-xl border border-cyan-500/10"
        >
          <h3 className="text-2xl font-bold text-purple-300 mb-4 text-center">
            Why You Should Take This Program
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-300 text-sm">
            <li>No prior coding knowledge required – perfect for beginners</li>
            <li>Learn from experienced data scientists and industry mentors</li>
            <li>Work on real-world datasets and projects</li>
            <li>Get placement support, resume building, and mock interviews</li>
            <li>Lifetime LMS access with updated content</li>
            <li>Flexible batch options: weekdays, weekends & online</li>
          </ul>
        </motion.div>
      </section>

   
    </main>
  );
}
