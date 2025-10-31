import React, { useState } from 'react';

import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Features } from '../components/Features';
import { Pricing } from '../components/Pricing';
import { Projects } from '../components/Projects';
import { Blog } from '../components/Blog';
import { Testimonials } from '../components/Testimonials';
import { About } from '../components/About';
import { Faq } from '../components/Faq';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { ChatBot } from '../components/ChatBot';
import { BackgroundAnimation } from '../components/BackgroundAnimation';
import { BottomNavBar } from '../components/BottomNavBar';
import { VoiceNavigation } from '../components/VoiceNavigation';
import { BookingModal } from '../components/BookingModal';
import { FloatingActionGroup } from '../components/FloatingActionGroup';

const Website: React.FC = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  return (
    <div className="bg-[#01010c] text-gray-300 font-sans antialiased overflow-x-hidden">
      <BackgroundAnimation />
      <div className="relative z-10">
        <Header />
        <main className="pb-16 md:pb-0">
          <Hero onBookCallClick={() => setIsBookingModalOpen(true)} />
          <Services />
          <Features />
          <Pricing />
          <Projects />
          <Blog />
          <Testimonials />
          <About />
          <Faq />
          <Contact />
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

export default Website;