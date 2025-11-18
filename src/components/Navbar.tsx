'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showCTA, setShowCTA] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY

      // Change navbar background after 10px scroll
      setIsScrolled(scrollPosition > 10)

      // Show CTA button after 100px scroll
      setShowCTA(scrollPosition > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/70 backdrop-blur-xl backdrop-saturate-150 shadow-sm border-b border-gray-200/50'
          : 'bg-white/40 backdrop-blur-2xl backdrop-saturate-200'
      }`}
      style={{
        WebkitBackdropFilter: isScrolled ? 'blur(40px) saturate(150%)' : 'blur(60px) saturate(200%)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Official Logo Image */}
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image
                src="/skillquest-logo.png"
                alt="SkillQuest Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain transition-all group-hover:scale-110"
                priority
              />
            </div>

            {/* Text Logo */}
            <div className="flex flex-col leading-none">
              <span className="text-xl md:text-2xl font-display font-extrabold text-gray-900 group-hover:text-primary-600 transition-colors">
                SkillQuest
              </span>
              <span className="text-[10px] md:text-xs font-semibold text-primary-500 tracking-wider">
                LEVEL UP
              </span>
            </div>
          </Link>

          {/* CTA Button - shows on scroll */}
          <AnimatePresence>
            {showCTA && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href="/download"
                  className="btn btn-primary px-4 py-2 md:px-6 md:py-3 text-sm md:text-base"
                >
                  Begin Gratis
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  )
}
