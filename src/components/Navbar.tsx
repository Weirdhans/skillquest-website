'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {useTranslations, useLocale} from 'next-intl'
import {usePathname, useRouter} from 'next/navigation'

const languages = [
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
]

export default function Navbar() {
  const t = useTranslations('navbar')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [showCTA, setShowCTA] = useState(false)
  const [showLangMenu, setShowLangMenu] = useState(false)

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

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (showLangMenu && !target.closest('.language-switcher')) {
        setShowLangMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showLangMenu])

  const switchLanguage = (newLocale: string) => {
    // Remove current locale from pathname and add new one
    const pathWithoutLocale = pathname.replace(`/${locale}`, '')
    router.push(`/${newLocale}${pathWithoutLocale}`)
    setShowLangMenu(false)
  }

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0]

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
                {t('tagline')}
              </span>
            </div>
          </Link>

          {/* Right side - Language Switcher + CTA */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Language Switcher */}
            <div className="relative language-switcher">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50 hover:bg-white/80 border border-gray-200/50 hover:border-gray-300/50 transition-all"
                aria-label="Change language"
              >
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="hidden md:inline text-sm font-medium text-gray-700">
                  {currentLanguage.code.toUpperCase()}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${showLangMenu ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Language Dropdown */}
              <AnimatePresence>
                {showLangMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => switchLanguage(lang.code)}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-primary-50 transition-colors ${
                          locale === lang.code ? 'bg-primary-100 text-primary-700 font-semibold' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span className="text-sm">{lang.name}</span>
                        {locale === lang.code && (
                          <svg className="w-4 h-4 ml-auto text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
                    {t('cta')}
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
