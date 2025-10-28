import React, { useState, useEffect, useRef } from 'react';
import { generateVideo } from '../services/geminiService';
import { FilmIcon, UploadIcon } from './icons';

// FIX: The original 'declare global' for 'window.aistudio' used an inline object type.
// The error message "Property 'aistudio' must be of type 'AIStudio'" indicates
// that we should define and use a named interface to avoid type conflicts with
// other global declarations of 'window.aistudio'.
declare global {
    interface AIStudio {
        hasSelectedApiKey: () => Promise<boolean>;
        openSelectKey: () => Promise<void>;
    }
    interface Window {
        // FIX: Made 'aistudio' optional to resolve modifier conflict with other global declarations.
        aistudio?: AIStudio;
    }
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="inline-block px-4 py-1 border border-gray-700 rounded-full text-sm bg-gray-900/50 mb-4">
        {children}
    </div>
);

export const VideoGenerator: React.FC = () => {
    const [apiKeySelected, setApiKeySelected] = useState<boolean>(false);
    const [prompt, setPrompt] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMessage, setLoadingMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const checkApiKey = async () => {
            if (window.aistudio) {
                const hasKey = await window.aistudio.hasSelectedApiKey();
                setApiKeySelected(hasKey);
            }
        };
        checkApiKey();
    }, []);
    
    useEffect(() => {
        if (isLoading) {
            const messages = [
                "Warming up the AI director...",
                "Analyzing the uploaded image...",
                "Storyboarding your video concept...",
                "Rendering frames, this may take a few minutes...",
                "Adding final touches...",
            ];
            let messageIndex = 0;
            setLoadingMessage(messages[0]);
            const interval = setInterval(() => {
                messageIndex = (messageIndex + 1) % messages.length;
                setLoadingMessage(messages[messageIndex]);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [isLoading]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                const base64String = (reader.result as string).split(',')[1];
                setImageBase64(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerate = async () => {
        if (!imageBase64 || !imageFile) {
            setError('Please upload an image first.');
            return;
        }
        setIsLoading(true);
        setError('');
        setVideoUrl(null);
        
        try {
            const uri = await generateVideo(prompt, imageBase64, imageFile.type, aspectRatio);
            setLoadingMessage("Fetching your masterpiece...");
            const response = await fetch(`${uri}&key=${process.env.API_KEY}`);
             if (!response.ok) {
                 const errorBody = await response.text();
                 console.error("Fetch error:", errorBody);
                 throw new Error(`Failed to fetch video: ${response.statusText}`);
            }
            const videoBlob = await response.blob();
            const url = URL.createObjectURL(videoBlob);
            setVideoUrl(url);
        } catch (err: any) {
            console.error(err);
             if (err.message && err.message.includes("Requested entity was not found")) {
                setError("API Key not found or invalid. Please select your API key again.");
                setApiKeySelected(false);
            } else {
                setError('Failed to generate video. Please check the console and try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    const renderContent = () => {
        if (!apiKeySelected) {
            return (
                <div className="text-center p-8 bg-gray-900/50 border border-gray-800 rounded-lg">
                    <h3 className="text-2xl font-semibold mb-4 text-white">API Key Required for Video Generation</h3>
                    <p className="text-gray-400 mb-6">The Veo video model requires you to use your own Google AI API key. Please select a key to continue.</p>
                    <button
                        onClick={async () => {
                            if (window.aistudio) {
                                await window.aistudio.openSelectKey();
                                setApiKeySelected(true); // Assume success to avoid race condition
                            }
                        }}
                        className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors"
                    >
                        Select API Key
                    </button>
                    <p className="text-xs text-gray-500 mt-4">For more information, see the <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400">billing documentation</a>.</p>
                </div>
            );
        }

        return (
            <>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full h-32 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
                            disabled={isLoading}
                        >
                            <UploadIcon className="w-8 h-8 mb-2"/>
                            <span>{imageFile ? `Selected: ${imageFile.name}` : 'Click to upload starting image'}</span>
                        </button>
                        {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 rounded-lg w-full max-h-48 object-contain"/>}
                    </div>
                    <div className="space-y-4">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe the video you want to create... (optional)"
                            className="w-full h-32 bg-gray-900/50 border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none"
                            disabled={isLoading}
                        />
                         <div>
                            <span className="text-gray-400 mb-2 block">Aspect Ratio:</span>
                             <div className="flex gap-4">
                                <label className={`flex-1 text-center cursor-pointer p-3 rounded-md border ${aspectRatio === '16:9' ? 'bg-cyan-500/20 border-cyan-500 text-white' : 'border-gray-700 bg-gray-900/50 text-gray-400'}`}>
                                    <input type="radio" name="aspectRatio" value="16:9" checked={aspectRatio === '16:9'} onChange={() => setAspectRatio('16:9')} className="sr-only" disabled={isLoading}/>
                                    16:9 (Landscape)
                                </label>
                                <label className={`flex-1 text-center cursor-pointer p-3 rounded-md border ${aspectRatio === '9:16' ? 'bg-cyan-500/20 border-cyan-500 text-white' : 'border-gray-700 bg-gray-900/50 text-gray-400'}`}>
                                    <input type="radio" name="aspectRatio" value="9:16" checked={aspectRatio === '9:16'} onChange={() => setAspectRatio('9:16')} className="sr-only" disabled={isLoading}/>
                                    9:16 (Portrait)
                                </label>
                            </div>
                         </div>
                    </div>
                </div>
                 <div className="text-center mb-8">
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !imageFile}
                        className="flex w-full sm:w-auto mx-auto justify-center items-center gap-2 bg-white text-black px-8 py-4 rounded-md font-semibold hover:bg-gray-200 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        <FilmIcon className="w-6 h-6" />
                        {isLoading ? 'Generating Video...' : 'Generate Video'}
                    </button>
                 </div>
                 {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <div className={`relative w-full bg-gray-900/50 border border-gray-800 rounded-lg flex items-center justify-center overflow-hidden ${aspectRatio === '16:9' ? 'aspect-video' : 'aspect-[9/16] max-h-[70vh] mx-auto'}`}>
                        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gray-600"></div>
                        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gray-600"></div>
                        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gray-600"></div>
                        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gray-600"></div>
                        
                        {isLoading && (
                            <div className="text-center p-4">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
                                <p className="mt-4 text-gray-300 font-semibold">{loadingMessage}</p>
                                <p className="text-sm text-gray-500">Video generation can take several minutes.</p>
                            </div>
                        )}
                        {videoUrl && !isLoading && (
                            <video src={videoUrl} controls autoPlay loop className="w-full h-full object-contain" />
                        )}
                        {!videoUrl && !isLoading && (
                            <p className="text-gray-500">Your generated video will appear here.</p>
                        )}
                </div>
            </>
        );
    };

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <SectionTitle>AI Video Studio</SectionTitle>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">Bring Your Images to Life</h2>
                    <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Upload a starting image and watch as our AI transforms it into a dynamic video clip.</p>
                </div>

                <div className="max-w-4xl mx-auto">
                   {renderContent()}
                </div>
            </div>
        </section>
    );
};