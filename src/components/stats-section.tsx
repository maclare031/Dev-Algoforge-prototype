"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Users, TrendingUp, Award, Building2, BookOpen, Code, Sparkles } from "lucide-react"

export function StatsSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const stats = [
    {
      icon: Users,
      number: 15000,
      suffix: "+",
      label: "ML Engineers Trained",
      description: "Professionals upskilled",
      color: "blue"
    },
    {
      icon: Building2,
      number: 500,
      suffix: "+",
      label: "Enterprise Clients",
      description: "Companies served",
      color: "purple"
    },
    {
      icon: TrendingUp,
      number: 95,
      suffix: "%",
      label: "Job Placement Rate",
      description: "Students placed",
      color: "emerald"
    },
    {
      icon: Award,
      number: 98,
      suffix: "%",
      label: "Client Satisfaction",
      description: "Happy clients",
      color: "cyan"
    },
    {
      icon: BookOpen,
      number: 50,
      suffix: "+",
      label: "Specialized Courses",
      description: "Learning paths",
      color: "amber"
    },
    {
      icon: Code,
      number: 1000,
      suffix: "+",
      label: "ML Models Deployed",
      description: "Production ready",
      color: "pink"
    }
  ]

  const AnimatedCounter = ({ target, suffix = "", inView }: { target: number, suffix?: string, inView: boolean }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (!inView) return

      const duration = 2000
      const steps = 60
      const stepValue = target / steps
      const stepDelay = duration / steps

      let currentStep = 0
      const timer = setInterval(() => {
        currentStep++
        if (currentStep <= steps) {
          setCount(Math.min(Math.floor(stepValue * currentStep), target))
        } else {
          clearInterval(timer)
          setCount(target)
        }
      }, stepDelay)

      return () => clearInterval(timer)
    }, [target, inView])

    return <span>{count.toLocaleString()}{suffix}</span>
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "text-blue-400 bg-blue-500/8 border-blue-500/20 hover:border-blue-400/30 hover:bg-blue-500/12",
      purple: "text-purple-400 bg-purple-500/8 border-purple-500/20 hover:border-purple-400/30 hover:bg-purple-500/12",
      emerald: "text-emerald-400 bg-emerald-500/8 border-emerald-500/20 hover:border-emerald-400/30 hover:bg-emerald-500/12",
      cyan: "text-cyan-400 bg-cyan-500/8 border-cyan-500/20 hover:border-cyan-400/30 hover:bg-cyan-500/12",
      amber: "text-amber-400 bg-amber-500/8 border-amber-500/20 hover:border-amber-400/30 hover:bg-amber-500/12",
      pink: "text-pink-400 bg-pink-500/8 border-pink-500/20 hover:border-pink-400/30 hover:bg-pink-500/12"
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section ref={ref} className="py-6 sm:py-8 lg:py-12 bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-blue-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-purple-500/4 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-cyan-500/3 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-2 sm:px-3 lg:px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-gray-800/30 backdrop-blur-sm rounded-full px-3 py-1.5 border border-gray-700/20 mb-3">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span className="font-semibold text-xs sm:text-sm text-cyan-300">Impact & Results</span>
          </div>
          
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 text-white">
           <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
           Numbers That Define Excellence
           </span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            Transforming careers through AI & ML education
          </p>
        </motion.div>

        {/* Stats Grid - Full Width */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2 sm:gap-3 mb-6">
          {stats.map((stat, index) => {
            const colorClasses = getColorClasses(stat.color)
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group p-3 sm:p-4 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/20 hover:scale-[1.02] transition-all duration-300 ${colorClasses.split(' ').slice(1).join(' ')}`}
              >
                {/* Icon */}
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center mb-2 sm:mb-3 transition-all duration-300 ${colorClasses.split(' ')[0]} ${colorClasses.split(' ').slice(2, 4).join(' ')}`}>
                  <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                {/* Number */}
                <div className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1 font-mono">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} inView={inView} />
                </div>

                {/* Label */}
                <h3 className="text-xs sm:text-sm font-semibold text-gray-200 mb-1 leading-tight line-clamp-2">{stat.label}</h3>

                {/* Description */}
                <p className="text-xs text-gray-400 leading-tight">{stat.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Element */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-gray-800/30 border border-gray-700/20 rounded-lg backdrop-blur-sm">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-300">Growing with passionate learners worldwide</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
