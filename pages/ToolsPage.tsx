import React, { useState } from 'react';

import { Header } from '../components/Header';
import { ImageGenerator } from '../components/ImageGenerator';
import { VideoGenerator } from '../components/VideoGenerator';
import { Footer } from '../components/Footer';
import { ChatBot } from '../components/ChatBot';
import { BackgroundAnimation } from '../components/BackgroundAnimation';
import { BottomNavBar } from '../components/BottomNavBar';
import { VoiceNavigation } from '../components/VoiceNavigation';
import { BookingModal } from '../components/BookingModal';
import { FloatingActionGroup } from '../components/FloatingActionGroup';

const ToolsPage: React.FC = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  return (
    <div className="bg-[#01010c] text-gray-300 font-sans antialiased overflow-x-hidden">
      <BackgroundAnimation />
      <div className="relative z-10">
        <Header />
        <main className="pb-16 md:pb-0 pt-10">
          <ImageGenerator />
          <VideoGenerator />
        </main>
        <Footer onBookCallClick={() => setIsBookingModalOpen(true)} />
        <ChatBot />
        <VoiceNavigation />
        <FloatingActionGroup />
        <BottomNavBar />
        <BookingModal 
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default ToolsPage;