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

const FaqSettings: React.FC = () => {
    const { content, updateContent } = useContext(CmsContext);
    const [formData, setFormData] = useState(content.faq);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleAiText = (field: 'title' | 'subtitle', text: string) => {
        setFormData(prev => ({ ...prev, [field]: text }));
    };

    const handleItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const { name, value } = e.target;
        const newItems = [...formData.questions];
        const item: any = newItems[index];
        item[name] = value;
        setFormData(prev => ({ ...prev, questions: newItems }));
    };
    
    const handleItemAiText = (index: number, field: 'question' | 'answer', text: string) => {
        const newItems = [...formData.questions];
        const item: any = newItems[index];
        item[field] = text;
        setFormData(prev => ({...prev, questions: newItems }));
    }

    const addItem = () => {
        const newItem = { id: uuidv4(), question: 'New Question?', answer: 'New answer.' };
        setFormData(prev => ({ ...prev, questions: [...prev.questions, newItem] }));
    };

    const removeItem = (id: string) => {
        setFormData(prev => ({ ...prev, questions: prev.questions.filter(item => item.id !== id) }));
    };

    const handleSave = () => {
        updateContent({ ...content, faq: formData });
        alert('FAQ settings saved!');
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">FAQ Settings</h2>

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

            {/* FAQ List */}
            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-cyan-400">Questions & Answers</h3>
                    <button onClick={addItem} className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-md text-sm font-semibold hover:bg-cyan-500/40">Add FAQ</button>
                </div>
                <div className="space-y-6">
                    {formData.questions.map((item, index) => (
                        <div key={item.id} className="p-4 bg-gray-800/30 rounded-md space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Question</label>
                                <div className="flex items-center gap-2">
                                <input type="text" name="question" value={item.question} onChange={e => handleItemChange(e, index)} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                                 <AiGenerateButton
                                    promptHint={`e.g., Write a common question a customer might ask about Voice AI services.`}
                                    onTextGenerated={(text) => handleItemAiText(index, 'question', text)} 
                                />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Answer</label>
                                <div className="flex items-center gap-2">
                                <textarea name="answer" value={item.answer} onChange={e => handleItemChange(e, index)} rows={3} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                                 <AiGenerateButton
                                    promptHint={`e.g., Write a clear and concise answer for the question: "${item.question}"`}
                                    onTextGenerated={(text) => handleItemAiText(index, 'answer', text)} 
                                />
                                </div>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-400 font-semibold text-sm">Remove FAQ</button>
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

export default FaqSettings;