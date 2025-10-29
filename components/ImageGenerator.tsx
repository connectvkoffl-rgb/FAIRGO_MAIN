
// import React, { useState } from 'react';
// import { generateImage } from '../services/geminiService';
// import { SparklesIcon } from './icons';
// import { AnimatedElement } from './AnimatedElement';

// const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
//     <div className="inline-block px-4 py-1 border border-gray-700 rounded-full text-sm bg-gray-900/50 mb-4">
//         {children}
//     </div>
// );



// export const ImageGenerator: React.FC = () => {
//     const [prompt, setPrompt] = useState<string>('');
//     const [imageUrl, setImageUrl] = useState<string>('');
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string>('');

//     const handleGenerate = async () => {
//         if (!prompt) {
//             setError('Please enter a prompt.');
//             return;
//         }
//         setIsLoading(true);
//         setError('');
//         setImageUrl('');
//         try {
//             const url = await generateImage(prompt);
//             setImageUrl(url);
//         } catch (err) {
//             setError('Failed to generate image. Please try again later.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     export const ImageGenerator: React.FC = () => {
//     const [prompt, setPrompt] = useState<string>('');
//     const [imageUrl, setImageUrl] = useState<string>('');
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string>('');

//     const handleGenerate = async () => {
//         if (!prompt) {
//             setError('Please enter a prompt.');
//             return;
//         }
//         setIsLoading(true);
//         setError('');
//         setImageUrl('');
//         try {
//             const url = await generateImage(prompt);
//             setImageUrl(url);
//         } catch (err) {
//             setError('Failed to generate image. Please try again later.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <section className="py-20 px-4 bg-black/20">
//             <div className="container mx-auto">
//                 <div className="text-center mb-12">
//                     <AnimatedElement variant="scale"><SectionTitle>AI Creations</SectionTitle></AnimatedElement>
//                     <AnimatedElement delay={100} variant="scale"><h2 className="text-4xl md:text-5xl font-bold text-white">Visualize Your AI Concept</h2></AnimatedElement>
//                     <AnimatedElement delay={200}><p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Use our AI to generate a unique, futuristic image based on your ideas.</p></AnimatedElement>
//                 </div>

//                 <div className="max-w-2xl mx-auto">
//                     <AnimatedElement delay={300}>
//                         <div className="flex flex-col sm:flex-row gap-4 mb-8">
//                             <input
//                                 type="text"
//                                 value={prompt}
//                                 onChange={(e) => setPrompt(e.target.value)}
//                                 placeholder="e.g., a robot meditating in a neon jungle"
//                                 className="flex-grow bg-gray-900/50 border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
//                                 disabled={isLoading}
//                             />
//                             <button
//                                 onClick={handleGenerate}
//                                 disabled={isLoading}
//                                 className="flex justify-center items-center gap-2 bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//                             >
//                                 <SparklesIcon className="w-5 h-5" />
//                                 {isLoading ? 'Generating...' : 'Generate'}
//                             </button>
//                         </div>
//                     </AnimatedElement>

//                     {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    
//                     <AnimatedElement delay={400} variant="scale">
//                         <div className="relative aspect-video w-full bg-gray-900/50 border border-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
//                             <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gray-600"></div>
//                             <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gray-600"></div>
//                             <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gray-600"></div>
//                             <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gray-600"></div>
                            
//                             {isLoading && (
//                                 <div className="text-center">
//                                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
//                                     <p className="mt-4 text-gray-400">Conjuring digital art...</p>
//                                 </div>
//                             )}
//                             {imageUrl && !isLoading && (
//                                 <img src={imageUrl} alt="Generated AI art" className="w-full h-full object-contain" />
//                             )}
//                             {!imageUrl && !isLoading && (
//                                 <p className="text-gray-500">Your generated image will appear here.</p>
//                             )}
//                         </div>
//                     </AnimatedElement>
//                 </div>
//             </div>
//         </section>
//     );
// };
