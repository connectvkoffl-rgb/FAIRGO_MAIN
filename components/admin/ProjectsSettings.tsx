import React, { useContext, useState } from 'react';
import { CmsContext } from '../../context/CmsContext';
import { AiGenerateButton } from './AiGenerateButton';
import { v4 as uuidv4 } from 'uuid';

const ProjectsSettings: React.FC = () => {
    const { content, updateContent } = useContext(CmsContext);
    const [formData, setFormData] = useState(content.projects);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleAiText = (field: 'title' | 'subtitle', text: string) => {
        setFormData(prev => ({ ...prev, [field]: text }));
    };

    // Projects CRUD
    const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const { name, value } = e.target;
        const newItems = [...formData.list];
        newItems[index] = { ...newItems[index], [name]: value };
        setFormData(prev => ({ ...prev, list: newItems }));
    };
    
    const handleProjectAiText = (index: number, field: 'name' | 'description', text: string) => {
        const newItems = [...formData.list];
        const item: any = newItems[index];
        item[field] = text;
        setFormData(prev => ({ ...prev, list: newItems }));
    };

    const addProject = () => {
        const newItem = { id: uuidv4(), name: 'New Project', description: 'A description for the new project.' };
        setFormData(prev => ({ ...prev, list: [...prev.list, newItem] }));
    };

    const removeProject = (id: string) => {
        setFormData(prev => ({ ...prev, list: prev.list.filter(item => item.id !== id) }));
    };
    
    const handleSave = () => {
        updateContent({ ...content, projects: formData });
        alert('Projects settings saved!');
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Projects Settings</h2>

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

            {/* Projects List */}
            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-cyan-400">Flagship Projects</h3>
                    <button onClick={addProject} className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-md text-sm font-semibold hover:bg-cyan-500/40">Add Project</button>
                </div>
                <div className="space-y-4">
                    {formData.list.map((project, index) => (
                        <div key={project.id} className="p-4 bg-gray-800/30 rounded-md space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Project Name</label>
                                <div className="flex items-center gap-2">
                                    <input type="text" name="name" value={project.name} onChange={e => handleProjectChange(e, index)} className="flex-1 bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                                    <AiGenerateButton onTextGenerated={(text) => handleProjectAiText(index, 'name', text)} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                                <div className="flex items-center gap-2">
                                    <textarea name="description" value={project.description} onChange={e => handleProjectChange(e, index)} rows={2} className="flex-1 bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                                    <AiGenerateButton onTextGenerated={(text) => handleProjectAiText(index, 'description', text)} />
                                </div>
                            </div>
                            <button onClick={() => removeProject(project.id)} className="text-red-500 hover:text-red-400 font-semibold text-sm">Remove</button>
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

export default ProjectsSettings;