
import React, { useContext } from 'react';
import { AnimatedElement } from './AnimatedElement';
import { PhoneIcon } from './icons';
import { CmsContext } from '../context/CmsContext';
import { Logo } from './Logo';

interface FooterProps {
    onBookCallClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBookCallClick }) => {
    const { content } = useContext(CmsContext);
    const { footer } = content;

    return (
        <footer id="footer" className="py-20 px-4 border-t border-gray-800/50">
            <div className="container mx-auto text-center">
                <AnimatedElement variant="scale">
                    <Logo className="h-14 mx-auto mb-8" src="https://i.ibb.co/8gH1SvD6/Fairgo-logo.png"/>
                </AnimatedElement>
                <AnimatedElement delay={200}>
                    <button 
                        onClick={onBookCallClick}
                        className="inline-flex items-center gap-2 border border-gray-600 text-white px-6 py-3 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:bg-white hover:text-black">
                        <PhoneIcon className="w-5 h-5" />
                        Book A Free Call
                    </button>
                </AnimatedElement>

                <div className="mt-16 flex justify-center items-center flex-wrap gap-x-8 gap-y-4 text-gray-500">
                    {['Services', 'Contact', 'Blogs', 'About', 'Privacy', 'Terms'].map(item => (
                        <a href="#" key={item} className="animated-underline hover:text-white transition-colors">{item}</a>
                    ))}
                     <a href="/#admin" className="animated-underline hover:text-white transition-colors">Admin</a>
                </div>
                <p className="mt-8 text-sm text-gray-600">{footer.copyright}</p>
            </div>
        </footer>
    );
};