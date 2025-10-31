import React, { useContext } from 'react';
import { CmsContext } from '../context/CmsContext';
import { AnimatedElement } from './AnimatedElement';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="inline-block px-4 py-1 border border-gray-700 rounded-full text-sm bg-gray-900/50 mb-4">
        {children}
    </div>
);

export const Blog: React.FC = () => {
    const { content } = useContext(CmsContext);
    const { blog } = content;

    return (
        <section id="blog" className="py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <AnimatedElement variant="scale"><SectionTitle>Blog</SectionTitle></AnimatedElement>
                    <AnimatedElement delay={100}><h2 className="text-4xl md:text-5xl font-bold text-white">{blog.title}</h2></AnimatedElement>
                    <AnimatedElement delay={200}><p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">{blog.subtitle}</p></AnimatedElement>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blog.posts.map((post, index) => (
                        <AnimatedElement key={post.id} delay={150 * index} variant="up">
                            <div className="group relative p-6 bg-gray-900/50 border border-gray-800/70 rounded-lg backdrop-blur-sm h-full flex flex-col transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 hover-glow">
                                <img src={post.image} alt={post.title} className="rounded-md mb-6 w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <h3 className="text-xl font-semibold text-white mb-3 flex-grow">{post.title}</h3>
                                <p className="text-gray-400 mb-6">{post.excerpt}</p>
                                <a href="#" className="font-semibold text-cyan-400 animated-underline">Read More</a>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
            </div>
        </section>
    );
};