import React from 'react';
import { AppProvider } from '@/context/AppContext';
import HomeMarketplaceScreen from './components/HomeMarketplaceScreen';

export default function HomePage() {
  return (
    <AppProvider>
      <HomeMarketplaceScreen />
    </AppProvider>
  );
}