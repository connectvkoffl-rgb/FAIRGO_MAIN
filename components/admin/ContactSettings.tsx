import React, { useContext, useState } from 'react';
import { CmsContext } from '../../context/CmsContext';
import { ContactSection } from '../../types';
import { AiGenerateButton } from './AiGenerateButton';

const ContactSettings: React.FC = () => {
    const { content, updateContent } = useContext(CmsContext);
    const [formData, setFormData] = useState<ContactSection>(content.contact);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = () => {
        updateContent({ ...content, contact: formData });
        alert('Contact settings saved!');
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Contact Section Settings</h2>
            
            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">Content</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Subtitle</label>
                        <input type="text" name="subtitle" value={formData.subtitle} onChange={handleInputChange} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button onClick={handleSave} className="bg-white text-black px-6 py-2 rounded-md font-semibold">Save Changes</button>
            </div>
        </div>
    );
};

export default ContactSettings;
