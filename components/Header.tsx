import React, { useState, useEffect } from 'react';
import { MenuIcon, CloseIcon } from './icons';

const logoBase64 = "../assets/Fairgo_logo_withouticons.png";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // FIX: Corrected typo 'isMenu' to 'isMenuOpen' and completed the logic to
  // prevent scrolling when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const navLinks = ['Services', 'Pricing', 'Projects', 'Blog', 'About', 'Contact'];

  return (
    <>
      <header className="sticky top-0 z-50 py-3 px-4 md:px-8 bg-[#01010c]/80 backdrop-blur-sm border-b border-gray-800/50">
        <div className="container mx-auto flex justify-between items-center">
          <img src={logoBase64} alt="FAIRGO Logo" className="h-8 w-auto" />
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <a key={item} href="#" className="animated-underline text-gray-400 hover:text-white transition-colors duration-300">{item}</a>
            ))}
          </nav>
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#01010c]/90 backdrop-blur-md z-[100] md:hidden flex flex-col transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-800/50">
                <img src={logoBase64} alt="FAIRGO Logo" className="h-8 w-auto" />
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-300 hover:text-white"
                    aria-label="Close navigation menu"
                >
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 space-y-6 h-full -mt-12">
                {navLinks.map((item) => (
                    <a 
                      key={item} 
                      href="#" 
                      onClick={() => setIsMenuOpen(false)} 
                      className="text-2xl text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {item}
                    </a>
                ))}
            </nav>
        </div>
      </div>
    </>
  );
};
