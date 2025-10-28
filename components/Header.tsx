import React from 'react';
// The local image asset is correctly imported here
import logoImage from '../assets/Fairgo_logo_withouticons.png';

// REMOVED: The const logoBase64 variable has been removed entirely.

export const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 py-3 px-4 md:px-8 bg-[#01010c]/80 backdrop-blur-sm border-b border-gray-800/50">
            <div className="container mx-auto flex justify-between items-center">
                {/* UPDATED: The 'src' attribute now uses the imported 'logoImage' variable 
                  instead of the old 'logoBase64' variable.
                */}
                <img src={logoImage} alt="FAIRGO Logo" className="h-6 w-auto" />
                <nav className="hidden md:flex items-center space-x-8">
                    {['Services', 'Pricing', 'Projects', 'Blog', 'About', 'Contact'].map((item) => (
                        <a key={item} href="#" className="animated-underline text-gray-400 hover:text-white transition-colors duration-300">{item}</a>
                    ))}
                </nav>
            </div>
        </header>
    );
};