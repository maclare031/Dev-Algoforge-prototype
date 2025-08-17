import React from 'react';
import { Wrench, Clock, ArrowRight } from 'lucide-react';

export function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="relative">
          {/* Animated background glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-xl animate-pulse"></div>
          
          {/* Main content */}
          <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-8 md:p-12">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                  <Wrench className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full animate-ping"></div>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              We&apos;ll Be Back Soon
            </h1>
            
            {/* Subheading */}
            <p className="text-xl text-gray-300 mb-8">
              Our website is currently undergoing scheduled maintenance
            </p>

            {/* Description */}
            <div className="space-y-4 text-gray-400 mb-10">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>We&apos;re working hard to improve your experience</span>
              </div>
              <p>
                Thank you for your patience. We&apos;ll be back online shortly with exciting updates and improvements.
              </p>
            </div>

            {/* Status indicator */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400">System Status: Under Maintenance</span>
              </div>
            </div>

            {/* Contact info */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
              <p className="text-gray-300 text-sm mb-2">
                For urgent inquiries, please contact us:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
                <a 
                  href="mailto:support@algoforgestudios.com" 
                  className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                  support@algoforgestudios.com
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-800/50">
              <p className="text-xs text-gray-500">
                AlgoForge Studios • Maintenance Mode Active
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
