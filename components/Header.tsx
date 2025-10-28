
import React from 'react';

const GlitchText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="relative inline-block glitch-text">
      <span className="glitch-base">{children}</span>
    </div>
  );
  

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 py-4 px-4 md:px-8 bg-[#01010c]/80 backdrop-blur-sm border-b border-gray-800/50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold tracking-widest text-white">
          <GlitchText>FAIRGO</GlitchText>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          {['Services', 'Pricing', 'Projects', 'Blog', 'About', 'Contact'].map((item) => (
            <a key={item} href="#" className="animated-underline text-gray-400 hover:text-white transition-colors duration-300">{item}</a>
          ))}
        </nav>
        <a href="#" className="border border-gray-600 text-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition-all duration-300 text-sm transform hover:scale-105 hover:-translate-y-0.5">
          Get Template
        </a>
      </div>
    </header>
  );
};