import React, { useContext } from 'react';
import { CmsContext } from '../context/CmsContext';
import { AnimatedElement } from './AnimatedElement';
import { PhoneIcon } from './icons';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="inline-block px-4 py-1 border border-gray-700 rounded-full text-sm bg-gray-900/50 mb-4">
        {children}
    </div>
);

export const Contact: React.FC = () => {
    const { content } = useContext(CmsContext);
    const { contact } = content;

    return (
        <section id="contact" className="py-20 px-4">
            <div className="container mx-auto text-center">
                <AnimatedElement variant="scale"><SectionTitle>Contact</SectionTitle></AnimatedElement>
                <AnimatedElement delay={100}><h2 className="text-4xl md:text-5xl font-bold text-white">{contact.title}</h2></AnimatedElement>
                <AnimatedElement delay={200}><p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">{contact.subtitle}</p></AnimatedElement>
                
                <AnimatedElement delay={300} variant="up">
                    <div className="mt-12 inline-flex items-center gap-4 p-6 bg-gray-900/50 border border-gray-800/70 rounded-lg backdrop-blur-sm">
                        <PhoneIcon className="w-8 h-8 text-cyan-400" />
                        <div>
                            <span className="text-gray-400">Support Number</span>
                            <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="block text-2xl font-semibold text-white hover:text-cyan-300 transition-colors">
                                {contact.phone}
                            </a>
                        </div>
                    </div>
                </AnimatedElement>
            </div>
        </section>
    );
};