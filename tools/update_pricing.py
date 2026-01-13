#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Update PricingSection.tsx to use useTranslations"""

content = """'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {useTranslations} from 'next-intl'

export default function PricingSection() {
  const t = useTranslations('pricing')

  return (
    <section id="pricing" className="section bg-white">
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-lg mb-4">
            {t('heading')}
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            {t('subheading')}
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* GUEST MODE */}
          <motion.div
            className="card border-2 border-gray-200"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-6">
              <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                {t('tiers.guest.label')}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{t('tiers.guest.price')}</div>
              <p className="text-sm text-gray-600">{t('tiers.guest.priceNote')}</p>
            </div>

            <ul className="space-y-2 mb-6 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">OK</span>
                <span className="text-gray-700">{t('tiers.guest.features.0')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">OK</span>
                <span className="text-gray-700">{t('tiers.guest.features.1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">OK</span>
                <span className="text-gray-700">{t('tiers.guest.features.2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-lg flex-shrink-0">❌</span>
                <span className="text-gray-500">{t('tiers.guest.features.3')}</span>
              </li>
            </ul>

            <Link href="/download" className="btn btn-secondary w-full text-sm py-2">
              {t('tiers.guest.cta')}
            </Link>
          </motion.div>

          {/* GRATIS ACCOUNT */}
          <motion.div
            className="card border-2 border-accent-green"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-6">
              <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                {t('tiers.free.label')}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{t('tiers.free.price')}</div>
              <p className="text-sm text-gray-600">{t('tiers.free.priceNote')}</p>
            </div>

            <ul className="space-y-2 mb-6 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">OK</span>
                <span className="text-gray-700">{t('tiers.free.features.0')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">OK</span>
                <span className="text-gray-700">{t('tiers.free.features.1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">OK</span>
                <span className="text-gray-700">{t('tiers.free.features.2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">OK</span>
                <span className="text-gray-700">{t('tiers.free.features.3')}</span>
              </li>
            </ul>

            <Link href="/download" className="btn btn-secondary w-full text-sm py-2">
              {t('tiers.free.cta')}
            </Link>
          </motion.div>

          {/* PREMIUM - POPULAR */}
          <motion.div
            className="card border-4 border-primary-500 relative shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {/* Popular badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-orange text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
              {t('tiers.premium.badge')}
            </div>

            <div className="mb-6 pt-2">
              <div className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                {t('tiers.premium.label')}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {t('tiers.premium.price')}
                <span className="text-sm text-gray-500">{t('tiers.premium.priceNote')}</span>
              </div>
              <p className="text-xs text-gray-600 mb-1">
                {t('tiers.premium.yearlyPrice')}
              </p>
              <p className="text-xs text-accent-orange font-semibold">
                {t('tiers.premium.lifetimePrice')}
              </p>
            </div>

            <ul className="space-y-2 mb-6 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">OK</span>
                <span className="text-gray-700">{t('tiers.premium.features.0')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">OK</span>
                <span className="text-gray-700">{t('tiers.premium.features.1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">OK</span>
                <span className="text-gray-700">{t('tiers.premium.features.2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">OK</span>
                <span className="text-gray-700">{t('tiers.premium.features.3')}</span>
              </li>
            </ul>

            <Link href="/pricing" className="btn btn-primary w-full text-sm py-2">
              {t('tiers.premium.cta')}
            </Link>
          </motion.div>

          {/* FAMILY PLAN */}
          <motion.div
            className="card border-2 border-accent-purple relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="mb-6">
              <div className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                {t('tiers.family.label')}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {t('tiers.family.price')}
                <span className="text-sm text-gray-500">{t('tiers.family.priceNote')}</span>
              </div>
              <p className="text-xs text-gray-600">
                {t('tiers.family.yearlyPrice')}
              </p>
            </div>

            <ul className="space-y-2 mb-6 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">OK</span>
                <span className="text-gray-700" dangerouslySetInnerHTML={{__html: t.raw('tiers.family.features.0')}}></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">OK</span>
                <span className="text-gray-700">{t('tiers.family.features.1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">OK</span>
                <span className="text-gray-700">{t('tiers.family.features.2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-lg flex-shrink-0">OK</span>
                <span className="text-gray-700">{t('tiers.family.features.3')}</span>
              </li>
            </ul>

            <Link href="/pricing" className="btn btn-secondary w-full text-sm py-2">
              {t('tiers.family.cta')}
            </Link>
          </motion.div>
        </div>

        {/* CTA to full pricing page */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-semibold text-lg transition-colors"
          >
            {t('cta')} →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
"""

with open('src/components/PricingSection.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('OK PricingSection.tsx updated successfully!')
