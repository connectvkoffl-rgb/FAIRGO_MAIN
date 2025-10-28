
import React from 'react';
import { AnimatedElement } from './AnimatedElement';

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
                    "
                    <AnimatedElement as="span" delay={0} className="inline-block">We've delivered </AnimatedElement>
                    <AnimatedElement as="span" delay={100} variant="scale" className="inline-block"><HighlightedText>120+ automation projects</HighlightedText></AnimatedElement>
                    <AnimatedElement as="span" delay={200} className="inline-block">, boosted client revenue by over </AnimatedElement>
                    <AnimatedElement as="span" delay={300} variant="scale" className="inline-block"><HighlightedText>$8.5M</HighlightedText></AnimatedElement>
                    <AnimatedElement as="span" delay={400} className="inline-block">, and saved teams thousands of hours. The best part? </AnimatedElement>
                    <AnimatedElement as="span" delay={500} variant="scale" className="inline-block"><HighlightedText>It keeps scaling</HighlightedText></AnimatedElement>
                    <AnimatedElement as="span" delay={600} className="inline-block"> effortlessly."</AnimatedElement>
                </p>
             </div>
        </section>
    );
};
