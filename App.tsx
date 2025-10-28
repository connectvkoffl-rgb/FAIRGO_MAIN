
import React from 'react';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Features } from './components/Features';
import { Process } from './components/Process';
import { Projects } from './components/Projects';
import { Achievements } from './components/Achievements';
import { ImageGenerator } from './components/ImageGenerator';
import { VideoGenerator } from './components/VideoGenerator';
import { Campaigns } from './components/Campaigns';
import { Comparison } from './components/Comparison';
import { Testimonials } from './components/Testimonials';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { ChatBot } from './components/ChatBot';
import { BackgroundAnimation } from './components/BackgroundAnimation';

const App: React.FC = () => {
  return (
    <div className="bg-[#01010c] text-gray-300 font-sans antialiased overflow-x-hidden">
      <BackgroundAnimation />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Services />
          <Features />
          <Process />
          <Projects />
          <Achievements />
          <ImageGenerator />
          <VideoGenerator />
          <Campaigns />
          <Comparison />
          <Testimonials />
          <Faq />
        </main>
        <Footer />
        <ChatBot />
      </div>
    </div>
  );
};

export default App;