import React, { useContext, useState } from 'react';
import { CmsContext } from '../../context/CmsContext';
import { AiGenerateButton } from './AiGenerateButton';
import { v4 as uuidv4 } from 'uuid';

const ServicesSettings: React.FC = () => {
    const { content, updateContent } = useContext(CmsContext);
    const [formData, setFormData] = useState(content.services);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleAiText = (field: 'title' | 'subtitle', text: string) => {
        setFormData(prev => ({ ...prev, [field]: text }));
    };

    const handleCardChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const { name, value } = e.target;
        const newCards = [...formData.cards];
        newCards[index] = { ...newCards[index], [name]: value };
        setFormData(prev => ({ ...prev, cards: newCards }));
    };
    
    const handleCardAiText = (index: number, field: 'title' | 'description', text: string) => {
        const newCards = [...formData.cards];
        newCards[index] = { ...newCards[index], [field]: text };
        setFormData(prev => ({ ...prev, cards: newCards }));
    };
    
    // Key Technologies CRUD
    const handleTechChange = (index: number, value: string) => {
        const newTechs = [...formData.keyTechnologies];
        newTechs[index].name = value;
        setFormData(prev => ({...prev, keyTechnologies: newTechs}));
    };

    const addTech = () => {
        const newTech = { id: uuidv4(), name: 'New Technology' };
        setFormData(prev => ({ ...prev, keyTechnologies: [...prev.keyTechnologies, newTech] }));
    };
    
    const removeTech = (id: string) => {
        setFormData(prev => ({...prev, keyTechnologies: prev.keyTechnologies.filter(t => t.id !== id)}));
    };

    const handleSave = () => {
        updateContent({ ...content, services: formData });
        alert('Services settings saved!');
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Services Settings</h2>

            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">Section Header</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                        <div className="flex items-center gap-2">
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                        />
                        <AiGenerateButton onTextGenerated={(text) => handleAiText('title', text)} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Subtitle</label>
                        <div className="flex items-center gap-2">
                        <input
                            type="text"
                            name="subtitle"
                            value={formData.subtitle}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                        />
                         <AiGenerateButton onTextGenerated={(text) => handleAiText('subtitle', text)} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-xl font-semibold text-cyan-400">Service Cards</h3>
                {formData.cards.map((card, index) => (
                    <div key={card.id} className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                        <h4 className="text-lg font-medium text-white mb-4">Card {index + 1}</h4>
                        <div className="space-y-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Card Title</label>
                                <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    name="title"
                                    value={card.title}
                                    onChange={(e) => handleCardChange(e, index)}
                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                                />
                                <AiGenerateButton onTextGenerated={(text) => handleCardAiText(index, 'title', text)} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Card Description</label>
                                <div className="flex items-center gap-2">
                                <textarea
                                    name="description"
                                    value={card.description}
                                    onChange={(e) => handleCardChange(e, index)}
                                    rows={3}
                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                                />
                                <AiGenerateButton 
                                    promptHint={`e.g., Write a short description for a service called "${card.title}"`}
                                    onTextGenerated={(text) => handleCardAiText(index, 'description', text)} 
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-cyan-400">Key Technologies</h3>
                    <button onClick={addTech} className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-md text-sm font-semibold hover:bg-cyan-500/40">Add Technology</button>
                </div>
                <div className="space-y-2">
                    {formData.keyTechnologies.map((tech, index) => (
                        <div key={tech.id} className="flex items-center gap-2">
                             <input
                                type="text"
                                value={tech.name}
                                onChange={(e) => handleTechChange(index, e.target.value)}
                                className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                            />
                            <button onClick={() => removeTech(tech.id)} className="text-red-500 hover:text-red-400 text-sm font-semibold">Remove</button>
                        </div>
                    ))}
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

export default ServicesSettings;
