import React, { useState, useEffect, useRef, useCallback } from 'react';
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

const CodeMatrixAnimation: React.FC = () => {
    const codeLines = [
        { text: "// Initializing FAIRGO AI core...", style: 'text-gray-500' },
        { text: "import { AutomationEngine } from '@fairgo/ai';", style: 'text-gray-200' },
        { text: "", style: '' },
        { text: "class Workflow {", style: 'text-white' },
        { text: "  constructor(config) {", style: 'text-gray-300' },
        { text: "    this.engine = new AutomationEngine(config);", style: 'text-gray-400' },
        { text: "  }", style: 'text-gray-300' },
        { text: "}", style: 'text-white' },
        { text: "", style: '' },
        { text: "const salesFlow = new Workflow({", style: 'text-white' },
        { text: "  name: 'Lead Nurturing',", style: 'text-gray-400' },
        { text: "  optimize: 'conversion_rate'", style: 'text-gray-400' },
        { text: "});", style: 'text-white' },
        { text: "", style: '' },
        { text: "salesFlow.execute(todaysLeads);", style: 'text-gray-200' },
    ];
    
    const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
    const cursorRef = useRef<HTMLSpanElement>(null);
    const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    const runAnimationSequence = useCallback(() => {
        // Clear any previous timeouts to prevent conflicts
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];

        let cumulativeTime = 500; // Initial delay before starting
        if (cursorRef.current) cursorRef.current.style.opacity = '0';

        // --- Typing Phase ---
        lineRefs.current.forEach((el, index) => {
            if (!el) return;

            // Reset element styles for the new loop
            const line = codeLines[index];
            el.style.width = '0';
            el.style.opacity = '1';
            el.style.transition = ''; // Clear transition for instant opacity change
            el.classList.remove('animate-typing');

            const typingDuration = line.text.length * 40;

            const typeTimeout = setTimeout(() => {
                el.style.animationDuration = `${typingDuration}ms`;
                el.style.animationTimingFunction = `steps(${line.text.length || 1}, end)`;
                el.style.width = `${line.text.length}ch`;
                el.classList.add('animate-typing');
            }, cumulativeTime);

            timeoutsRef.current.push(typeTimeout);
            cumulativeTime += typingDuration + 150; // Pause after each line
        });

        // --- Pause and Reset Phase ---
        const finalPause = 3000; // Pause for 3s after typing is complete

        // Show cursor at the end of typing
        const showCursorTimeout = setTimeout(() => {
            if (cursorRef.current) cursorRef.current.style.opacity = '1';
        }, cumulativeTime);
        timeoutsRef.current.push(showCursorTimeout);

        cumulativeTime += finalPause;

        // Erase lines by fading them out
        const eraseTimeout = setTimeout(() => {
            if (cursorRef.current) cursorRef.current.style.opacity = '0';
            lineRefs.current.forEach((el) => {
                if (el) {
                    el.style.transition = 'opacity 0.5s ease-out';
                    el.style.opacity = '0';
                }
            });
        }, cumulativeTime);
        timeoutsRef.current.push(eraseTimeout);

        cumulativeTime += 500; // Wait for fade-out transition

        // Restart the whole animation sequence
        const restartTimeout = setTimeout(runAnimationSequence, cumulativeTime);
        timeoutsRef.current.push(restartTimeout);
    }, [codeLines]);

    useEffect(() => {
        lineRefs.current = lineRefs.current.slice(0, codeLines.length);
        runAnimationSequence();

        // Cleanup on component unmount
        return () => {
            timeoutsRef.current.forEach(clearTimeout);
        };
    }, [runAnimationSequence, codeLines.length]);


    return (
        <div className="relative bg-[#0D0D0D] border border-gray-800 rounded-lg p-4 h-full w-full font-mono text-xs sm:text-sm text-gray-300 overflow-hidden">
            <div className="absolute top-3.5 left-4 flex space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-700"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gray-700"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gray-700"></div>
            </div>
            
            <div className="relative pt-8 z-10">
                {codeLines.map((item, index) => (
                    <div key={index} className={`flex items-center h-5 ${item.style}`}>
                        <span className="text-gray-600 mr-4 select-none w-6 text-right flex-shrink-0">{index + 1}</span>
                        <div className="flex items-center">
                             <p
                                ref={el => { lineRefs.current[index] = el; }}
                                className="whitespace-pre overflow-hidden"
                                style={{
                                    width: '0',
                                    opacity: '0',
                                }}
                            >
                                {item.text}
                            </p>
                            {index === codeLines.length - 1 && (
                                <span ref={cursorRef} className="animate-blink" style={{ opacity: 0 }}>_</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


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
                    <AnimatedElement variant="left" className="md:col-span-1 lg:col-span-1 h-full min-h-[400px] lg:min-h-[530px]">
                        <CodeMatrixAnimation />
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