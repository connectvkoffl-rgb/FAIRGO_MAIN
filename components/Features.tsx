
import React from 'react';
import { SparklesIcon, ChartBarIcon, ZapIcon, LightBulbIcon, LinkIcon } from './icons';
import { AnimatedElement } from './AnimatedElement';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="inline-block px-4 py-1 border border-gray-700 rounded-full text-sm bg-gray-900/50 mb-4">
        {children}
    </div>
);

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="relative p-6 bg-gray-900/50 border border-gray-800/70 rounded-lg backdrop-blur-sm h-full transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover-glow">
        <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-gray-600"></div>
        <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-gray-600"></div>
        <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-gray-600"></div>
        <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-gray-600"></div>
        <div className="flex items-center gap-4 text-xl font-semibold text-white mb-3">
            {icon}
            {title}
        </div>
        <p className="text-gray-400">{children}</p>
    </div>
);

export const Features: React.FC = () => {
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <AnimatedElement variant="scale"><SectionTitle>Features</SectionTitle></AnimatedElement>
                    <AnimatedElement delay={100}><h2 className="text-4xl md:text-5xl font-bold text-white">All features in one place</h2></AnimatedElement>
                    <AnimatedElement delay={200}><p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Custom AI solutions, built for the bold innovators of tomorrow's world</p></AnimatedElement>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatedElement variant="left" className="md:col-span-1 lg:col-span-1">
                        <img src="../assets/ai.gif" alt="Hands-Free" className="rounded-lg h-full w-full object-cover opacity-50 filter grayscale contrast-150" />
                    </AnimatedElement>
                    <div className="md:col-span-1 lg:col-span-2 grid grid-rows-2 gap-8">
                        <AnimatedElement delay={100} variant="right">
                            <FeatureCard icon={<SparklesIcon className="w-6 h-6 text-cyan-400" />} title="Hands-Free">
                                Automate repetitive tasks effortlessly, freeing your team to focus on growth, innovation, and big-picture work.
                            </FeatureCard>
                        </AnimatedElement>
                         <AnimatedElement delay={200} variant="right">
                            <FeatureCard icon={<ChartBarIcon className="w-6 h-6 text-cyan-400" />} title="Scalable">
                                Build systems that evolve with your business without extra overhead or constant manual intervention require.
                            </FeatureCard>
                        </AnimatedElement>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mt-8">
                    <AnimatedElement variant="left">
                        <FeatureCard icon={<ZapIcon className="w-6 h-6 text-cyan-400" />} title="Faster Operations">
                            Accelerate workflows and decision-making with real-time AI support for speed and efficiency.
                        </FeatureCard>
                    </AnimatedElement>
                    <AnimatedElement delay={100} variant="up">
                        <FeatureCard icon={<LightBulbIcon className="w-6 h-6 text-cyan-400" />} title="Smarter Decisions">
                            Leverage data-backed insights to optimize every part of your process with clarity and confidence.
                        </FeatureCard>
                    </AnimatedElement>
                    <AnimatedElement delay={200} variant="right">
                        <FeatureCard icon={<LinkIcon className="w-6 h-6 text-cyan-400" />} title="Seamless Integrations">
                            Connect your tools and let automation run across your stack for seamless, efficient, end-to-end workflows.
                        </FeatureCard>
                    </AnimatedElement>
                </div>
            </div>
        </section>
    );
};
