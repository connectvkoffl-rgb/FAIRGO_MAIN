
import React, { useState, useEffect } from 'react';
import { PhoneIcon, CodeIcon } from './icons';
import { AnimatedElement } from './AnimatedElement';
import { PulsingCircles } from './PulsingCircles';

const TypingEffect: React.FC<{ phrases: string[], className?: string }> = ({ phrases, className }) => {
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayAfterTyping = 2000;

    useEffect(() => {
        const handleTyping = () => {
            const currentPhrase = phrases[phraseIndex];
            if (isDeleting) {
                if (text.length > 0) {
                    setText(current => current.substring(0, current.length - 1));
                } else {
                    setIsDeleting(false);
                    setPhraseIndex(current => (current + 1) % phrases.length);
                }
            } else {
                if (text.length < currentPhrase.length) {
                    setText(current => currentPhrase.substring(0, current.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), delayAfterTyping);
                }
            }
        };

        const timeoutId = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
        return () => clearTimeout(timeoutId);
    }, [text, isDeleting, phraseIndex, phrases]);

    return (
        <span className={`inline-block font-bold text-white ${className}`}>
            {text}
            <span className="animate-blink">_</span>
        </span>
    );
};


export const Hero: React.FC = () => {
  return (
    <section className="py-24 md:py-32 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 z-10">
            <AnimatedElement>
                <div className="inline-block px-4 py-1 border border-gray-700 rounded-full text-sm bg-gray-900/50 mb-8">
                    Introducing World's First AI Calling Technology
                </div>
            </AnimatedElement>
            <AnimatedElement delay={100} variant="scale">
                <div className="relative flex justify-center items-center mb-8 h-24 md:h-36">
                     <PulsingCircles />
                     <div className="relative h-full">
                         <img src="../assets/Fairgo_croped.png" alt="FAIRGO Cropped Logo" className="relative h-full w-auto animate-pulse-glow-core" />
                    </div>
                </div>
            </AnimatedElement>
            
            <div className="mb-10 max-w-5xl mx-auto text-3xl md:text-4xl leading-tight font-light text-gray-400 h-40 md:h-32 flex items-center justify-center">
                <AnimatedElement delay={200} as="p" className="px-4">
                    "We turn your vision into <br />
                    <TypingEffect phrases={['actionable insights', 'measurable growth', 'automated success']} className="text-4xl md:text-5xl" />
                    ."
                </AnimatedElement>
            </div>

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
    </section>
  );
};