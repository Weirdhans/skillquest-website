'use client'

import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary-500 to-primary-700 text-white overflow-hidden pt-16 md:pt-20">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>

      <div className="container mx-auto px-6 py-20 md:py-28 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Track Je Skills.
              <br />
              <span className="text-accent-orange">Level Up Je Leven.</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              De ultieme skill-tracking app waarmee je elke vaardigheid bijhoudt,
              progress visualiseert en gemotiveerd blijft door gamification.
            </motion.p>

            {/* Feature highlights */}
            <motion.div
              className="grid grid-cols-2 gap-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">⏱️</span>
                <span className="text-lg font-semibold">Smart Timers</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">📊</span>
                <span className="text-lg font-semibold">Analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎮</span>
                <span className="text-lg font-semibold">Gamification</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">👥</span>
                <span className="text-lg font-semibold">Social Features</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.a
                href="#waitlist"
                className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-xl hover:scale-105 transition-all text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Krijg Early Access ✨
              </motion.a>
              <motion.a
                href="/features"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-semibold text-lg border-2 border-white/40 hover:bg-white/30 transition-all text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ontdek Features
              </motion.a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="flex flex-wrap gap-6 text-sm text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔒</span>
                <span>100% Privacy</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🚫</span>
                <span>Geen Ads</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">💰</span>
                <span>Gratis Starten</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - App Preview */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/20 shadow-2xl">
              {/* Placeholder for app screenshot */}
              <div className="aspect-[4/3] bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    className="text-8xl mb-4"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  >
                    📱
                  </motion.div>
                  <p className="text-white/80 text-lg px-8">
                    [App Screenshot]
                    <br />
                    <span className="text-sm">SkillQuest Dashboard</span>
                  </p>
                </div>
              </div>

              {/* Floating stats cards */}
              <motion.div
                className="absolute -bottom-4 -right-4 bg-white text-gray-900 rounded-2xl shadow-2xl p-4"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="text-2xl font-bold text-primary-500">Level 15</div>
                <div className="text-sm text-gray-600">2,450 XP 🎯</div>
              </motion.div>

              <motion.div
                className="absolute -top-4 -left-4 bg-accent-green text-white rounded-2xl shadow-2xl p-4"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <div className="text-lg font-bold">78 Skills</div>
                <div className="text-sm opacity-90">Tracked 🚀</div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -left-6 bg-accent-orange text-white rounded-2xl shadow-2xl p-3"
                animate={{
                  x: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="text-lg font-bold">14 🔥</div>
                <div className="text-xs opacity-90">Day Streak</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24 fill-background-50">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  )
}
