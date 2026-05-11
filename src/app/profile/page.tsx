import React from 'react';
import { AppProvider } from '@/context/AppContext';
import ProfileContent from './components/ProfileContent';

export default function ProfilePage() {
  return (
    <AppProvider>
      <ProfileContent />
    </AppProvider>
  );
}