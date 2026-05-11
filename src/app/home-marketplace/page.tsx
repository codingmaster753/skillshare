import React from 'react';
import { AppProvider } from '@/context/AppContext';
import HomeMarketplaceContent from './components/HomeMarketplaceContent';

export default function HomeMarketplacePage() {
  return (
    <AppProvider>
      <HomeMarketplaceContent />
    </AppProvider>
  );
}