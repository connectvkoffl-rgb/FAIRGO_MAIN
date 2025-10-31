import React, { useContext, useState } from 'react';
import { CmsContext } from '../../context/CmsContext';
import { AiGenerateButton } from './AiGenerateButton';

// A simple in-memory UUID implementation
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const TestimonialsSettings: React.FC = () => {
    const { content, updateContent } = useContext(CmsContext);
    const [formData, setFormData] = useState(content.testimonials);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleAiText = (field: 'title' | 'subtitle', text: string) => {
        setFormData(prev => ({ ...prev, [field]: text }));
    };

    const handleItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const { name, value } = e.target;
        const newItems = [...formData.list];
        const item: any = newItems[index];
        
        if (name === 'rating') {
             item[name] = parseInt(value, 10) || 0;
        } else {
            item[name] = value;
        }

        setFormData(prev => ({ ...prev, list: newItems }));
    };
    
    const handleItemAiText = (index: number, text: string) => {
        const newItems = [...formData.list];
        newItems[index] = { ...newItems[index], quote: text };
        setFormData(prev => ({...prev, list: newItems }));
    }

    const addItem = () => {
        const newItem = { id: uuidv4(), quote: "New testimonial...", name: "New Client", handle: "@newhandle", rating: 5 };
        setFormData(prev => ({ ...prev, list: [...prev.list, newItem] }));
    };

    const removeItem = (id: string) => {
        setFormData(prev => ({ ...prev, list: prev.list.filter(item => item.id !== id) }));
    };

    const handleSave = () => {
        updateContent({ ...content, testimonials: formData });
        alert('Testimonials settings saved!');
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Testimonials Settings</h2>

            {/* Section Header */}
            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">Section Header</h3>
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
                </div>
            </div>

            {/* Testimonials List */}
            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-cyan-400">Testimonials</h3>
                    <button onClick={addItem} className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-md text-sm font-semibold hover:bg-cyan-500/40">Add Testimonial</button>
                </div>
                <div className="space-y-6">
                    {formData.list.map((item, index) => (
                        <div key={item.id} className="p-4 bg-gray-800/30 rounded-md space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Quote</label>
                                <div className="flex items-center gap-2">
                                <textarea name="quote" value={item.quote} onChange={e => handleItemChange(e, index)} rows={3} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                                <AiGenerateButton
                                    promptHint={`e.g., Write a positive testimonial about an AI automation company from the perspective of a happy client.`}
                                    onTextGenerated={(text) => handleItemAiText(index, text)} 
                                />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                                    <input type="text" name="name" value={item.name} onChange={e => handleItemChange(e, index)} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Handle (e.g., @twitter)</label>
                                    <input type="text" name="handle" value={item.handle} onChange={e => handleItemChange(e, index)} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Rating (1-5)</label>
                                    <input type="number" name="rating" value={item.rating} min="1" max="5" onChange={e => handleItemChange(e, index)} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                                </div>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-400 font-semibold text-sm">Remove Testimonial</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <button onClick={handleSave} className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-300 transition-colors">Save Changes</button>
            </div>
        </div>
    );
};

export default TestimonialsSettings;