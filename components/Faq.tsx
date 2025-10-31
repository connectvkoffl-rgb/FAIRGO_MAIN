import React, { useState, useContext } from 'react';
import { PlusIcon, MinusIcon } from './icons';
import { AnimatedElement } from './AnimatedElement';
import { CmsContext } from '../context/CmsContext';

const FaqItem: React.FC<{ item: any, isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => (
    <div className="border-b border-gray-800">
        <button onClick={onClick} className="w-full flex justify-between items-center text-left py-6 px-2 rounded-md transition-colors hover:bg-gray-800/30">
            <span className="text-lg font-medium text-white">{item.question}</span>
            {isOpen ? <MinusIcon className="w-6 h-6 text-gray-400" /> : <PlusIcon className="w-6 h-6 text-gray-400" />}
        </button>
        <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
            <p className="pb-6 px-2 text-gray-400">{item.answer}</p>
        </div>
    </div>
);

export const Faq: React.FC = () => {
    const { content } = useContext(CmsContext);
    const { faq } = content;
    
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 px-4">
            <div className="container mx-auto grid lg:grid-cols-2 gap-12">
                <div>
                    <AnimatedElement variant="left">
                        <div className="inline-block px-4 py-1 border border-gray-700 rounded-full text-sm bg-gray-900/50 mb-4">
                            FAQS
                        </div>
                    </AnimatedElement>
                    <AnimatedElement delay={100} variant="left"><h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{faq.title}</h2></AnimatedElement>
                    <AnimatedElement delay={200} variant="left"><p className="text-lg text-gray-400 mb-8">{faq.subtitle}</p></AnimatedElement>
                </div>
                <div>
                    {faq.questions.map((item: any, index: number) => (
                        <AnimatedElement key={item.id} delay={index * 100} variant="right">
                            <FaqItem
                                item={item}
                                isOpen={openIndex === index}
                                onClick={() => handleToggle(index)}
                            />
                        </AnimatedElement>
                    ))}
                </div>
            </div>
        </section>
    );
};
