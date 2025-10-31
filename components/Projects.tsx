import React, { useState, useContext } from 'react';
import { AnimatedElement } from './AnimatedElement';
import { CmsContext } from '../context/CmsContext';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="inline-block px-4 py-1 border border-gray-700 rounded-full text-sm bg-gray-900/50 mb-4">
        {children}
    </div>
);

const ProjectItem: React.FC<{ name: string, description: string }> = ({ name, description }) => (
    <div className="flex flex-col items-start py-4 border-b border-gray-800 transition-all duration-300 hover:bg-gray-800/50 hover:px-4">
        <span className="text-white font-semibold text-lg">{name}</span>
        <p className="text-gray-400 mt-1 text-sm">{description}</p>
    </div>
);

export const Projects: React.FC = () => {
    const { content } = useContext(CmsContext);
    const { projects: projectsData } = content;

    return (
        <section id="projects" className="py-20 px-4">
            <div className="container mx-auto">
                <div className="max-w-4xl mx-auto">
                    <AnimatedElement variant="left"><SectionTitle>Projects</SectionTitle></AnimatedElement>
                    <AnimatedElement delay={100} variant="left"><h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{projectsData.title}</h2></AnimatedElement>
                    <AnimatedElement delay={200} variant="left"><p className="text-lg text-gray-400 mb-8">{projectsData.subtitle}</p></AnimatedElement>
                    
                    <div className="space-y-2">
                        {projectsData.list.map((p: any, i: number) => (
                            <AnimatedElement key={p.id} delay={300 + i * 100} variant="up">
                                <ProjectItem name={p.name} description={p.description} />
                            </AnimatedElement>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};