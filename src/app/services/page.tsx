"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { 
  Code, 
  Smartphone, 
  Bot, 
  Database, 
  Cog, 
  TrendingUp,
  ArrowRight,
  Star,
  Users,
  CheckCircle,
  Zap,
  Shield,
  Award,
  Globe,
  ChevronRight,
  MessageSquare,
  Brain,
  Sparkles
} from "lucide-react";

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("all");

  const services = [
    {
      id: "web",
      category: "website",
      icon: Code,
      title: "Website Development",
      description: "We craft dynamic websites for a standout online presence. Our expert developers take on identity, design, and working on impactful digital experiences.",
      color: "from-neon-cyan to-neon-blue",
      bgColor: "from-neon-cyan/10 to-neon-blue/10",
      image: "/images/fefinance.jpg.webp"
    },
    {
      id: "mobile",
      category: "app",
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Designing and creating applications specifically for mobile devices such as smartphones and tablets.",
      color: "from-neon-purple to-neon-pink",
      bgColor: "from-neon-purple/10 to-neon-pink/10",
      image: "/images/Neon-gradient-mobile-mockup-instagram-post-9_page-0001.jpg.webp"
    },
    {
      id: "web2",
      category: "website",
      icon: Globe,
      title: "E-commerce Development",
      description: "Build powerful online stores with secure payment gateways and user-friendly interfaces for maximum conversions.",
      color: "from-neon-green to-neon-cyan",
      bgColor: "from-neon-green/10 to-neon-cyan/10",
      image: "/images/glowsy1.jpg.webp"
    },
    {
      id: "chatbot",
      category: "chatbot",
      icon: Bot,
      title: "Chatbot Development",
      description: "Enhance customer engagement and streamline communication through cutting-edge chatbot solutions that deliver personalized and seamless interactions.",
      color: "from-neon-orange to-neon-yellow",
      bgColor: "from-neon-orange/10 to-neon-yellow/10",
      image: "/images/autopilot.jpg.webp"
    },
    {
      id: "app2",
      category: "app",
      icon: Smartphone,
      title: "Cross-Platform Apps",
      description: "Develop applications that work seamlessly across multiple platforms with native performance and user experience.",
      color: "from-neon-pink to-neon-purple",
      bgColor: "from-neon-pink/10 to-neon-purple/10",
      image: "/images/Neon-gradient-mobile-mockup-instagram-post-10_page-0001.jpg.webp"
    },
    {
      id: "chatbot2",
      category: "chatbot",
      icon: MessageSquare,
      title: "AI-Powered Chatbots",
      description: "Advanced conversational AI solutions that understand context, learn from interactions, and provide intelligent responses.",
      color: "from-neon-blue to-neon-cyan",
      bgColor: "from-neon-blue/10 to-neon-cyan/10",
      image: "/images/hailz1.jpg.webp"
    },
    {
      id: "web3",
      category: "website",
      icon: Shield,
      title: "Web Security Solutions",
      description: "Implement robust security measures to protect your web applications from threats and ensure data integrity.",
      color: "from-neon-yellow to-neon-orange",
      bgColor: "from-neon-yellow/10 to-neon-orange/10",
      image: "/images/leaderbridge.jpg.webp"
    },
    {
      id: "app3",
      category: "app",
      icon: Zap,
      title: "Performance Optimization",
      description: "Optimize your applications for speed, efficiency, and scalability to deliver exceptional user experiences.",
      color: "from-neon-cyan to-neon-purple",
      bgColor: "from-neon-cyan/10 to-neon-purple/10",
      image: "/images/ocxee.jpg.webp"
    },
    {
      id: "chatbot3",
      category: "chatbot",
      icon: Brain,
      title: "Voice-Enabled Bots",
      description: "Create intelligent voice assistants that can understand speech, process commands, and respond naturally.",
      color: "from-neon-pink to-neon-blue",
      bgColor: "from-neon-pink/10 to-neon-blue/10",
      image: "/images/vinay-express.png.webp"
    }
  ];

  const tabs = [
    { id: "all", label: "All", icon: Sparkles },
    { id: "app", label: "App Development", icon: Smartphone },
    { id: "chatbot", label: "Chatbot Development", icon: Bot },
    { id: "website", label: "Website Development", icon: Code }
  ];

  const filteredServices = activeTab === "all" ? services : services.filter(service => service.category === activeTab);

  const stats = [
    { label: "YEARS EXPERIENCE", value: "7+", color: "text-neon-cyan" },
    { label: "EXPERT EMPLOYEES", value: "150+", color: "text-neon-purple" },
    { label: "COMPLETED PROJECTS", value: "215+", color: "text-neon-pink" },
    { label: "SATISFIED CLIENTS", value: "200+", color: "text-neon-blue" }
  ];

  const projects = [
    {
      title: "FE FINANCE",
      category: "Web Development",
      image: "/images/fefinance.jpg.webp",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      title: "AUTOPILOT",
      category: "Custom Development",
      image: "/images/service/autopilot.jpg.webp",
      gradient: "from-green-500 to-teal-500"
    },
    {
      title: "LEADER BRIDGE",
      category: "Mobile Development",
      image: "/images/service/leaderbridge.jpg.webp",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      title: "OCXEE",
      category: "AI Development",
      image: "/images/service/ocxee.jpg.webp",
      gradient: "from-cyan-500 to-blue-500"
    }
  ];

  const testimonials = [
    {
      name: "FishNova",
      role: "CEO",
      content: "We've been working with the team for over a year now and they've consistently delivered exceptional AI solutions and decision-making. Their expertise in artificial intelligence is truly impressive.",
      rating: 5,
      avatar: "/api/placeholder/64/64"
    },
    {
      name: "Altium Inc.",
      role: "CTO",
      content: "The project with the machine learning solutions team yielded exceptional results. They streamlined our systems, providing insights that elevated our operations. Great team to work with!",
      rating: 5,
      avatar: "/api/placeholder/64/64"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 rounded-2xl flex items-center justify-center">
                <Brain className="w-8 h-8 text-neon-cyan" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                    Creative Digital Products
                  </span>
                </h1>
              </div>
            </div>
          </div>

          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            We provide a wide range of designer, branding, marketing and development services, as well as offer business consultations for startup projects. Come see us at our office! We provide a wide range of designer, branding, marketing and development services, as well as offer business consultations for startup projects. Come see us at our office!
          </p>

          <Button className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-cyan/80 hover:to-neon-purple/80 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-neon-cyan/25 transform hover:scale-105 transition-all duration-300">
            GET STARTED
          </Button>
        </motion.div>

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                What We Do
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Comprehensive digital solutions tailored to your business needs
            </p>
            
            {/* Service Tabs */}
            <div className="flex justify-center flex-wrap gap-4 mb-12">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 border-neon-cyan/50 text-neon-cyan'
                      : 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-neon-cyan/30 hover:text-neon-cyan'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative overflow-hidden bg-gradient-to-br ${service.bgColor} backdrop-blur-xl rounded-2xl border border-gray-700/50 hover:border-neon-cyan/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-neon-cyan/10`}
              >
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-60 group-hover:opacity-40 transition-opacity duration-300`} />
                </div>
                
                {/* Service Content */}
                <div className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-neon-cyan transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{service.description}</p>
                  
                  {/* Learn More Button */}
                  <div className="mt-6">
                    <button className="flex items-center space-x-2 text-neon-cyan hover:text-neon-purple transition-colors duration-300 group">
                      <span className="font-medium">Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm font-medium tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects Section */}
       <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                Transforming Ideas into Achievements
              </span>
            </h2>
            
              <div className="flex justify-center space-x-4 mb-8">
                <span className="px-4 py-2 bg-gray-800/50 rounded-full text-sm text-gray-300 border border-gray-700/50 hover:border-neon-cyan/30 hover:text-neon-cyan transition-all duration-300">App Development</span>
                <span className="px-4 py-2 bg-gray-800/50 rounded-full text-sm text-gray-300 border border-gray-700/50 hover:border-neon-purple/30 hover:text-neon-purple transition-all duration-300">Custom Development</span>
                <span className="px-4 py-2 bg-gray-800/50 rounded-full text-sm text-gray-300 border border-gray-700/50 hover:border-neon-pink/30 hover:text-neon-pink transition-all duration-300">Website Development</span>
              </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90 group-hover:opacity-70 transition-opacity duration-300`} />
                </div>
                
                <div className="relative p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors duration-300">{project.title}</h3>
                      <p className="text-white/80 group-hover:text-neon-purple transition-colors duration-300">{project.category}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between items-end">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-white/60 text-sm">
                      www.algoforgestudios.com
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div> 

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                Testimonials
              </span>
            </h2>
            <p className="text-gray-300 text-lg">For Our Clients, We Create Artistic Endeavours</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 hover:border-neon-cyan/30 p-8 relative transition-all duration-300 hover:shadow-lg hover:shadow-neon-cyan/10"
              >
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-neon-cyan transition-colors duration-300">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm group-hover:text-neon-purple transition-colors duration-300">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-neon-yellow fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 backdrop-blur-xl rounded-3xl border border-neon-cyan/30 p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 to-neon-purple/5" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                  Let's work together
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Get in touch today and receive a complimentary consultation.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-4 rounded-xl bg-gray-800/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan/50 transition-all duration-300"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-4 rounded-xl bg-gray-800/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan/50 transition-all duration-300"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-4 rounded-xl bg-gray-800/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan/50 transition-all duration-300"
                />
                <select className="w-full p-4 rounded-xl bg-gray-800/50 border border-gray-600/50 text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan/50 transition-all duration-300">
                  <option>Country</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                </select>
              
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full p-4 rounded-xl bg-gray-800/50 border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan/50 transition-all duration-300 resize-none md:col-span-2"
                />
                
                <Button className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-cyan/80 hover:to-neon-purple/80 text-white font-semibold py-4 px-12 rounded-xl shadow-lg hover:shadow-neon-cyan/25 transform hover:scale-105 transition-all duration-300 md:col-span-2">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
