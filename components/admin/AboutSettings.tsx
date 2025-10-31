import React, { useContext, useState } from 'react';
import { CmsContext } from '../../context/CmsContext';
import { AboutSection } from '../../types';
import { AiGenerateButton } from './AiGenerateButton';

const AboutSettings: React.FC = () => {
    const { content, updateContent } = useContext(CmsContext);
    const [formData, setFormData] = useState<AboutSection>(content.about);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const handleAiText = (field: 'title' | 'subtitle' | 'description', text: string) => {
        setFormData(prev => ({ ...prev, [field]: text }));
    };

    const handleSave = () => {
        updateContent({ ...content, about: formData });
        alert('About settings saved!');
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">About Section Settings</h2>
            
            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">Content</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                        <div className="flex items-center gap-2">
                           <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                           <AiGenerateButton onTextGenerated={(text) => handleAiText('title', text)} />
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Subtitle</label>
                         <div className="flex items-center gap-2">
                           <input type="text" name="subtitle" value={formData.subtitle} onChange={handleInputChange} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                           <AiGenerateButton onTextGenerated={(text) => handleAiText('subtitle', text)} />
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                         <div className="flex items-center gap-2">
                           <textarea name="description" value={formData.description} onChange={handleInputChange} rows={5} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                           <AiGenerateButton onTextGenerated={(text) => handleAiText('description', text)} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button onClick={handleSave} className="bg-white text-black px-6 py-2 rounded-md font-semibold">Save Changes</button>
            </div>
        </div>
    );
};

export default AboutSettings;
