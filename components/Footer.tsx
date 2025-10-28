
import React from 'react';

const GlitchText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="relative inline-block glitch-text">
      <span className="glitch-base">{children}</span>
    </div>
);
  
export const Footer: React.FC = () => {
    return (
        <footer className="py-20 px-4 border-t border-gray-800/50">
            <div className="container mx-auto text-center">
                <div className="text-4xl font-bold tracking-widest text-white mb-4">
                    <GlitchText>FAIRGO</GlitchText>
                </div>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">Advanced AI solutions, designed for future-focused teams and innovators.</p>
                <button className="border border-gray-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-black transition-colors duration-300">
                    Book A Free Call
                </button>

                <div className="mt-16 flex justify-center items-center flex-wrap gap-x-6 gap-y-2 text-gray-500">
                    {['Services', 'Contact', 'Blogs', 'About', 'Privacy', 'Terms', 'Coming Soon'].map(item => (
                        <a href="#" key={item} className="hover:text-white transition-colors">{item}</a>
                    ))}
                </div>
                <p className="mt-8 text-sm text-gray-600">FAIRGO © 2025. Designed by <span className="text-gray-400">Framebase</span></p>
            </div>
        </footer>
    );
};