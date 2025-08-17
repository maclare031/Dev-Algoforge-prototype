import { Brain, Zap, Shield, Cpu, Database, Rocket } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "Advanced Machine Learning",
      description: "Cutting-edge ML algorithms that adapt and learn from your data in real-time.",
    },
    {
      icon: Zap,
      title: "Lightning Fast Processing",
      description: "Optimized AI models delivering results at unprecedented speeds.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security ensuring your data and AI models are protected.",
    },
    {
      icon: Cpu,
      title: "Neural Architecture",
      description: "Custom neural networks designed for your specific use cases.",
    },
    {
      icon: Database,
      title: "Smart Data Pipeline",
      description: "Automated data processing and feature engineering pipelines.",
    },
    {
      icon: Rocket,
      title: "Rapid Deployment",
      description: "Deploy AI solutions to production in minutes, not months.",
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              AI Solutions That Scale
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Harness the power of artificial intelligence with our comprehensive suite of tools and services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-8 bg-gray-800/30 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:bg-gray-800/50 hover:transform hover:scale-105"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
