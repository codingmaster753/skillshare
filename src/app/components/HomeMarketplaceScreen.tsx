'use client';
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from '@/components/Navbar';
import MobileBottomNav from '@/components/MobileBottomNav';
import ScrollProgress from '@/components/ScrollProgress';
import LoadingScreen from '@/components/LoadingScreen';
import HeroSection from './HeroSection';
import BentoFeatures from './BentoFeatures';
import MapSection from './MapSection';
import SkillCards from './SkillCards';
import HireModal from '@/components/HireModal';
import ContactSection from './ContactSection';

export default function HomeMarketplaceScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <LoadingScreen isLoading={loading} />
      <ScrollProgress />
      <Navbar activePath="/" />
      <main className="pb-20 lg:pb-0">
        <HeroSection />
        <BentoFeatures />
        <MapSection />
        <SkillCards />
        <ContactSection />
      </main>
      <MobileBottomNav activePath="/" />
      <HireModal />
      <ToastContainer
        position="bottom-right"
        theme="dark"
        toastClassName="!font-sans"
      />
    </div>
  );
}