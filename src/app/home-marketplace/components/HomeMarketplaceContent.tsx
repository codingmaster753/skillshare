'use client';
import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from '@/components/Navbar';
import MobileBottomNav from '@/components/MobileBottomNav';
import ScrollProgress from '@/components/ScrollProgress';
import LoadingScreen from '@/components/LoadingScreen';
import HireModal from '@/components/HireModal';
import MarketplaceHero from './MarketplaceHero';
import MarketplaceFilters from './MarketplaceFilters';
import MarketplaceGrid from './MarketplaceGrid';

export default function HomeMarketplaceContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <LoadingScreen isLoading={loading} />
      <ScrollProgress />
      <Navbar activePath="/home-marketplace" />
      <main className="pt-16 pb-20 lg:pb-0">
        <MarketplaceHero />
        <MarketplaceFilters />
        <MarketplaceGrid />
      </main>
      <MobileBottomNav activePath="/home-marketplace" />
      <HireModal />
      <ToastContainer position="bottom-right" theme="dark" toastClassName="!font-sans" />
    </div>
  );
}