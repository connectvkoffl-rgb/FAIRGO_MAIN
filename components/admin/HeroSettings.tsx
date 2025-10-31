import React, { useContext, useState } from 'react';
import { CmsContext } from '../../context/CmsContext';
import { AiGenerateButton } from './AiGenerateButton';

const HeroSettings: React.FC = () => {
    const { content, updateContent } = useContext(CmsContext);
    const [formData, setFormData] = useState(content.hero);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAiText = (field: 'tagline' | 'titleLine1', text: string) => {
        setFormData(prev => ({ ...prev, [field]: text }));
    };
    
    // CRUD for typing phrases
    const handlePhraseChange = (index: number, value: string) => {
        const newPhrases = [...formData.typingPhrases];
        newPhrases[index] = value;
        setFormData(prev => ({ ...prev, typingPhrases: newPhrases }));
    };

    const addPhrase = () => {
        setFormData(prev => ({ ...prev, typingPhrases: [...prev.typingPhrases, 'New Phrase'] }));
    };

    const removePhrase = (index: number) => {
        setFormData(prev => ({ ...prev, typingPhrases: prev.typingPhrases.filter((_, i) => i !== index) }));
    };
    
    const handleAiTypingPhrases = (text: string) => {
        // AI often returns numbered or bulleted lists, so we clean that up.
        const cleanedPhrases = text.split('\n').map(p => p.replace(/^(\d+\.|-|\*)\s*/, '').trim()).filter(Boolean);
        setFormData(prev => ({ ...prev, typingPhrases: cleanedPhrases }));
    };

    const handleSave = () => {
        updateContent({ ...content, hero: formData });
        alert('Hero settings saved!');
    };
    
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Hero Section Settings</h2>

            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Tagline</label>
                        <div className="flex items-center gap-2">
                        <input
                            type="text"
                            name="tagline"
                            value={formData.tagline}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                        />
                         <AiGenerateButton
                            promptHint="e.g., Generate a catchy tagline for a voice AI company"
                            onTextGenerated={(text) => handleAiText('tagline', text)}
                         />
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Title (First Line)</label>
                         <div className="flex items-center gap-2">
                        <input
                            type="text"
                            name="titleLine1"
                            value={formData.titleLine1}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                        />
                         <AiGenerateButton
                            promptHint="e.g., Write an inspiring first line for a hero section about AI automation."
                            onTextGenerated={(text) => handleAiText('titleLine1', text)}
                        />
                        </div>
                    </div>
                     <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-medium text-gray-400">Typing Effect Phrases</label>
                            <AiGenerateButton
                                 promptHint="e.g., Generate 3 short, punchy phrases about AI, separated by new lines."
                                 onTextGenerated={handleAiTypingPhrases}
                            />
                        </div>
                        <div className="space-y-2">
                            {formData.typingPhrases.map((phrase, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={phrase}
                                        onChange={(e) => handlePhraseChange(index, e.target.value)}
                                        className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                                    />
                                    <button onClick={() => removePhrase(index)} className="text-red-500 hover:text-red-400 text-sm font-semibold">
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button onClick={addPhrase} className="mt-2 text-sm text-cyan-400 hover:text-cyan-300 font-semibold">
                           + Add Phrase
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-300 transition-colors"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default HeroSettings;