
import React from 'react';
import { AnimatedElement } from './AnimatedElement';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="inline-block px-4 py-1 border border-gray-700 rounded-full text-sm bg-gray-900/50 mb-4">
        {children}
    </div>
);

const ProcessStep: React.FC<{ step: number, title: string, description: string, image: string }> = ({ step, title, description, image }) => (
    <div className="flex flex-col items-center text-center h-full">
        <div className="relative w-full h-48 mb-6">
             <img src={image} alt={title} className="rounded-lg object-cover w-full h-full opacity-30 filter grayscale" />
        </div>
        <div className="relative p-6 bg-gray-900/50 border border-gray-800/70 rounded-lg backdrop-blur-sm w-full transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover-glow flex-grow">
            <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-gray-600"></div>
            <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-gray-600"></div>
            <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-gray-600"></div>
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-gray-600"></div>

            <div className="inline-block px-3 py-1 border border-gray-600 rounded-md text-sm mb-4">
                Step {step}
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400">{description}</p>
        </div>
    </div>
);

export const Process: React.FC = () => {
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <AnimatedElement variant="scale"><SectionTitle>Process</SectionTitle></AnimatedElement>
                    <AnimatedElement delay={100}><h2 className="text-4xl md:text-5xl font-bold text-white">Process is Result</h2></AnimatedElement>
                    <AnimatedElement delay={200}><p className="mt-4 text-lg text-gray-400">The real outcome is only as strong as the system behind it.</p></AnimatedElement>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-stretch">
                    <AnimatedElement variant="left">
                        <ProcessStep 
                            step={1}
                            title="Map Accessibility and Define Fair Value"
                            description="Map user needs with omni-channel flows (IVR, SMS). We establish a driver-first Fair Value Proposition with low commissions and guaranteed income to build a motivated and stable fleet."
                            image="https://picsum.photos/seed/map-accessibility/400/300"
                        />
                    </AnimatedElement>
                     <AnimatedElement delay={150} variant="up">
                        <ProcessStep 
                            step={2}
                            title="Deploy AI Dispatch and Omni-Channel Tech"
                            description="Deploy our core AI Dispatch Matcher to optimize rides and minimize deadhead miles. Our AI integrates with all booking channels for a hyper-efficient platform delivering sub-5-minute wait times."
                            image="https://picsum.photos/seed/ai-dispatch/400/300"
                        />
                    </AnimatedElement>
                     <AnimatedElement delay={300} variant="right">
                        <ProcessStep 
                            step={3}
                            title="Optimize Fairness and Scale Ecosystem"
                            description="Activate our AI Bias Prevention Framework and scale the ecosystem with key partners for driver financing and tech advantage, creating a transparent, ethical, and scalable ride-hailing platform."
                            image="https://picsum.photos/seed/ecosystem-scale/400/300"
                        />
                    </AnimatedElement>
                </div>
            </div>
        </section>
    );
};
