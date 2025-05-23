import { Link } from "wouter";

export default function Landing() {
  return (
    <div className="min-h-screen bg-cosmic-gradient">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Cosmic stars background */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-b from-cosmic-900 via-mystical-900 to-cosmic-900"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-mystical-gradient opacity-30 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-star text-gold-400 text-6xl md:text-8xl"></i>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent">
            Discover Your Cosmic Blueprint
          </h1>
          <p className="text-xl md:text-2xl text-cosmic-300 mb-8 max-w-2xl mx-auto">
            Get personalized astrological insights with authentic Vedic astrology. Your Kundali reveals the secrets written in the stars.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/api/login"
              className="bg-mystical-gradient hover:shadow-lg hover:shadow-mystical-500/50 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center"
            >
              <i className="fas fa-chart-pie mr-2"></i>
              Start Your Journey
            </a>
            <Link
              href="#features"
              className="border-2 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-cosmic-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 inline-block"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-cosmic-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-mystical-300 to-mystical-500 bg-clip-text text-transparent">
              Unlock Ancient Wisdom
            </h2>
            <p className="text-cosmic-300 text-lg max-w-2xl mx-auto">
              Experience the depth of Vedic astrology with modern technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-cosmic-700/60 backdrop-blur-sm rounded-xl p-6 border border-mystical-800/30 text-center">
              <div className="w-16 h-16 bg-mystical-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-chart-pie text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Birth Chart Generation</h3>
              <p className="text-cosmic-300">
                Generate accurate Kundali charts with precise planetary positions and divisional charts
              </p>
            </div>

            <div className="bg-cosmic-700/60 backdrop-blur-sm rounded-xl p-6 border border-mystical-800/30 text-center">
              <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-crystal-ball text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Daily Predictions</h3>
              <p className="text-cosmic-300">
                Receive personalized daily, weekly, and monthly predictions based on current transits
              </p>
            </div>

            <div className="bg-cosmic-700/60 backdrop-blur-sm rounded-xl p-6 border border-mystical-800/30 text-center">
              <div className="w-16 h-16 bg-mystical-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-heart text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Compatibility Analysis</h3>
              <p className="text-cosmic-300">
                Discover relationship compatibility through detailed synastry analysis
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cosmic-900 border-t border-mystical-800/30 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <i className="fas fa-star text-gold-400 text-2xl"></i>
            <span className="text-xl font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">Astro</span>
          </div>
          <p className="text-cosmic-400 text-sm">
            © 2024 Astro. All rights reserved. | Crafted with cosmic energy ✨
          </p>
        </div>
      </footer>
    </div>
  );
}
