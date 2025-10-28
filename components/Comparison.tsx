
import React from 'react';
import { PlusIcon } from './icons';
import { AnimatedElement } from './AnimatedElement';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="inline-block px-4 py-1 border border-gray-700 rounded-full text-sm bg-gray-900/50 mb-4">
        {children}
    </div>
);

const fairgoPoints = [
    "Tailored AI solutions",
    "Clear communication",
    "Fast delivery",
    "Impact-driven builds",
    "Strategy-first automation",
    "Ongoing support"
];

const othersPoints = [
    "Generic tools",
    "Limited Communication",
    "Unclear process",
    "No long-term vision",
    "No follow-up"
];

const ComparisonColumn: React.FC<{ title: string, points: string[] }> = ({ title, points }) => (
     <div className="relative p-8 bg-gray-900/50 border border-gray-800/70 rounded-lg backdrop-blur-sm h-full transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover-glow">
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gray-600"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gray-600"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gray-600"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gray-600"></div>
        <h3 className="text-3xl font-bold text-white mb-6 pb-4 border-b border-gray-800">{title}</h3>
        <ul className="space-y-4">
            {points.map((point, index) => (
                <AnimatedElement as="li" key={point} delay={index * 100} className="flex items-center gap-3 group">
                    <PlusIcon className="w-5 h-5 text-cyan-400 transition-transform duration-300 group-hover:rotate-90" />
                    <span className="text-gray-300">{point}</span>
                </AnimatedElement>
            ))}
        </ul>
    </div>
);

export const Comparison: React.FC = () => {
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <AnimatedElement variant="scale"><SectionTitle>Comparison</SectionTitle></AnimatedElement>
                    <AnimatedElement delay={100}><h2 className="text-4xl md:text-5xl font-bold text-white">Precision vs Guesswork</h2></AnimatedElement>
                    <AnimatedElement delay={200}><p className="mt-4 text-lg text-gray-400">See how we stack up against others in clarity, speed, and quality</p></AnimatedElement>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <AnimatedElement delay={300} variant="left"><ComparisonColumn title="FAIRGO" points={fairgoPoints} /></AnimatedElement>
                    <AnimatedElement delay={450} variant="right"><ComparisonColumn title="Others" points={othersPoints} /></AnimatedElement>
                </div>
            </div>
        </section>
    );
};