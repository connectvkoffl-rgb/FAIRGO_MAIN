
import React, { useState } from 'react';
import { AnimatedElement } from './AnimatedElement';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

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

const featuredArticles = [
    {
        image: "https://picsum.photos/seed/article-sales/500/300",
        title: "AI in Sales: Beyond the Hype",
        description: "Discover how AI is revolutionizing sales funnels, from lead qualification to closing deals, with real-world examples."
    },
    {
        image: "https://picsum.photos/seed/article-support/500/300",
        title: "The Future of Customer Support is Here",
        description: "Learn how custom AI agents handle inquiries, resolve issues, and provide 24/7 support, boosting customer satisfaction."
    },
    {
        image: "https://picsum.photos/seed/article-scale/500/300",
        title: "Automating for Scale: A Growth Strategy",
        description: "Explore strategies for implementing automated workflows that eliminate bottlenecks and prepare your business for rapid growth."
    }
];

export const Projects: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prev = () => setCurrentIndex(i => (i === 0 ? featuredArticles.length - 1 : i - 1));
    const next = () => setCurrentIndex(i => (i === featuredArticles.length - 1 ? 0 : i + 1));

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
                                <h3 className="text-2xl font-semibold text-white mb-4">Featured Articles</h3>
                                
                                <div className="relative overflow-hidden h-[300px] md:h-[280px]">
                                    {featuredArticles.map((article, index) => (
                                        <div
                                            key={index}
                                            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                                            style={{ opacity: index === currentIndex ? 1 : 0 }}
                                        >
                                            <img src={article.image} alt={article.title} className="rounded-md mb-4 opacity-60 w-full h-40 object-cover" />
                                            <h4 className="text-xl font-semibold text-white mb-2">{article.title}</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed">{article.description}</p>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="flex justify-between items-center mt-6">
                                    <button onClick={prev} className="bg-gray-800/50 p-2 rounded-full hover:bg-gray-700 transition-colors" aria-label="Previous article">
                                        <ChevronLeftIcon className="w-5 h-5 text-white" />
                                    </button>
                                    <div className="flex justify-center space-x-2">
                                        {featuredArticles.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentIndex(index)}
                                                className={`w-2.5 h-2.5 rounded-full transition-colors ${currentIndex === index ? 'bg-cyan-400' : 'bg-gray-600 hover:bg-gray-400'}`}
                                                aria-label={`Go to article ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                    <button onClick={next} className="bg-gray-800/50 p-2 rounded-full hover:bg-gray-700 transition-colors" aria-label="Next article">
                                        <ChevronRightIcon className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </AnimatedElement>
                </div>
            </div>
        </section>
    );
};
