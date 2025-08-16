export function TrustedBySection() {
  const companies = [
    "TechCorp",
    "InnovateLabs",
    "FutureAI",
    "DataDyne",
    "QuantumSoft",
    "NeuralNet",
    "CyberForge",
    "AIVision",
  ]

  return (
    <section className="py-20 border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-gray-400 text-lg mb-8">Trusted by the world&apos;s most innovative teams</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {companies.map((company) => (
              <div
                key={company}
                className="flex items-center justify-center p-6 bg-gray-800/30 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:bg-gray-800/50"
              >
                <span className="text-gray-300 font-semibold text-lg">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
