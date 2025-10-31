import React, { useContext } from 'react';
import { CmsContext } from '../context/CmsContext';
import { AnimatedElement } from './AnimatedElement';
import { CheckIcon } from './icons';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="inline-block px-4 py-1 border border-gray-700 rounded-full text-sm bg-gray-900/50 mb-4">
        {children}
    </div>
);

export const Pricing: React.FC = () => {
    const { content } = useContext(CmsContext);
    const { pricing } = content;

    return (
        <section id="pricing" className="py-20 px-4 bg-black/20">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <AnimatedElement variant="scale"><SectionTitle>Pricing</SectionTitle></AnimatedElement>
                    <AnimatedElement delay={100}><h2 className="text-4xl md:text-5xl font-bold text-white">{pricing.title}</h2></AnimatedElement>
                    <AnimatedElement delay={200}><p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">{pricing.subtitle}</p></AnimatedElement>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
                    {pricing.plans.map((plan, index) => (
                        <AnimatedElement key={plan.id} delay={150 * index} variant="up" className="flex">
                            <div className={`relative p-8 w-full flex flex-col bg-gray-900/50 border rounded-lg backdrop-blur-sm transition-all duration-300 hover-glow ${plan.isFeatured ? 'border-cyan-500' : 'border-gray-800/70'}`}>
                                {plan.isFeatured && (
                                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 text-black rounded-full text-sm font-semibold">
                                        Most Popular
                                    </div>
                                )}
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-semibold text-white mb-2">{plan.name}</h3>
                                    <p className="text-gray-400 mb-6">{plan.description}</p>
                                    <div className="mb-8">
                                        <span className="text-5xl font-bold text-white">${plan.price}</span>
                                        <span className="text-gray-500">/{plan.period}</span>
                                    </div>
                                    <ul className="space-y-4">
                                        {plan.features.map(feature => (
                                            <li key={feature} className="flex items-center gap-3">
                                                <CheckIcon className="w-5 h-5 text-cyan-400" />
                                                <span className="text-gray-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button className={`w-full mt-10 py-3 rounded-md font-semibold transition-colors ${plan.isFeatured ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-800/50 text-white hover:bg-gray-700'}`}>
                                    Get Started
                                </button>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
            </div>
        </section>
    );
};