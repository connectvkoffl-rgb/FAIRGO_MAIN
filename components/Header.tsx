import React, { useState } from 'react';
import logoImage from '../assets/Fairgo_logo_withouticons.png';

const MenuIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
);

const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
);

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    const navItems = ['Services', 'Pricing', 'Projects', 'Blog', 'About', 'Contact'];

    return (
        <header className="sticky top-0 z-50 py-3 px-4 md:px-8 bg-[#01010c]/80 backdrop-blur-sm border-b border-gray-800/50">
            <div className="container mx-auto flex justify-between items-center relative">
                
                {/* Logo */}
                <img src={logoImage} alt="FAIRGO Logo" className="h-6 w-auto" />
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <a key={item} href="#" className="animated-underline text-gray-400 hover:text-white transition-colors duration-300">{item}</a>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-400 hover:text-white transition-colors duration-300 z-50"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>

            {/* Mobile Menu Content: Now Full-Width */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full right-0 mt-2 **w-full** **py-4** rounded-none 
                            bg-[#01010c]/80 backdrop-blur-md border-b border-gray-800/50 shadow-2xl 
                            transition-transform duration-300 ease-out transform origin-top-right">
                    <nav className="flex flex-col space-y-2 px-4 md:px-8">
                        {navItems.map((item, index) => {
                            const animationClasses = isMenuOpen 
                                ? 'opacity-100 translate-y-0' 
                                : 'opacity-0 translate-y-2';

                            // Added px-4 to the link for horizontal spacing
                            const baseClasses = 'block text-lg text-gray-200 px-2 py-2 rounded-md text-right hover:bg-gray-800/50 hover:text-white transition-all duration-300 ease-out';
                            
                            const linkClasses = `${baseClasses} ${animationClasses}`;

                            return (
                                <a 
                                    key={item} 
                                    href="#" 
                                    className={linkClasses}
                                    // Staggered Delay
                                    style={{ transitionDelay: `${index * 50}ms` }}
                                    onClick={handleLinkClick}
                                >
                                    {item}
                                </a>
                            );
                        })}
                    </nav>
                </div>
            )}
        </header>
    );
};