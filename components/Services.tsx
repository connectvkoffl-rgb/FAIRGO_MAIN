import React, { useState, useEffect, useRef } from 'react';
import { AnimatedElement } from './AnimatedElement';

const CornerBox: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`relative p-8 bg-gray-900/50 border border-gray-800/70 rounded-lg backdrop-blur-sm h-full transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover-glow ${className}`}>
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gray-600"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gray-600"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gray-600"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gray-600"></div>
        {children}
    </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="inline-block px-4 py-1 border border-gray-700 rounded-full text-sm bg-gray-900/50 mb-4">
        {children}
    </div>
);

const codeSnippet = `// Initialize FAIRGO Agent
const agent = new FairgoAgent({
  apiKey: 'YOUR_API_KEY',
  agentId: 'sales-inquiry-agent-v2'
});

// Define agent's integration points
agent.integrate('crm.salesforce');
agent.integrate('support.zendesk');

// Execute with complex user intent
agent.execute({
  query: 'I need to check order status and log a support ticket.',
  sessionId: 'user-xyz-123',
  context: { orderId: 'ORD-5678' }
});`;

export const Services: React.FC = () => {
    const [animatedCode, setAnimatedCode] = useState('');
    const [startAnimation, setStartAnimation] = useState(false);
    const codeBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStartAnimation(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        const currentRef = codeBoxRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    useEffect(() => {
        if (startAnimation) {
            let i = 0;
            setAnimatedCode('');
            const typingInterval = setInterval(() => {
                if (i < codeSnippet.length) {
                    setAnimatedCode((prev) => prev + codeSnippet.charAt(i));
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 25);
            return () => clearInterval(typingInterval);
        }
    }, [startAnimation]);


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
                        <CornerBox>
                            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExczRnaHhhbzd5cGdncDNscW45OWR5OHI3YWQ4enZ2cHVmd3JjZXQ1aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2yvB6nztgzm5a/giphy.gif" alt="Animation of an AI bot emerging from a mobile phone screen" className="rounded-lg mb-6 opacity-60 h-[252px] w-full object-contain" />
                            <h3 className="text-2xl font-semibold text-white mb-2">Automate Repetitive Tasks</h3>
                            <p className="text-gray-400">Eliminate busywork and let AI handle the routine so your team can focus on what matters.</p>
                        </CornerBox>
                    </AnimatedElement>
                    <AnimatedElement delay={350} variant="right">
                        <div ref={codeBoxRef}>
                            <CornerBox>
                                <div className="bg-black rounded-lg p-4 font-mono text-sm text-green-400 h-[252px] overflow-hidden opacity-80">
                                    <pre>
                                        <code>{animatedCode}</code>
                                        {animatedCode.length < codeSnippet.length && (
                                            <span className="animate-blink">|</span>
                                        )}
                                    </pre>
                                </div>
                                <h3 className="text-2xl font-semibold text-white mb-2 mt-6">Custom AI Agents</h3>
                                <p className="text-gray-400">Tailored, intelligent assistants trained on your business logic to work 24/7 across streamline decisions, and reduce manual input effortlessly.</p>
                            </CornerBox>
                        </div>
                    </AnimatedElement>
                    <AnimatedElement delay={400} variant="left">
                        <CornerBox>
                            <img src="https://picsum.photos/seed/service3/500/300" alt="Consultancy" className="rounded-lg mb-6 opacity-40" />
                            <h3 className="text-2xl font-semibold text-white mb-2">AI Consultancy Services</h3>
                            <p className="text-gray-400">Expert guidance to align technology with your business goals.</p>
                        </CornerBox>
                    </AnimatedElement>
                    <AnimatedElement delay={550} variant="right">
                        <CornerBox>
                             <img src="https://picsum.photos/seed/service4/500/300" alt="Workflows" className="rounded-lg mb-6 opacity-40" />
                            <h3 className="text-2xl font-semibold text-white mb-2">Automated Workflows</h3>
                            <p className="text-gray-400">Design and deploy intelligent systems that operate consistently with zero human oversight.</p>
                        </CornerBox>
                    </AnimatedElement>
                </div>
            </div>
        </section>
    );
};