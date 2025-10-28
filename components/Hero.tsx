
import React from 'react';
import { PhoneIcon, CodeIcon } from './icons';
import { AnimatedElement } from './AnimatedElement';
import { PulsingCircles } from './PulsingCircles';

// Base64 for the FAIRGO logo image
const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAAGACAMAAACYpjyjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURQAAAP///////////////////1b9moEAAAAFdFJOUwAUGiQEJl223AAAAAlwSFlzAAAXEQAAFxEBqUv+fAAAK2pJREFUeF7t3eGy5LgOAFDbJLL//+VbDtmmdrtZlYIuO8+Z6ZmZ2c2eARERJZi0sC2bERERETGg8/3471c/DkVE/jQAAAAAAAAAAAAAAAAAAAAAAAAAAL/Fv5tERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERTERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERER-ERERERERERERERERERERERERERERERERERERERERERERERERERERERERER-ERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERER-ERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERHIADANA-ERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERER-";

const HighlightedText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="relative inline-block">
        <span className="relative text-white">{children}</span>
        <span className="absolute -inset-1 border border-gray-600 rounded-md"></span>
    </span>
);

export const Hero: React.FC = () => {
  return (
    <section className="py-24 md:py-32 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 z-10">
            <AnimatedElement>
                <div className="inline-block px-4 py-1 border border-gray-700 rounded-full text-sm bg-gray-900/50 mb-6">
                    Introducing World's First AI Calling Technology
                </div>
            </AnimatedElement>
            <AnimatedElement delay={100} variant="scale">
                <div className="relative flex justify-center items-center mb-8 h-24 md:h-36">
                     <PulsingCircles />
                     <div className="relative h-full">
                         <img src={logoBase64} alt="FAIRGO Logo" className="relative h-full w-auto" />
                         <div
                            className="absolute top-0 left-0 w-full h-full bg-contain bg-center bg-no-repeat animate-pulse"
                            style={{
                                backgroundImage: `url(${logoBase64})`,
                                filter: 'blur(8px) drop-shadow(0 0 8px #22d3ee) opacity(0.7)',
                            }}
                        ></div>
                        <div
                            className="absolute top-0 left-0 w-full h-full bg-contain bg-center bg-no-repeat animate-pulse"
                            style={{
                                backgroundImage: `url(${logoBase64})`,
                                filter: 'blur(8px) drop-shadow(0 0 8px #d946ef) opacity(0.7)',
                                animationDelay: '1s'
                            }}
                        ></div>
                    </div>
                </div>
            </AnimatedElement>
            <AnimatedElement delay={200}>
                <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-10">
                    Custom AI solutions, built for the innovators of tomorrow — expertly crafted to seamlessly scale your vision faster than ever
                </p>
            </AnimatedElement>
            <AnimatedElement delay={300}>
                <div className="flex justify-center items-center space-x-4">
                    <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                        <PhoneIcon className="w-5 h-5" />
                        Book A Call
                    </button>
                    <button className="flex items-center gap-2 border border-gray-600 text-white px-6 py-3 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:bg-gray-800">
                        <CodeIcon className="w-5 h-5" />
                        Our Services
                    </button>
                </div>
            </AnimatedElement>
        </div>
        
        <div className="mt-20 max-w-5xl mx-auto text-3xl md:text-4xl leading-tight font-light text-gray-400">
            "
            <span className="inline-block opacity-0 animate-on-visible animate-fade-in-up" style={{ animationDelay: '200ms' }}>We harness </span>
            <HighlightedText><span className="inline-block opacity-0 animate-on-visible animate-fade-in-up" style={{ animationDelay: '400ms' }}>your data</span></HighlightedText>
            <span className="inline-block opacity-0 animate-on-visible animate-fade-in-up" style={{ animationDelay: '600ms' }}>, understand your audience, and </span>
            <HighlightedText><span className="inline-block opacity-0 animate-on-visible animate-fade-in-up" style={{ animationDelay: '800ms' }}>use AI</span></HighlightedText>
            <span className="inline-block opacity-0 animate-on-visible animate-fade-in-up" style={{ animationDelay: '1000ms' }}> to help your brand rise above the noise. The best part? We </span>
            <HighlightedText><span className="inline-block opacity-0 animate-on-visible animate-fade-in-up" style={{ animationDelay: '1200ms' }}>execute</span></HighlightedText>
            <span className="inline-block opacity-0 animate-on-visible animate-fade-in-up" style={{ animationDelay: '1400ms' }}>, too."</span>
        </div>
    </section>
  );
};
