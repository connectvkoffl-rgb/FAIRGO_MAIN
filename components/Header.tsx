import React, { useState, useEffect, useRef } from 'react';
import { MenuIcon, CloseIcon } from './icons';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navContainerRef = useRef<HTMLElement>(null);
  const [highlightStyle, setHighlightStyle] = useState({ top: 0, left: 0, width: 0, height: 0, opacity: 0 });

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);
  
  const handleLinkHover = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const link = event.currentTarget;
    if (navContainerRef.current) {
        // We use offset properties relative to the parent nav container
        setHighlightStyle({
            top: link.offsetTop,
            left: link.offsetLeft,
            width: link.offsetWidth,
            height: link.offsetHeight,
            opacity: 1
        });
    }
  };

  const handleMouseLeave = () => {
    setHighlightStyle(prev => ({ ...prev, opacity: 0 }));
  };


  const navLinks = ['Services', 'Features', 'Pricing', 'Projects', 'AI Tools', 'Blog', 'About', 'Contact'];

  return (
    <>
      <header className="sticky top-0 z-50 py-3 px-4 md:px-8 bg-[#01010c]/80 backdrop-blur-sm border-b border-gray-800/50">
        <div className="container mx-auto flex justify-between items-center">
          <Logo className="h-10" />
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="animated-underline text-gray-400 hover:text-white transition-colors duration-300">{item}</a>
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
      <div 
        className={`fixed inset-0 bg-[#01010c]/90 backdrop-blur-md z-[100] md:hidden flex flex-col transition-opacity duration-500 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)} // Close on overlay click
      >
        <div className="container mx-auto px-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center py-3 border-b border-gray-800/50">
                <Logo className="h-10" />
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-300 hover:text-white"
                    aria-label="Close navigation menu"
                >
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>
            <nav 
              ref={navContainerRef}
              onMouseLeave={handleMouseLeave}
              className="relative flex flex-col items-center justify-center mt-16 space-y-2"
            >
              <div
                className="absolute bg-cyan-900/50 rounded-lg backdrop-blur-sm border border-cyan-500/20 shadow-lg shadow-cyan-500/10 pointer-events-none"
                style={{
                    ...highlightStyle,
                    transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
              />
                {navLinks.map((item, index) => (
                    <a 
                      key={item} 
                      href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
                      onClick={() => setIsMenuOpen(false)} 
                      onMouseEnter={handleLinkHover}
                      className="relative z-10 text-3xl text-gray-300 hover:text-white transition-colors duration-300 py-3 px-6 rounded-lg"
                      style={{
                        animation: isMenuOpen ? `fade-in-left 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards` : 'none',
                        animationDelay: `${100 + index * 50}ms`,
                        opacity: 0
                      }}
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