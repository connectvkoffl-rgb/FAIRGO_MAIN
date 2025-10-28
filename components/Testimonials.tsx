import React, { useState, useEffect, useCallback } from 'react';
import { AnimatedElement } from './AnimatedElement';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="inline-block px-4 py-1 border border-gray-700 rounded-full text-sm bg-gray-900/50 mb-4">
        {children}
    </div>
);

const HighlightedText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="text-white relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-px after:bg-cyan-400">
        {children}
    </span>
);

const testimonials = [
    {
        quote: <>Their <HighlightedText>AI-driven approach</HighlightedText> helped us reach the right audience and grow faster with <HighlightedText>smarter insights</HighlightedText>—streamlining our strategy, improving engagement, and <HighlightedText>delivering results</HighlightedText>.</>,
        image: "https://picsum.photos/seed/person1/400/400",
        name: "Gwen Tesse",
        handle: "@StudioFlair"
    },
    {
        quote: <>We streamlined our entire <HighlightedText>sales process</HighlightedText> using their AI tools—<HighlightedText>boosting speed</HighlightedText>, cutting costs, and seeing real, measurable growth within just a few short weeks of <HighlightedText>successful launch</HighlightedText>.</>,
        image: "https://picsum.photos/seed/person2/400/400",
        name: "Emily Ben",
        handle: "@FlairAI"
    },
    {
        quote: <>Their <HighlightedText>automation</HighlightedText> workflows saved us <HighlightedText>countless hours</HighlightedText>—optimizing operations, reducing errors, and helping our team <HighlightedText>focus</HighlightedText> on what truly matters every single day <HighlightedText>across teams</HighlightedText>.</>,
        image: "https://picsum.photos/seed/person3/400/400",
        name: "Jack Hanna",
        handle: "@HandBook"
    }
];

const TestimonialCard: React.FC<{ testimonial: typeof testimonials[0], reverse?: boolean }> = ({ testimonial, reverse }) => (
    <div className={`perspective-container ${reverse ? 'reverse' : ''}`}>
        <div className={`tilt-card grid md:grid-cols-2 gap-8 items-center ${reverse ? 'md:grid-flow-col-dense' : ''}`}>
            <div className={`relative ${reverse ? 'md:col-start-2' : ''}`}>
                <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 blur-xl"></div>
                <img src={testimonial.image} alt={testimonial.name} className="relative rounded-lg w-full h-auto object-cover filter grayscale" />
            </div>
            <div className={`relative p-8 bg-gray-900/50 border border-gray-800/70 rounded-lg backdrop-blur-sm ${reverse ? 'md:col-start-1' : ''}`}>
                 <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gray-600"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gray-600"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gray-600"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gray-600"></div>
                
                <div className="inline-block px-3 py-1 border border-gray-600 rounded-md text-sm mb-6">
                    Very satisfied
                </div>
                <p className="text-xl md:text-2xl leading-relaxed text-gray-300 mb-6">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                    <div className="text-yellow-400 flex">★★★★★</div>
                    <div className="text-gray-400">{testimonial.handle}</div>
                </div>
            </div>
        </div>
    </div>
);

export const Testimonials: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
        return () => clearInterval(slideInterval);
    }, [nextSlide]);

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <AnimatedElement variant="scale"><SectionTitle>Reviews</SectionTitle></AnimatedElement>
                    <AnimatedElement delay={100}><h2 className="text-4xl md:text-5xl font-bold text-white">What Our Clients Say</h2></AnimatedElement>
                    <AnimatedElement delay={200}><p className="mt-4 text-lg text-gray-400">Join customers who trust AI to transform their business</p></AnimatedElement>
                </div>
                
                <AnimatedElement delay={300} variant="scale">
                    <div className="relative">
                        <div className="overflow-hidden">
                            <div
                                className="flex transition-transform duration-700 ease-in-out"
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                {testimonials.map((testimonial, index) => (
                                    <div key={index} className="w-full flex-shrink-0 px-2 md:px-4">
                                        <TestimonialCard testimonial={testimonial} reverse={index % 2 !== 0} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button 
                            onClick={prevSlide}
                            className="absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2 z-20 bg-gray-800/50 p-2 rounded-full hover:bg-gray-700 transition-colors"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeftIcon className="w-6 h-6 text-white" />
                        </button>
                        <button 
                            onClick={nextSlide}
                            className="absolute top-1/2 -right-4 md:-right-8 -translate-y-1/2 z-20 bg-gray-800/50 p-2 rounded-full hover:bg-gray-700 transition-colors"
                            aria-label="Next testimonial"
                        >
                            <ChevronRightIcon className="w-6 h-6 text-white" />
                        </button>

                        <div className="flex justify-center mt-8 space-x-3">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? 'bg-cyan-400' : 'bg-gray-600 hover:bg-gray-400'}`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </AnimatedElement>
            </div>
        </section>
    );
};
