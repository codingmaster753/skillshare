import React from 'react';
import { AppProvider } from '@/context/AppContext';
import ShareYourSkillContent from './components/ShareYourSkillContent';

export default function ShareYourSkillPage() {
  return (
    <AppProvider>
      <ShareYourSkillContent />
    </AppProvider>
  );
}