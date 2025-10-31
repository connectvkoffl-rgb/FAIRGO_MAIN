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

const CLISpinner: React.FC = () => {
    const chars = ['|', '/', '-', '\\'];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % chars.length);
        }, 150);
        return () => clearInterval(interval);
    }, []);

    return <span className="inline-block w-3 text-center text-cyan-400">{chars[index]}</span>;
};


const VoiceAIInitializationCLI: React.FC = () => {
    const services = [
        "Speech-to-Text", "NLP-Engine", "Text-to-Speech",
        "State-Manager", "API-Connector", "Logging-Service", "Auth-Service"
    ];
    
    const [outputLines, setOutputLines] = useState<React.ReactNode[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [outputLines]);

    useEffect(() => {
        let timeouts: ReturnType<typeof setTimeout>[] = [];
        
        const runSequence = () => {
            setOutputLines([]);
            setIsComplete(false);

            const addLine = (content: React.ReactNode, delay: number): Promise<void> => {
                return new Promise(resolve => {
                    timeouts.push(setTimeout(() => {
                        setOutputLines(prev => [...prev, content]);
                        resolve();
                    }, delay));
                });
            };

            const updateLastLine = (content: React.ReactNode, delay: number): Promise<void> => {
                return new Promise(resolve => {
                     timeouts.push(setTimeout(() => {
                        setOutputLines(prev => {
                            const newLines = [...prev];
                            newLines[newLines.length - 1] = content;
                            return newLines;
                        });
                        resolve();
                    }, delay));
                });
            };

            let cumulativeDelay = 0;

            const schedule = (task: () => Promise<any>, delay: number) => {
                cumulativeDelay += delay;
                return new Promise(resolve => timeouts.push(setTimeout(() => task().then(resolve), cumulativeDelay)));
            };

            schedule(() => addLine(
                <span><span className="text-green-400">user@fairgo</span>:<span className="text-blue-400">~</span>$ ./initialize-voice-agent.sh</span>,
                0
            ), 500);
            
            schedule(() => addLine(<span>[INFO] Initializing Voice AI Agent...</span>, 0), 300);

            services.forEach((service, i) => {
                schedule(() => addLine(
                    <div key={`loading-${i}`}>
                        <span>[LOAD] Connecting to {service}... </span>
                        <CLISpinner />
                    </div>, 0
                ), 200);

                schedule(() => updateLastLine(
                    <span key={`ok-${i}`}>[<span className="text-green-400">OK</span>] {service} service connected.</span>, 0
                ), 800);
            });
            
            schedule(() => addLine(<span>[INFO] All 7 microservices loaded successfully.</span>, 0), 300);
            schedule(() => addLine(<span>[CONN] Establishing secure channel to AI IVR...</span>, 0), 300);
            schedule(() => addLine(<span>[<span className="text-green-400">OK</span>] Connection to AI IVR successful.</span>, 0), 800);
            schedule(() => addLine(<span className="font-bold text-cyan-400">[READY] Voice AI Agent is online and operational.</span>, 0), 300);
            
            schedule(() => new Promise(resolve => {
                setIsComplete(true);
                resolve(true);
            }), 0);

            // Schedule restart
            cumulativeDelay += 5000;
            timeouts.push(setTimeout(runSequence, cumulativeDelay));
        };
        
        runSequence();

        return () => timeouts.forEach(clearTimeout);
    }, []); // services.length is constant, so empty array is fine

    return (
        <div className="relative bg-[#0D0D0D] border border-gray-800 rounded-lg h-full w-full flex flex-col font-mono text-xs sm:text-sm text-gray-300 overflow-hidden">
            <div className="flex-shrink-0 bg-gray-800/50 p-2.5 flex items-center gap-2 border-b border-gray-700/50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            </div>
            
            <div ref={containerRef} className="flex-grow p-4 overflow-y-auto space-y-1">
                {outputLines.map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
                {isComplete && (
                    <div>
                        <span className="text-green-400">user@fairgo</span>:<span className="text-blue-400">~</span>$ <span className="inline-block w-2 h-4 bg-gray-300 animate-blink"></span>
                    </div>
                )}
            </div>
        </div>
    );
};


export const Features: React.FC = () => {
    return (
        <section id="features" className="py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <AnimatedElement variant="scale"><SectionTitle>Features</SectionTitle></AnimatedElement>
                    <AnimatedElement delay={100}><h2 className="text-4xl md:text-5xl font-bold text-white">All features in one place</h2></AnimatedElement>
                    <AnimatedElement delay={200}><p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Custom AI solutions, built for the bold innovators of tomorrow's world</p></AnimatedElement>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatedElement variant="left" className="md:col-span-1 lg:col-span-1 h-full min-h-[400px] lg:min-h-[530px]">
                        <VoiceAIInitializationCLI />
                    </AnimatedElement>
                    <div className="md:col-span-1 lg:col-span-2 grid grid-rows-2 gap-8">
                        <AnimatedElement delay={100} variant="right">
                            <FeatureCard icon={<SparklesIcon className="w-6 h-6 text-cyan-400" />} title="Voice Operations">
                                Enable customers to interact, book, and get support entirely through voice, creating a truly hands-free experience with AI.
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
                        <FeatureCard icon={<ZapIcon className="w-6 h-6 text-cyan-400" />} title="Lightning Fast">
                             Our AI agents respond in milliseconds, ensuring zero wait time for your customers and instant execution of tasks.
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