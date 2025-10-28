
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Message } from '../types';
import { startChat, sendMessage } from '../services/geminiService';
import type { Chat } from '@google/genai';
import { ChatBubbleIcon, CloseIcon, SendIcon } from './icons';

export const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'bot', text: 'Hello! How can I help you with FAIRGO services today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const initializeChat = useCallback(() => {
        if (!chatRef.current) {
            chatRef.current = startChat();
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            initializeChat();
        }
    }, [isOpen, initializeChat]);


    const handleSend = async () => {
        if (input.trim() === '' || isLoading || !chatRef.current) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const responseText = await sendMessage(chatRef.current, input);
        
        const botMessage: Message = { sender: 'bot', text: responseText };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-white text-black w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform z-50"
                aria-label="Toggle Chat"
            >
                {isOpen ? <CloseIcon className="w-8 h-8" /> : <ChatBubbleIcon className="w-8 h-8" />}
            </button>

            <div className={`fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-[#0A0A14] border border-gray-700 rounded-lg shadow-2xl flex flex-col transition-all duration-300 ease-in-out z-40 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <div className="p-4 bg-gray-900/50 border-b border-gray-700">
                    <h3 className="font-bold text-white text-lg">FAIRGO Assistant</h3>
                </div>

                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-cyan-600/50 text-white' : 'bg-gray-700/50 text-gray-300'}`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                             <div className="bg-gray-700/50 text-gray-300 p-3 rounded-lg">
                                 <div className="flex items-center space-x-2">
                                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                                 </div>
                             </div>
                         </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-gray-700">
                    <div className="flex items-center bg-gray-800/50 rounded-lg border border-gray-600">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask something..."
                            className="flex-1 bg-transparent px-4 py-2 text-white placeholder-gray-500 focus:outline-none"
                            disabled={isLoading}
                        />
                        <button onClick={handleSend} disabled={isLoading} className="p-2 text-gray-400 hover:text-white disabled:text-gray-600">
                            <SendIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};