import React from 'react';
import { AnimatedElement } from './AnimatedElement';
import { PhoneIcon } from './icons';
import logoImage from '../assets/Fairgo_logo_withouticons.png';

export const Footer: React.FC = () => {
    return (
        <footer className="py-20 px-4 border-t border-gray-800/50">
            <div className="container mx-auto text-center align-items-center">
                <AnimatedElement variant="scale">
                    {/* FIXED: Added 'mx-auto' (margin-left: auto, margin-right: auto) 
                      and 'block' to the image's className.
                      'block' is necessary for 'mx-auto' to work on an image.
                    */}
                    <img 
                        src={logoImage} 
                        alt="FAIRGO Logo" 
                        className="h-20 mb-4 w-auto block mx-auto" 
                    />
                </AnimatedElement>
                <AnimatedElement delay={100}>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">Advanced AI solutions, designed for future-focused teams and innovators.</p>
                </AnimatedElement>
                <AnimatedElement delay={200}>
                    <button className="inline-flex items-center gap-2 border border-gray-600 text-white px-6 py-3 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:bg-white hover:text-black">
                        <PhoneIcon className="w-5 h-5" />
                        Book A Free Call
                    </button>
                </AnimatedElement>

                <div className="mt-16 flex justify-center items-center flex-wrap gap-x-8 gap-y-4 text-gray-500">
                    {['Services', 'Contact', 'Blogs', 'About', 'Privacy', 'Terms', 'Coming Soon'].map(item => (
                        <a href="#" key={item} className="animated-underline hover:text-white transition-colors">{item}</a>
                    ))}
                </div>
                <p className="mt-8 text-sm text-gray-600">FAIRGO © 2025.</p>
            </div>
        </footer>
    );
};