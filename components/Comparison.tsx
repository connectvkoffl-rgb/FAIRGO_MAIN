
import React from 'react';
import { PlusIcon } from './icons';

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
     <div className="relative p-8 bg-gray-900/50 border border-gray-800/70 rounded-lg backdrop-blur-sm">
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gray-600"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gray-600"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gray-600"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gray-600"></div>
        <h3 className="text-3xl font-bold text-white mb-6 pb-4 border-b border-gray-800">{title}</h3>
        <ul className="space-y-4">
            {points.map(point => (
                <li key={point} className="flex items-center gap-3">
                    <PlusIcon className="w-5 h-5 text-cyan-400" />
                    <span className="text-gray-300">{point}</span>
                </li>
            ))}
        </ul>
    </div>
);

export const Comparison: React.FC = () => {
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <SectionTitle>Comparison</SectionTitle>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">Precision vs Guesswork</h2>
                    <p className="mt-4 text-lg text-gray-400">See how we stack up against others in clarity, speed, and quality</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <ComparisonColumn title="FAIRGO" points={fairgoPoints} />
                    <ComparisonColumn title="Others" points={othersPoints} />
                </div>
            </div>
        </section>
    );
};