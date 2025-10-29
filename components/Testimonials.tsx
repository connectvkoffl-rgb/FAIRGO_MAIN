import React from 'react';
import { AnimatedElement } from './AnimatedElement';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="inline-block px-4 py-1 border border-gray-700 rounded-full text-sm bg-gray-900/50 mb-4">
        {children}
    </div>
);

const testimonials = [
    {
        quote: "Their tools simplified our operations, reduced error, and gave us the clarity we needed to move faster with confidence.",
        name: "jack hanma",
        handle: "@HandBook",
        rating: 4
    },
    {
        quote: "The automation system they built was seamless, smart, and exactly what we needed to scale and work more efficiently.",
        name: "mike tom",
        handle: "@ToogleAI",
        rating: 4
    },
    {
        quote: "Their AI solution helped us automate, focus on growth, saving time and improving productivity instantly.",
        name: "gwen tesse",
        handle: "@StudioFlair",
        rating: 3
    },
    {
        quote: "A transformative partnership. FAIRGO's strategic insights and technical execution are second to none.",
        name: "ellen ripley",
        handle: "@WeylandCorp",
        rating: 5
    },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <svg
                key={i}
                className={`w-5 h-5 ${i < rating ? 'text-white' : 'text-gray-600'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);

const TestimonialCard: React.FC<{ testimonial: typeof testimonials[0] }> = ({ testimonial }) => (
    <div className="relative p-8 bg-[#0A0A14]/50 border border-gray-800/70 rounded-lg backdrop-blur-sm h-full flex flex-col transition-all duration-300 hover:border-gray-700 hover:-translate-y-1">
        {/* Corner Brackets */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-gray-700"></div>
        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-gray-700"></div>
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-gray-700"></div>
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-gray-700"></div>

        <div className="flex-grow">
            <div className="flex justify-between items-center mb-6">
                <span className="font-semibold text-white">{testimonial.handle}</span>
                <StarRating rating={testimonial.rating} />
            </div>
            <p className="text-gray-400 leading-relaxed">{testimonial.quote}</p>
        </div>

        <p className="mt-8 text-gray-500">{testimonial.name}</p>
    </div>
);


export const Testimonials: React.FC = () => {
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <AnimatedElement variant="scale"><SectionTitle>Reviews</SectionTitle></AnimatedElement>
                    <AnimatedElement delay={100}><h2 className="text-4xl md:text-5xl font-bold text-white">What Our Clients Say</h2></AnimatedElement>
                    <AnimatedElement delay={200}><p className="mt-4 text-lg text-gray-400">Join customers who trust AI to transform their business</p></AnimatedElement>
                </div>
                
                <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] group">
                    <div className="flex animate-scroll group-hover:[animation-play-state:paused]">
                        {[...testimonials, ...testimonials].map((testimonial, index) => (
                            <div key={index} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-4">
                                <TestimonialCard testimonial={testimonial} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};