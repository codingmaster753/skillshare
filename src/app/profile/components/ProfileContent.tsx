'use client';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from '@/components/Navbar';
import MobileBottomNav from '@/components/MobileBottomNav';
import ScrollProgress from '@/components/ScrollProgress';
import ProfileHeader from './ProfileHeader';
import ProfileStats from './ProfileStats';
import ProfileTabs from './ProfileTabs';

export default function ProfileContent() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar activePath="/profile" />
      <main className="pt-16 pb-20 lg:pb-0">
        <ProfileHeader />
        <ProfileStats />
        <ProfileTabs />
      </main>
      <MobileBottomNav activePath="/profile" />
      <ToastContainer position="bottom-right" theme="dark" toastClassName="!font-sans" />
    </div>
  );
}