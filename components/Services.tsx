
import React, { useState, useEffect, useRef } from 'react';
import { AnimatedElement } from './AnimatedElement';
import { MicrophoneIcon } from './icons';

const tasks = [
    'Cost Management',
    'Payment Reminder',
    'Employee Tracking',
    'Social Media Post',
    'Data Analysis',
    'Report Generation'
];
// Duplicate the list to create a seamless, infinite scrolling effect
const loopedTasks = [...tasks, ...tasks, ...tasks];

const AutomatedTasksCard: React.FC = () => {
    // Start at the beginning of the second (middle) block of tasks
    const [activeIndex, setActiveIndex] = useState(tasks.length);
    const containerRef = useRef<HTMLDivElement>(null);
    // FIX: Corrected the type for the timeout ref. `NodeJS.Timeout` is not available in the browser.
    // `ReturnType<typeof setTimeout>` correctly resolves to `number` in a browser environment.
    // FIX: Explicitly pass `undefined` as the initial value to `useRef` to resolve the "Expected 1 arguments, but got 0" error.
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const isInitialMount = useRef(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveIndex(prevIndex => prevIndex + 1);
        }, 2500); // Change task every 2.5 seconds

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // When we reach the last block, reset to the first block without animation
        if (activeIndex >= tasks.length * 2) {
            timeoutRef.current = setTimeout(() => {
                if (containerRef.current) {
                    containerRef.current.style.transition = 'none';
                }
                // Reset index to the equivalent position in the middle block
                setActiveIndex(tasks.length);
                
                // A tiny delay to allow the DOM to update before re-enabling transitions
                setTimeout(() => {
                    if (containerRef.current) {
                        containerRef.current.style.transition = 'transform 0.7s ease-in-out';
                    }
                }, 50);

            }, 700); // Must match the transition duration
        }
        return () => clearTimeout(timeoutRef.current);
    }, [activeIndex]);

    const cardHeightWithGap = 50 + 12; // h-[50px] + space-y-3
    const containerHeight = 252;
    // Calculate the offset to center the active card in the container
    const centeringOffset = (containerHeight / 2) - (cardHeightWithGap / 2);
    const scrollOffset = centeringOffset - (activeIndex * cardHeightWithGap);

    return (
        <div className="relative p-8 bg-gray-900/50 border border-gray-800/70 rounded-lg backdrop-blur-sm h-full transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover-glow">
            {/* Corner decorators to match other cards */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gray-600"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gray-600"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gray-600"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gray-600"></div>

            {/* Main card content */}
            <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-2">Automate Repetitive Tasks</h3>
                <p className="text-gray-400">Eliminate busywork and let AI handle the routine so your team can focus on what matters.</p>
            </div>

            {/* The visual animation part */}
            <div className="relative w-full h-[252px] bg-black/20 border border-gray-800 rounded-xl p-4 overflow-hidden">
                <div 
                    ref={containerRef}
                    className="relative flex flex-col items-center space-y-3"
                    style={{ 
                        transform: `translateY(${scrollOffset}px)`,
                        transition: 'transform 0.7s ease-in-out'
                    }}
                >
                    {loopedTasks.map((task, index) => {
                        const distance = Math.abs(index - activeIndex);
                        const isActive = distance === 0;

                        let stateClasses = 'transform';
                        let filterStyle = '';

                        if (isActive) {
                            stateClasses += ' scale-[1.1] opacity-100 shadow-lg shadow-cyan-500/10';
                        } else if (distance === 1) {
                            stateClasses += ' opacity-70 scale-100';
                            filterStyle = 'blur(1px)';
                        } else {
                            stateClasses += ' opacity-50 scale-95';
                            filterStyle = 'blur(2px)';
                        }
                        
                        const zIndex = loopedTasks.length - distance;

                        return (
                             <div
                                key={`${task}-${index}`}
                                className={`relative w-full h-[50px] bg-[#01010c] rounded-lg border border-gray-800 p-4 flex items-center justify-between transition-all duration-500 ease-out ${stateClasses}`}
                                style={{ zIndex, filter: filterStyle }}
                            >
                                <span className={`text-sm ${isActive ? 'font-medium text-white' : 'text-gray-400'}`}>
                                    {task}
                                </span>
                                <div className="flex space-x-1">
                                    {[...Array(4)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>)}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="absolute bottom-0 left-1/2 w-px h-[30px] -translate-x-1/2 bg-gray-800" />
                
                <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 w-10 h-10 bg-[#01010c] border border-gray-800 rounded-lg flex items-center justify-center z-50 before:content-['⚙️'] before:text-lg before:drop-shadow-[0_0_5px_rgba(240,240,255,0.3)]" />
            </div>
        </div>
    );
};

const CustomAIAgentsCard: React.FC = () => {
    return (
        <div className="relative p-8 bg-gray-900/50 border border-gray-800/70 rounded-lg backdrop-blur-sm h-full transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover-glow">
            {/* Corner decorators */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gray-600"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gray-600"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gray-600"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gray-600"></div>

            {/* Main card content */}
            <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-2">AI Calling Agents</h3>
                <p className="text-gray-400">Engage customers with real-time, human-like voice conversations powered by our advanced AI.</p>
            </div>

            {/* Animation part */}
            <div className="relative w-full h-[252px] bg-black/20 border border-gray-800 rounded-xl p-4 flex items-center justify-center overflow-hidden">
                <div className="relative flex flex-col items-center">
                    <div className="relative p-6 bg-cyan-500/10 rounded-full mb-6">
                        <div className="absolute -inset-2 rounded-full border border-cyan-500/20 animate-ping"></div>
                        <div className="absolute -inset-4 rounded-full border-2 border-cyan-500/10 animate-ping" style={{ animationDelay: '0.5s' }}></div>
                        <MicrophoneIcon className="relative w-12 h-12 text-cyan-400" />
                    </div>
                    <div className="flex items-end justify-center h-16 gap-1.5 w-40">
                        {[0.3, 0.5, 0.7, 0.9, 1, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6, 0.8, 0.6, 0.4, 0.3, 0.5, 0.7, 0.9, 1, 0.8].map((scale, i) => (
                            <div 
                                key={i}
                                className="w-1.5 bg-cyan-400/50 rounded-full animate-sound-wave" 
                                style={{ 
                                    height: `${scale * 100}%`,
                                    animationDelay: `${i * 80}ms` 
                                }}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AnimatedAIChipIcon: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* Data flow lines */}
            <g stroke="#22d3ee" strokeWidth="1" strokeLinecap="round" strokeDasharray="3 7">
                {/* from core to pins */}
                <path d="M 50 50 L 30 20" className="animate-data-flow" style={{ animationDelay: '0s' }} />
                <path d="M 50 50 L 50 20" className="animate-data-flow" style={{ animationDelay: '0.2s' }} />
                <path d="M 50 50 L 70 20" className="animate-data-flow" style={{ animationDelay: '0.4s' }} />
                <path d="M 50 50 L 30 80" className="animate-data-flow" style={{ animationDelay: '0.6s' }} />
                <path d="M 50 50 L 50 80" className="animate-data-flow" style={{ animationDelay: '0.8s' }} />
                <path d="M 50 50 L 70 80" className="animate-data-flow" style={{ animationDelay: '1.0s' }} />
                <path d="M 50 50 L 20 30" className="animate-data-flow" style={{ animationDelay: '1.2s' }} />
                <path d="M 50 50 L 20 50" className="animate-data-flow" style={{ animationDelay: '1.4s' }} />
                <path d="M 50 50 L 20 70" className="animate-data-flow" style={{ animationDelay: '1.6s' }} />
                <path d="M 50 50 L 80 30" className="animate-data-flow" style={{ animationDelay: '0.3s' }} />
                <path d="M 50 50 L 80 50" className="animate-data-flow" style={{ animationDelay: '0.7s' }} />
                <path d="M 50 50 L 80 70" className="animate-data-flow" style={{ animationDelay: '1.1s' }} />
            </g>

            {/* Main Chip Body */}
            <rect x="20" y="20" width="60" height="60" rx="5" fill="#083344" stroke="#0e7490" strokeWidth="2" />

            {/* Pins */}
            <g fill="#4b5563" stroke="#374151" strokeWidth="0.5">
                {[25, 45, 65].map(x => <rect key={`top-${x}`} x={x} y="15" width="10" height="5" />)}
                {[25, 45, 65].map(x => <rect key={`bottom-${x}`} x={x} y="80" width="10" height="5" />)}
                {[25, 45, 65].map(y => <rect key={`left-${y}`} x="15" y={y} width="5" height="10" />)}
                {[25, 45, 65].map(y => <rect key={`right-${y}`} x="80" y={y} width="5" height="10" />)}
            </g>
            
            {/* Glowing Core */}
            <rect x="38" y="38" width="24" height="24" rx="3" fill="#67e8f9" className="animate-pulse-glow-core" />
            <text x="50" y="56" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="#083344" textAnchor="middle">AI</text>
        </svg>
    );
};


const AIConsultancyCard: React.FC = () => {
    return (
        <div className="relative p-8 bg-gray-900/50 border border-gray-800/70 rounded-lg backdrop-blur-sm h-full transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover-glow">
            {/* Corner decorators */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gray-600"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gray-600"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gray-600"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gray-600"></div>

            <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-2">AI Consultancy Services</h3>
                <p className="text-gray-400">Expert guidance to align technology with your business goals and create a roadmap for success.</p>
            </div>

            <div className="relative w-full h-[252px] bg-black/20 border border-gray-800 rounded-xl p-4 flex items-center justify-center overflow-hidden">
                <AnimatedAIChipIcon className="w-48 h-48" />
            </div>
        </div>
    );
};

const AutomatedWorkflowsCard: React.FC = () => {
    const nodes = [
        { id: 'start', cx: 30, cy: 60, text: 'Input' },
        { id: 'p1', cx: 85, cy: 25, text: 'Analyze' },
        { id: 'p2', cx: 85, cy: 95, text: 'Validate' },
        { id: 'join', cx: 140, cy: 60, text: 'Process' },
        { id: 'end', cx: 195, cy: 60, text: 'Output' },
    ];
    
    const lines = [
        { d: 'M 30 60 C 50 60, 60 25, 85 25', delay: 0 },
        { d: 'M 30 60 C 50 60, 60 95, 85 95', delay: 0.5 },
        { d: 'M 85 25 C 110 25, 120 60, 140 60', delay: 1 },
        { d: 'M 85 95 C 110 95, 120 60, 140 60', delay: 1.5 },
        { d: 'M 140 60 H 195', delay: 2 },
    ];

    return (
        <div className="relative p-8 bg-gray-900/50 border border-gray-800/70 rounded-lg backdrop-blur-sm h-full transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover-glow">
            {/* Corner decorators */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gray-600"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gray-600"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gray-600"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gray-600"></div>

            <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-2">Automated Workflows</h3>
                <p className="text-gray-400">Design and deploy intelligent systems that operate consistently with zero human oversight.</p>
            </div>

            <div className="relative w-full h-[252px] bg-black/20 border border-gray-800 rounded-xl p-4 flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 220 120" className="w-full h-full opacity-90">
                    {/* Static base lines */}
                    <g stroke="#0e7490" strokeWidth="1" fill="none">
                        {lines.map((line, i) => <path key={`base-${i}`} d={line.d} />)}
                    </g>
                    
                    {/* Animated pulse/data flow lines */}
                    <g fill="none" stroke="#67e8f9" strokeWidth="1.5" strokeLinecap="round">
                        {lines.map((line, i) => (
                            <path
                                key={`flow-${i}`}
                                d={line.d}
                                strokeDasharray="5 20"
                                className="animate-workflow-pulse"
                                style={{ animationDelay: `${line.delay}s` }}
                            />
                        ))}
                    </g>

                    {/* Nodes */}
                    <g>
                        {nodes.map((node, i) => (
                             <g key={node.id} className="animate-workflow-node-appear" style={{ animationDelay: `${i * 150}ms`}}>
                                <circle cx={node.cx} cy={node.cy} r="12" fill="#01010c" stroke="#0e7490" strokeWidth="1.5" />
                                <text x={node.cx} y={node.cy + 3} fontFamily="sans-serif" fontSize="6" fill="#9ca3af" textAnchor="middle">
                                    {node.text}
                                </text>
                            </g>
                        ))}
                    </g>
                </svg>
            </div>
        </div>
    );
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="inline-block px-4 py-1 border border-gray-700 rounded-full text-sm bg-gray-900/50 mb-4">
        {children}
    </div>
);

export const Services: React.FC = () => {
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <AnimatedElement variant="scale"><SectionTitle>Services</SectionTitle></AnimatedElement>
                    <AnimatedElement delay={100}><h2 className="text-4xl md:text-5xl font-bold text-white">Our AI-Driven Services</h2></AnimatedElement>
                    <AnimatedElement delay={200}><p className="mt-4 text-lg text-gray-400">Leverage AI features that boost performance to your business</p></AnimatedElement>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <AnimatedElement delay={200} variant="left">
                        <AutomatedTasksCard />
                    </AnimatedElement>
                    <AnimatedElement delay={350} variant="right">
                        <CustomAIAgentsCard />
                    </AnimatedElement>
                    <AnimatedElement delay={400} variant="left">
                        <AIConsultancyCard />
                    </AnimatedElement>
                    <AnimatedElement delay={550} variant="right">
                        <AutomatedWorkflowsCard />
                    </AnimatedElement>
                </div>
            </div>
        </section>
    );
};
