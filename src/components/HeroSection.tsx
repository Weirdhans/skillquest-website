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
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24 fill-background-50 rotate-180">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  )
}
