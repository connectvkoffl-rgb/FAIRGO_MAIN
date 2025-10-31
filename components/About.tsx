import React, { useContext } from 'react';
import { CmsContext } from '../context/CmsContext';
import { AnimatedElement } from './AnimatedElement';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="inline-block px-4 py-1 border border-gray-700 rounded-full text-sm bg-gray-900/50 mb-4">
        {children}
    </div>
);

export const About: React.FC = () => {
    const { content } = useContext(CmsContext);
    const { about } = content;

    return (
        <section id="about" className="py-20 px-4 bg-black/20">
            <div className="container mx-auto text-center">
                <AnimatedElement variant="scale"><SectionTitle>About Us</SectionTitle></AnimatedElement>
                <AnimatedElement delay={100}><h2 className="text-4xl md:text-5xl font-bold text-white">{about.title}</h2></AnimatedElement>
                <AnimatedElement delay={200}>
                    <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">{about.subtitle}</p>
                </AnimatedElement>
                <AnimatedElement delay={300}>
                     <div className="mt-8 max-w-3xl mx-auto p-8 bg-gray-900/50 border border-gray-800/70 rounded-lg backdrop-blur-sm">
                        <p className="text-gray-300 leading-relaxed">{about.description}</p>
                    </div>
                </AnimatedElement>
            </div>
        </section>
    );
};