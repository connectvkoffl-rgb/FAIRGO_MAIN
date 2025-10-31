
import React, { useState, useEffect, useRef, useContext } from 'react';
import { CmsContext } from '../context/CmsContext';
import { generateChatResponse } from '../services/geminiService';
import { ChatBubbleIcon, CloseIcon, PaperAirplaneIcon } from './icons';
import { ChatAgent } from '../types';

type Message = {
    role: 'user' | 'model';
    parts: { text: string }[];
};

export const ChatBot: React.FC = () => {
    const { content } = useContext(CmsContext);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [activeAgent, setActiveAgent] = useState<ChatAgent | null>(null);

    useEffect(() => {
        if (content.chatbot && content.chatbot.defaultAgentId) {
            const agent = content.chatbot.agents.find(a => a.id === content.chatbot.defaultAgentId);
            setActiveAgent(agent || content.chatbot.agents[0] || null);
        }
    }, [content.chatbot]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading || !activeAgent) return;

        const userMessage: Message = { role: 'user', parts: [{ text: input }] };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const history = [...messages, userMessage];
            const response = await generateChatResponse(input, activeAgent, content.chatbot.knowledgeBase, history);
            
            const modelMessage: Message = { role: 'model', parts: [{ text: response.text }] };
            setMessages(prev => [...prev, modelMessage]);

        } catch (error) {
            console.error("Chatbot error:", error);
            const errorMessage: Message = { role: 'model', parts: [{ text: 'Sorry, I encountered an error. Please try again.' }] };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleToggle = () => {
        setIsOpen(!isOpen);
        if (!isOpen && messages.length === 0 && activeAgent) {
             // Start with a greeting if the chat is opened for the first time
            const initialMessage: Message = { role: 'model', parts: [{ text: "Hello! I'm FAIRGO's assistant. How can I help you today?" }] };
            setMessages([initialMessage]);
        }
    };

    return (
        <>
            <button
                id="chat-open-button"
                onClick={handleToggle}
                className="hidden md:flex fixed bottom-5 right-5 w-16 h-16 bg-cyan-500 text-white rounded-full items-center justify-center shadow-lg transform hover:scale-110 transition-transform z-50"
                aria-label="Open chat"
            >
                <ChatBubbleIcon className="w-8 h-8" />
            </button>

            <div className={`fixed bottom-5 right-5 z-[60] w-[calc(100vw-2.5rem)] max-w-sm h-[70vh] max-h-[600px] bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-lg shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                <div className="flex-shrink-0 flex justify-between items-center p-4 border-b border-gray-700">
                    <h3 className="text-lg font-semibold text-white">{activeAgent?.name || 'Chat Assistant'}</h3>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                <div ref={messagesEndRef} className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                                <p className="text-sm whitespace-pre-wrap">{msg.parts[0].text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex justify-start">
                            <div className="max-w-xs px-4 py-2 rounded-lg bg-gray-700 text-gray-200">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex-shrink-0 p-4 border-t border-gray-700">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type a message..."
                            className="flex-grow bg-gray-800 border border-gray-600 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            disabled={isLoading}
                        />
                        <button onClick={handleSend} disabled={isLoading || !input.trim()} className="p-3 bg-cyan-600 text-white rounded-md hover:bg-cyan-500 disabled:bg-gray-500 disabled:cursor-not-allowed">
                            <PaperAirplaneIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
