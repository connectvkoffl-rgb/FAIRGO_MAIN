import React from 'react';
import { AnimatedElement } from './AnimatedElement';

const HighlightedText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="relative inline-block mx-2 animate-flash-loop">
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
                    <AnimatedElement as="span" delay={0} className="inline-block">Break the language barrier at </AnimatedElement>
                    <AnimatedElement as="span" delay={100} variant="up" className="inline-block"><HighlightedText>warp speed</HighlightedText></AnimatedElement>
                    <AnimatedElement as="span" delay={200} className="inline-block">. Deploy cutting-edge, </AnimatedElement>
                    <AnimatedElement as="span" delay={300} variant="up" className="inline-block"><HighlightedText>multilingual voice experiences</HighlightedText></AnimatedElement>
                    <AnimatedElement as="span" delay={400} className="inline-block"> instantly and globally."</AnimatedElement>
                </p>
             </div>
        </section>
    );
};