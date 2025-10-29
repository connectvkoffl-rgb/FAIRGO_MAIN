import React from 'react';
import { AnimatedElement } from './AnimatedElement';
import { PhoneIcon } from './icons';

export const Footer: React.FC = () => {
    return (
        <footer className="py-20 px-4 border-t border-gray-800/50">
            <div className="container mx-auto text-center">
                <AnimatedElement variant="scale">
                    <img src="../assets/Fairgo_logo.png" alt="FAIRGO Logo" className="h-12 w-auto mx-auto mb-4" />
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