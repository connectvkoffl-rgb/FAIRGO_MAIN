
import React from 'react';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="inline-block px-4 py-1 border border-gray-700 rounded-full text-sm bg-gray-900/50 mb-4">
        {children}
    </div>
);

const ProjectItem: React.FC<{ name: string, year: number }> = ({ name, year }) => (
    <div className="flex justify-between items-center py-4 border-b border-gray-800">
        <span className="text-white font-medium">{name}</span>
        <span className="text-gray-500">{year}</span>
    </div>
);

export const Projects: React.FC = () => {
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <SectionTitle>Projects</SectionTitle>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Latest Projects</h2>
                        <p className="text-lg text-gray-400 mb-8">See how we turn bold ideas into automated AI solutions carefully crafted to optimize, scale, and deliver measurable results.</p>
                        
                        <div className="space-y-2">
                            <ProjectItem name="ElevenLabs" year={2025} />
                            <ProjectItem name="MedAssist AI" year={2024} />
                            <ProjectItem name="AutoTag Pro" year={2023} />
                        </div>
                    </div>
                    <div className="relative p-1 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg">
                        <div className="relative bg-gray-900/80 p-8 rounded-lg border border-gray-800 backdrop-blur-sm">
                            <img src="https://picsum.photos/seed/project-main/500/300" alt="Sales Workflow Optimization" className="rounded-md mb-6 opacity-60" />
                             <h3 className="text-2xl font-semibold text-white mb-2">Sales Workflow Optimization</h3>
                            <p className="text-gray-400">We automated lead follow-ups and CRM tasks, reducing manual work by 70% and boosting qualified lead conversion rates.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-8 items-center text-center">
                    <div className="col-span-2 md:col-span-3 flex justify-center md:justify-start items-center gap-10 grayscale opacity-50">
                        <span className="text-2xl font-semibold">Asterisk</span>
                        <span className="text-2xl font-semibold">Eooks</span>
                        <span className="text-2xl font-semibold">Opal</span>
                    </div>
                    <div className="border-l border-gray-800 px-4">
                        <p className="text-4xl font-bold text-white">95%</p>
                        <p className="text-gray-500">Client Satisfaction</p>
                    </div>
                    <div className="border-l border-gray-800 px-4">
                        <p className="text-4xl font-bold text-white">10+</p>
                        <p className="text-gray-500">Years of Experience</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
