import React, { useState } from 'react';
import { generateText } from '../../services/puterService';

const AiServicesSettings: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!prompt) return;
        setIsLoading(true);
        setError('');
        setOutput('');
        try {
            const result = await generateText(prompt);
            setOutput(result);
        } catch (err: any) {
            setError(err.message || "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">AI Services</h2>
            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">General Text Generation</h3>
                <p className="text-gray-400 mb-4">Use this tool to generate text for any purpose. Enter a prompt and let the AI assist you.</p>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="ai-prompt" className="block text-sm font-medium text-gray-400 mb-1">Your Prompt</label>
                        <textarea
                            id="ai-prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., Write a short poem about space..."
                            rows={4}
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
                            {isLoading ? 'Generating...' : 'Generate Text'}
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {output && (
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Generated Output</label>
                            <div className="p-4 bg-gray-800/30 rounded-md border border-gray-700/50 min-h-[100px]">
                                <pre className="text-white whitespace-pre-wrap font-sans">{output}</pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AiServicesSettings;
