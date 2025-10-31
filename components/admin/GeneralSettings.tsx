import React, { useContext, useState } from 'react';
import { CmsContext } from '../../context/CmsContext';
import { CmsContent } from '../../types';
import { AiGenerateButton } from './AiGenerateButton';

const GeneralSettings: React.FC = () => {
    const { content, updateContent } = useContext(CmsContext);
    const [formData, setFormData] = useState(content);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section: keyof CmsContent, field: string) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: e.target.value
            }
        }));
    };
    
    const handleAiText = (section: keyof CmsContent, field: string, text: string) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: text
            }
        }));
    };

    const handleSave = () => {
        updateContent(formData);
        alert('General settings saved!');
    };
    
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">General Settings</h2>

            {/* Process Section */}
            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">Process Section</h3>
                <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                        <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={formData.process.title}
                            onChange={(e) => handleInputChange(e, 'process', 'title')}
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                        />
                        <AiGenerateButton onTextGenerated={(text) => handleAiText('process', 'title', text)} />
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Subtitle</label>
                        <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={formData.process.subtitle}
                            onChange={(e) => handleInputChange(e, 'process', 'subtitle')}
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                        />
                        <AiGenerateButton onTextGenerated={(text) => handleAiText('process', 'subtitle', text)} />
                        </div>
                    </div>
                </div>
            </div>

             {/* Footer Section */}
            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">Footer Section</h3>
                <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Tagline</label>
                         <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={formData.footer.tagline}
                            onChange={(e) => handleInputChange(e, 'footer', 'tagline')}
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                        />
                        <AiGenerateButton onTextGenerated={(text) => handleAiText('footer', 'tagline', text)} />
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Copyright Text</label>
                         <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={formData.footer.copyright}
                            onChange={(e) => handleInputChange(e, 'footer', 'copyright')}
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                        />
                        <AiGenerateButton
                            promptHint="e.g., Generate a standard copyright line for a company named FAIRGO for the current year."
                            onTextGenerated={(text) => handleAiText('footer', 'copyright', text)}
                        />
                        </div>
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

export default GeneralSettings;