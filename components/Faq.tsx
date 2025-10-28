
import React, { useState } from 'react';
import { PlusIcon, MinusIcon, BookOpenIcon } from './icons';

const faqData = [
    {
        question: "What services do you offer?",
        answer: "We specialize in AI solutions, including machine learning models, chatbots, predictive analytics, and consulting tailored to your business needs."
    },
    {
        question: "How long does it take to develop an AI solution?",
        answer: "The timeline varies based on complexity, but a typical project can range from 3 to 6 months from discovery to deployment."
    },
    {
        question: "Do I need technical expertise to work with you?",
        answer: "No, our team handles all the technical aspects. We work closely with you to understand your goals and translate them into effective AI solutions."
    },
    {
        question: "Is my data safe when working with your agency?",
        answer: "Absolutely. We adhere to strict data privacy and security protocols to ensure your information is always protected."
    }
];

const FaqItem: React.FC<{ item: typeof faqData[0], isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => (
    <div className="border-b border-gray-800">
        <button onClick={onClick} className="w-full flex justify-between items-center text-left py-6">
            <span className="text-lg font-medium text-white">{item.question}</span>
            {isOpen ? <MinusIcon className="w-6 h-6 text-gray-400" /> : <PlusIcon className="w-6 h-6 text-gray-400" />}
        </button>
        <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
            <p className="pb-6 text-gray-400">{item.answer}</p>
        </div>
    </div>
);

export const Faq: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto grid lg:grid-cols-2 gap-12">
                <div>
                    <div className="inline-block px-4 py-1 border border-gray-700 rounded-full text-sm bg-gray-900/50 mb-4">
                        FAQS
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Your Questions Answered</h2>
                    <p className="text-lg text-gray-400 mb-8">Need help? Find fast answers to common questions, from setup to strategy to automation success.</p>
                     <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors">
                        <BookOpenIcon className="w-5 h-5" />
                        Book A Call
                    </button>
                </div>
                <div>
                    {faqData.map((item, index) => (
                        <FaqItem
                            key={index}
                            item={item}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
