
import React from 'react';
import { AnimatedElement } from './AnimatedElement';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="inline-block px-4 py-1 border border-gray-700 rounded-full text-sm bg-gray-900/50 mb-4">
        {children}
    </div>
);

const ProjectItem: React.FC<{ name: string, year: string | number }> = ({ name, year }) => (
    <div className="flex justify-between items-center py-4 border-b border-gray-800 transition-all duration-300 transform hover:bg-gray-800/50 hover:px-4 hover:translate-x-2">
        <span className="text-white font-medium">{name}</span>
        <span className="text-gray-500">{year}</span>
    </div>
);

const projects = [
    { name: "Verben AI", year: "July" },
    { name: "Waxon Services", year: "August" },
    { name: "365CNX", year: "October" },
];

export const Projects: React.FC = () => {
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <AnimatedElement variant="left"><SectionTitle>Projects</SectionTitle></AnimatedElement>
                        <AnimatedElement delay={100} variant="left"><h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Latest Collaborations</h2></AnimatedElement>
                        <AnimatedElement delay={200} variant="left"><p className="text-lg text-gray-400 mb-8">See how we turn bold ideas into automated AI solutions carefully crafted to optimize, scale, and deliver measurable results.</p></AnimatedElement>
                        
                        <div className="space-y-2">
                            {projects.map((p, i) => (
                                <AnimatedElement key={p.name} delay={300 + i * 100} variant="left">
                                    <ProjectItem name={p.name} year={p.year} />
                                </AnimatedElement>
                            ))}
                        </div>
                    </div>
                    <AnimatedElement delay={300} variant="right">
                        <div className="relative p-1 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg">
                            <div className="relative bg-gray-900/80 p-8 rounded-lg border border-gray-800 backdrop-blur-sm transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover-glow">
                                <img src="https://picsum.photos/seed/project-main/500/300" alt="Sales Workflow Optimization" className="rounded-md mb-6 opacity-60" />
                                 <h3 className="text-2xl font-semibold text-white mb-2">Sales Workflow Optimization</h3>
                                <p className="text-gray-400">We automated lead follow-ups and CRM tasks, reducing manual work by 70% and boosting qualified lead conversion rates.</p>
                            </div>
                        </div>
                    </AnimatedElement>
                </div>

                <div className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-8 items-center text-center">
                    <AnimatedElement className="col-span-2 md:col-span-3 flex justify-center md:justify-start items-center gap-10 grayscale opacity-50">
                        {['Asterisk', 'Eooks', 'Opal'].map((logo, i) => (
                             <span key={logo} className="text-2xl font-semibold transition-all duration-300 transform hover:opacity-100 hover:scale-110">{logo}</span>
                        ))}
                    </AnimatedElement>
                    <AnimatedElement delay={100} className="border-l border-gray-800 px-4">
                        <p className="text-4xl font-bold text-white">95%</p>
                        <p className="text-gray-500">Client Satisfaction</p>
                    </AnimatedElement>
                    <AnimatedElement delay={200} className="border-l border-gray-800 px-4">
                        <p className="text-4xl font-bold text-white">10+</p>
                        <p className="text-gray-500">Years of Experience</p>
                    </AnimatedElement>
                </div>
            </div>
        </section>
    );
};
