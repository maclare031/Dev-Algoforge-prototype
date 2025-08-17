import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Bot, BarChart3 } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: Code,
      title: "Custom AI Development",
      description: "Tailored AI solutions built from the ground up for your specific business needs.",
      features: ["Machine Learning Models", "Deep Learning Networks", "Computer Vision", "NLP Solutions"],
    },
    {
      icon: Bot,
      title: "AI Automation",
      description: "Streamline your operations with intelligent automation and process optimization.",
      features: ["Workflow Automation", "Intelligent Chatbots", "Process Mining", "RPA Integration"],
    },
    {
      icon: BarChart3,
      title: "Data Intelligence",
      description: "Transform raw data into actionable insights with advanced analytics and AI.",
      features: ["Predictive Analytics", "Real-time Dashboards", "Data Visualization", "Business Intelligence"],
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-gray-900/50 to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Our AI Services
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive AI solutions designed to transform your business operations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-8 bg-gray-800/40 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:bg-gray-800/60"
            >
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                  <service.icon className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 group">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
