import React, { useState, useEffect } from 'react';
import { HomeIcon, CogIcon, BriefcaseIcon, QuestionMarkCircleIcon } from './icons';

const navItems = [
  { href: '#home', icon: HomeIcon, label: 'Home', sectionId: 'home' },
  { href: '#services', icon: CogIcon, label: 'Services', sectionId: 'services' },
  { href: '#projects', icon: BriefcaseIcon, label: 'Projects', sectionId: 'projects' },
  { href: '#faq', icon: QuestionMarkCircleIcon, label: 'FAQ', sectionId: 'faq' },
];

export const BottomNavBar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'features', 'pricing', 'projects', 'blog', 'testimonials', 'about', 'faq', 'contact'];
      let currentSectionId = '';

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const id of sections) {
        const section = document.getElementById(id);
        if (section) {
          if (scrollPosition >= section.offsetTop) {
            currentSectionId = id;
          }
        }
      }
      
      // A special check for the very bottom of the page
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
          const lastSection = sections[sections.length - 1];
          const lastElement = document.getElementById(lastSection);
          if (lastElement) {
              currentSectionId = lastSection;
          }
      }
      
      // If we are at the very top, it should be home
      if (window.scrollY < 100) {
          currentSectionId = 'home';
      }

      // Map sections without a dedicated icon to a parent icon
      const sectionToIconMap: { [key: string]: string } = {
          'home': 'home',
          'services': 'services',
          'features': 'services',
          'pricing': 'services',
          'projects': 'projects',
          'blog': 'projects',
          'testimonials': 'projects',
          'about': 'faq',
          'faq': 'faq',
          'contact': 'faq',
      }
      
      setActiveSection(sectionToIconMap[currentSectionId] || 'home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#01010c]/80 backdrop-blur-sm border-t border-gray-800/50 z-50 flex justify-around items-center">
      {navItems.map((item) => {
        const isActive = activeSection === item.sectionId;
        const Icon = item.icon;
        
        return (
          <a
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-300 ${isActive ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
};