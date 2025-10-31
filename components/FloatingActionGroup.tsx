import React, { useState } from 'react';
import { AIIcon, ChatBubbleIcon, CloseIcon } from './icons';

export const FloatingActionGroup: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleChatClick = () => {
        document.getElementById('chat-open-button')?.click();
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-20 right-4 z-50 md:hidden">
            <div className="relative flex flex-col items-center gap-3">
                {isOpen && (
                    <div className="relative flex flex-col items-center gap-3 animate-fade-in-up">
                        <button
                            onClick={handleChatClick}
                            className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform"
                            aria-label="Open Chat"
                        >
                            <ChatBubbleIcon className="w-6 h-6" />
                        </button>
                    </div>
                )}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-cyan-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300"
                    aria-label="Open Actions Menu"
                >
                    <div className="relative w-7 h-7 flex items-center justify-center">
                        <CloseIcon className={`absolute transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
                        <AIIcon className={`absolute transition-all duration-300 ${isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                    </div>
                </button>
            </div>
        </div>
    );
};