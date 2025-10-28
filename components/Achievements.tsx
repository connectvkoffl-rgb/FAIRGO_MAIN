
import React from 'react';

const HighlightedText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="relative inline-block mx-2">
        <span className="relative text-white font-bold">{children}</span>
        <span className="absolute -inset-2 border border-gray-600 rounded-md"></span>
    </span>
);

export const Achievements: React.FC = () => {
    return (
        <section className="py-24 px-4 text-center">
             <div className="container mx-auto">
                 <p className="max-w-4xl mx-auto text-3xl md:text-4xl leading-tight font-light text-gray-300">
                    "We've delivered <HighlightedText>120+ automation projects</HighlightedText>, boosted client revenue by over <HighlightedText>$8.5M</HighlightedText>, and saved teams thousands of hours. The best part? <HighlightedText>It keeps scaling</HighlightedText> effortlessly."
                </p>
             </div>
        </section>
    );
};
