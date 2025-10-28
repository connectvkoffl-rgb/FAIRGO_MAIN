
import React, { useState, useEffect, useRef } from 'react';

const CornerBox: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`relative p-8 bg-gray-900/50 border border-gray-800/70 rounded-lg backdrop-blur-sm ${className}`}>
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

const codeSnippet = `function processNumbers(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    // AI logic processing...
  }
}`;

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
                    <SectionTitle>Services</SectionTitle>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">Our AI-Driven Services</h2>
                    <p className="mt-4 text-lg text-gray-400">Leverage AI features that boost performance to your business</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <CornerBox>
                        <img src="https://picsum.photos/seed/service1/500/300" alt="Repetitive Tasks" className="rounded-lg mb-6 opacity-40" />
                        <h3 className="text-2xl font-semibold text-white mb-2">Automate Repetitive Tasks</h3>
                        <p className="text-gray-400">Eliminate busywork and let AI handle the routine so your team can focus on what matters.</p>
                    </CornerBox>
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
                    <CornerBox>
                        <img src="https://picsum.photos/seed/service3/500/300" alt="Consultancy" className="rounded-lg mb-6 opacity-40" />
                        <h3 className="text-2xl font-semibold text-white mb-2">AI Consultancy Services</h3>
                        <p className="text-gray-400">Expert guidance to align technology with your business goals.</p>
                    </CornerBox>
                    <CornerBox>
                         <img src="https://picsum.photos/seed/service4/500/300" alt="Workflows" className="rounded-lg mb-6 opacity-40" />
                        <h3 className="text-2xl font-semibold text-white mb-2">Automated Workflows</h3>
                        <p className="text-gray-400">Design and deploy intelligent systems that operate consistently with zero human oversight.</p>
                    </CornerBox>
                </div>
            </div>
        </section>
    );
};