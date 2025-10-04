'use client';

import Link from 'next/link';
import { useSettings } from '@/contexts/SettingsContext';

export default function HeroSection() {
  const { settings } = useSettings();

  const heroTitle = settings?.hero.title || 'Welcome to JoVan';
  const heroSubtitle = settings?.hero.subtitle || 'Your trusted partner for export and import of local commodities';
  const heroBackground = settings?.hero.useBackgroundImage && settings?.hero.backgroundImage 
    ? `url(${settings.hero.backgroundImage})` 
    : 'linear-gradient(to right, #2563eb, #1e40af)';

  return (
    <section 
      className="text-white py-20"
      style={{ 
        background: heroBackground,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
          {heroTitle}
        </h1>
        <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">
          {heroSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition"
          >
            View Products
          </Link>
          <Link
            href="/contact"
            className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-xl hover:bg-white hover:text-blue-600 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
