import React, { useState } from 'react';
import { MagicWandIcon, CloseIcon } from '../icons';
import { generateText } from '../../services/puterService';

interface AiGenerateButtonProps {
    onTextGenerated: (text: string) => void;
    promptHint?: string;
}

export const AiGenerateButton: React.FC<AiGenerateButtonProps> = ({ onTextGenerated, promptHint }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [generatedText, setGeneratedText] = useState('');
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!prompt) return;
        setIsLoading(true);
        setError('');
        setGeneratedText('');
        try {
            const result = await generateText(prompt);
            setGeneratedText(result);
        } catch (err: any) {
            setError(err.message || "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleUseText = () => {
        onTextGenerated(generatedText);
        closeModal();
    };

    const openModal = () => {
        setPrompt('');
        setGeneratedText('');
        setError('');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button
                onClick={openModal}
                className="p-2 bg-gray-700 rounded-md hover:bg-cyan-500/30 text-gray-300 hover:text-cyan-400 transition-colors"
                title="Generate with AI"
            >
                <MagicWandIcon className="w-5 h-5" />
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="relative w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-white">Generate Content with AI</h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-white">
                                <CloseIcon className="w-6 h-6" />
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Your Prompt</label>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder={promptHint || "e.g., Write a short, professional description for an AI service..."}
                                rows={3}
                                className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="text-center">
                            <button
                                onClick={handleGenerate}
                                disabled={isLoading || !prompt}
                                className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-300 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Generating...' : 'Generate'}
                            </button>
                        </div>
                        
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        
                        {generatedText && (
                             <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Generated Text</label>
                                <textarea
                                    value={generatedText}
                                    onChange={(e) => setGeneratedText(e.target.value)}
                                    rows={6}
                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                                />
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={handleUseText}
                                        className="bg-cyan-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-cyan-500 transition-colors"
                                    >
                                        Use This Text
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};