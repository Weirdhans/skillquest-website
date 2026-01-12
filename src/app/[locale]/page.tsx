import HeroSection from '@/components/HeroSection'
import PainPointsSection from '@/components/PainPointsSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import FeaturesSection from '@/components/FeaturesSection'
import PricingSection from '@/components/PricingSection'
import EmailCaptureSection from '@/components/EmailCaptureSection'
import Footer from '@/components/Footer'
import {routing} from '@/i18n/routing';

const locales = routing.locales;

export function generateStaticParams() {
  return locales.map((locale) => ({locale}))
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PainPointsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <PricingSection />
      <EmailCaptureSection />
      <Footer />
    </main>
  )
}
