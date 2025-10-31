import React, { useContext } from 'react';
import { AnimatedElement } from './AnimatedElement';
import { CmsContext } from '../context/CmsContext';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="inline-block px-4 py-1 border border-gray-700 rounded-full text-sm bg-gray-900/50 mb-4">
        {children}
    </div>
);

const IVRDiagram: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
        <style>
            {`
                @keyframes ivr-pulse-circle {
                    0%, 100% { stroke-opacity: 0.4; transform: scale(1); }
                    50% { stroke-opacity: 1; transform: scale(1.05); }
                }
                .ivr-pulse-circle { animation: ivr-pulse-circle 2.5s ease-in-out infinite; transform-origin: center; }
                 @keyframes ivr-flow {
                    from { stroke-dashoffset: 20; }
                    to { stroke-dashoffset: 0; }
                }
                .ivr-flow { animation: ivr-flow 2s linear infinite; }
            `}
        </style>
        <defs>
            <linearGradient id="ivr-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0e7490" />
            </linearGradient>
        </defs>

        {/* Main Phone Icon and Circle */}
        <g className="ivr-pulse-circle" style={{ animationDelay: '0s' }}>
            <circle cx="100" cy="45" r="35" stroke="url(#ivr-grad)" strokeWidth="1.5" fill="rgba(1,1,12,0.5)" />
            <g transform="translate(88, 33) scale(1.2)">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </g>
        
        {/* Connecting Line to IVR Text */}
        <line x1="100" y1="80" x2="100" y2="90" stroke="#0e7490" strokeWidth="1.5" className="ivr-flow" strokeDasharray="3 3"/>
        
        {/* IVR Text */}
        <text x="100" y="105" fontFamily="monospace, sans-serif" fontSize="16" fill="#22d3ee" textAnchor="middle" fontWeight="bold">[ IVR ]</text>
        
        {/* Branching Lines */}
        <path d="M60 120 H 140 M 100 120 V 110" stroke="#0e7490" strokeWidth="1.5" />
        <line x1="70" y1="120" x2="70" y2="130" stroke="#0e7490" strokeWidth="1.5" className="ivr-flow" strokeDasharray="3 3" style={{animationDelay: '0.5s'}}/>
        <line x1="100" y1="120" x2="100" y2="130" stroke="#0e7490" strokeWidth="1.5" className="ivr-flow" strokeDasharray="3 3" style={{animationDelay: '1s'}}/>
        <line x1="130" y1="120" x2="130" y2="130" stroke="#0e7490" strokeWidth="1.5" className="ivr-flow" strokeDasharray="3 3" style={{animationDelay: '1.5s'}}/>
        
        {/* Numbered Options */}
        <g>
            <circle cx="70" cy="145" r="14" className="ivr-pulse-circle" style={{ animationDelay: '0.5s' }} fill="rgba(1,1,12,0.5)" stroke="url(#ivr-grad)" strokeWidth="1.5" />
            <text x="70" y="150" fontFamily="sans-serif" fontSize="12" fill="#e5e7eb" textAnchor="middle" fontWeight="bold">1</text>
        </g>
        <g>
            <circle cx="100" cy="145" r="14" className="ivr-pulse-circle" style={{ animationDelay: '1s' }} fill="rgba(1,1,12,0.5)" stroke="url(#ivr-grad)" strokeWidth="1.5" />
            <text x="100" y="150" fontFamily="sans-serif" fontSize="12" fill="#e5e7eb" textAnchor="middle" fontWeight="bold">2</text>
        </g>
        <g>
            <circle cx="130" cy="145" r="14" className="ivr-pulse-circle" style={{ animationDelay: '1.5s' }} fill="rgba(1,1,12,0.5)" stroke="url(#ivr-grad)" strokeWidth="1.5" />
            <text x="130" y="150" fontFamily="sans-serif" fontSize="12" fill="#e5e7eb" textAnchor="middle" fontWeight="bold">3</text>
        </g>
    </svg>
);

const AIDispatchDiagram: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
        <style>
            {`
                @keyframes ai-dispatch-pulse {
                    0%, 100% { transform: scale(0.95); opacity: 0.8; }
                    50% { transform: scale(1.05); opacity: 1; }
                }
                .ai-dispatch-pulse { animation: ai-dispatch-pulse 3s ease-in-out infinite; transform-origin: center; }
                
                @keyframes ai-dispatch-flow {
                    from { stroke-dashoffset: 25; }
                    to { stroke-dashoffset: 0; }
                }
                .ai-dispatch-flow { animation: ai-dispatch-flow 2.5s linear infinite; }

                @keyframes ai-node-appear {
                    from { opacity: 0; transform: scale(0.5); }
                    to { opacity: 1; transform: scale(1); }
                }
                .ai-node-appear { animation: ai-node-appear 0.8s ease-out forwards; transform-origin: center; opacity: 0; }
            `}
        </style>
        <defs>
            <radialGradient id="ai-core-grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#67e8f9" />
                <stop offset="100%" stopColor="#22d3ee" />
            </radialGradient>
            <filter id="ai-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* Dotted World Map Background */}
        <g opacity="0.1" fill="#0e7490">
            {[...Array(50)].map((_, i) => (
              <circle key={i} cx={Math.random() * 200} cy={Math.random() * 150} r={Math.random() * 1 + 0.5} />
            ))}
        </g>
        
        {/* Central AI Core */}
        <g transform="translate(100, 75)">
             <circle r="18" fill="url(#ai-core-grad)" filter="url(#ai-glow)" className="ai-dispatch-pulse" />
             <text y="4" fontFamily="sans-serif" fontSize="10" fill="#01010c" textAnchor="middle" fontWeight="bold">AI</text>
        </g>

        {/* Nodes and Connecting Lines */}
        <g stroke="#0e7490" strokeWidth="0.5" fill="none">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const r = 60;
                const cx = 100 + r * Math.cos(angle * Math.PI / 180);
                const cy = 75 + r * Math.sin(angle * Math.PI / 180);
                const icons = [
                    '<path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5z M5 17h14" />',
                    '<path d="M12 2a10 10 0 100 20 10 10 0 000-20z M2 12h20 M12 2a15.3 15.3 0 014 18 M12 2a15.3 15.3 0 00-4 18" />',
                    '<path d="M3 12a9 9 0 019-9 9 9 0 019 9v7a2 2 0 01-2 2h-2a2 2 0 01-2-2v-5a2 2 0 00-2-2h-2a2 2 0 00-2 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-7z" />',
                    '<path d="M16 2H8a2 2 0 00-2 2v16a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2z M12 18h.01" />',
                    '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" />',
                    '<path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6 M9 21a1 1 0 100-2 1 1 0 000 2z M20 21a1 1 0 100-2 1 1 0 000 2z" />',
                    '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" />',
                    '<path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z M1 20h22" />'
                ];
                return (
                    <g key={i}>
                        <path
                            d={`M 100 75 Q ${(100 + cx) / 2} ${(75 + cy) / 2}, ${cx} ${cy}`}
                            className="ai-dispatch-flow"
                            strokeDasharray="4 4"
                            style={{ animationDelay: `${i * 0.2}s` }}
                        />
                         <g className="ai-node-appear" style={{ animationDelay: `${i * 150 + 200}ms`}}>
                            <circle cx={cx} cy={cy} r="12" fill="rgba(1,1,12,0.5)" stroke="url(#ivr-grad)" strokeWidth="1" />
                            <g transform={`translate(${cx-8}, ${cy-8}) scale(0.65)`} fill="none" stroke="#67e8f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{__html: icons[i % icons.length]}} />
                         </g>
                    </g>
                );
            })}
        </g>
    </svg>
);

const RideHailingEcosystemDiagram: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
        <style>
            {`
                @keyframes ecosystem-pulse {
                    0%, 100% { transform: scale(0.98); opacity: 0.9; }
                    50% { transform: scale(1.02); opacity: 1; }
                }
                .ecosystem-pulse { animation: ecosystem-pulse 3s ease-in-out infinite; transform-origin: center; }

                @keyframes ecosystem-flow {
                    from { stroke-dashoffset: 25; }
                    to { stroke-dashoffset: 0; }
                }
                .ecosystem-flow { animation: ecosystem-flow 2.5s linear infinite; }

                @keyframes ecosystem-node-appear {
                    from { opacity: 0; transform: scale(0.5); }
                    to { opacity: 1; transform: scale(1); }
                }
                .ecosystem-node-appear { animation: ecosystem-node-appear 0.8s ease-out forwards; transform-origin: center; opacity: 0; }
            `}
        </style>
        <defs>
            <linearGradient id="eco-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0e7490" />
            </linearGradient>
            <filter id="eco-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* Central Taxi Icon */}
        <g transform="translate(100, 75) scale(1.8)" className="ecosystem-pulse" opacity="0.75">
            <g fill="none" stroke="url(#eco-grad)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" filter="url(#eco-glow)">
                {/* Taxi Body */}
                <path d="M 17 11 H 3 C 2.44772 11 2 10.5523 2 10 V 6 C 2 5.44772 2.44772 5 3 5 H 4.5 L 6 3 H 14 L 15.5 5 H 17 C 17.5523 5 18 5.44772 18 6 V 10 C 18 10.5523 17.5523 11 17 11 Z" />
                {/* Wheels */}
                <circle cx="5" cy="11" r="1.5" strokeWidth="0.5" />
                <circle cx="15" cy="11" r="1.5" strokeWidth="0.5" />
                {/* Headlights */}
                <rect x="2.5" y="7.5" width="2" height="1" rx="0.3" fill="url(#eco-grad)" stroke="none" />
                <rect x="15.5" y="7.5" width="2" height="1" rx="0.3" fill="url(#eco-grad)" stroke="none" />
                 {/* Taxi Sign */}
                <rect x="8" y="1.5" width="4" height="1.5" rx="0.3" fill="none" />
                <text x="10" y="2.6" fill="#22d3ee" fontSize="1" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">TAXI</text>
            </g>
        </g>
        
        {/* Nodes and Connecting Lines */}
        <g stroke="#0e7490" strokeWidth="0.5" fill="none">
            {[
                { angle: 30, icon: '<path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>' }, // Users
                { angle: 90, icon: '<path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01"/>' }, // Finance
                { angle: 150, icon: '<path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />' }, // Tech
                { angle: 210, icon: '<path d="M12 1.016v1.984m0 18v-1.984m8.984-8.984h-1.984m-18 0h1.984m12.02-8.485l-1.404 1.404m-11.212 0l1.404-1.404m11.212 11.212l-1.404-1.404m-11.212 0l1.404 1.404M12 4a8 8 0 100 16 8 8 0 000-16z"/>' }, // Scale
                { angle: 270, icon: '<path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>' }, // Ethics
                { angle: 330, icon: '<path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>' }, // Partners
            ].map(({ angle, icon }, i) => {
                const r = 55;
                const cx = 100 + r * Math.cos(angle * Math.PI / 180);
                const cy = 75 + r * Math.sin(angle * Math.PI / 180);
                return (
                    <g key={i}>
                        <path
                            d={`M 100 75 L ${cx} ${cy}`}
                            className="ecosystem-flow"
                            strokeDasharray="4 4"
                            style={{ animationDelay: `${i * 0.2}s` }}
                        />
                         <g className="ecosystem-node-appear" style={{ animationDelay: `${i * 150 + 200}ms`}}>
                            <circle cx={cx} cy={cy} r="12" fill="rgba(1,1,12,0.5)" stroke="url(#eco-grad)" strokeWidth="1" />
                             <g transform={`translate(${cx-8}, ${cy-8}) scale(0.65)`} fill="none" stroke="#67e8f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{__html: icon}} />
                         </g>
                    </g>
                );
            })}
        </g>
    </svg>
);


const ProcessStep: React.FC<{ step: number, title: string, description: string, visual: React.ReactNode }> = ({ step, title, description, visual }) => (
    <div className="flex flex-col items-center text-center h-full">
        <div className="relative w-full h-48 mb-6 flex items-center justify-center p-4">
             {visual}
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
    const { content } = useContext(CmsContext);
    const { process } = content;
    
    const visuals = [
        <IVRDiagram className="w-full h-full opacity-70" />,
        <AIDispatchDiagram className="w-full h-full" />,
        <RideHailingEcosystemDiagram className="w-full h-full" />
    ];

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <AnimatedElement variant="scale"><SectionTitle>Process</SectionTitle></AnimatedElement>
                    <AnimatedElement delay={100}><h2 className="text-4xl md:text-5xl font-bold text-white">{process.title}</h2></AnimatedElement>
                    <AnimatedElement delay={200}><p className="mt-4 text-lg text-gray-400">{process.subtitle}</p></AnimatedElement>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-stretch">
                    {process.steps.map((step: any, index: number) => (
                         <AnimatedElement key={index} delay={index * 150} variant={index === 0 ? 'left' : index === 1 ? 'up' : 'right'}>
                            <ProcessStep 
                                step={index + 1}
                                title={step.title}
                                description={step.description}
                                visual={visuals[index]}
                            />
                        </AnimatedElement>
                    ))}
                </div>
            </div>
        </section>
    );
};