
import React, { useContext, useState } from 'react';
import { CmsContext } from '../../context/CmsContext';
import { VoiceCommand } from '../../types';
import { v4 as uuidv4 } from 'uuid';

const VoiceNavSettings: React.FC = () => {
    const { content, updateContent } = useContext(CmsContext);
    const [formData, setFormData] = useState(content.voiceNavigation);

    const handleCommandChange = (index: number, field: keyof VoiceCommand, value: string | string[]) => {
        const newCommands = [...formData.commands];
        const command: any = newCommands[index];
        command[field] = value;
        setFormData(prev => ({ ...prev, commands: newCommands }));
    };

    const addCommand = () => {
        const newCommand: VoiceCommand = {
            id: uuidv4(),
            keywords: ['new command'],
            type: 'navigate',
            target: '#home',
            feedback: 'New command feedback...'
        };
        setFormData(prev => ({ ...prev, commands: [...prev.commands, newCommand] }));
    };

    const removeCommand = (id: string) => {
        setFormData(prev => ({ ...prev, commands: prev.commands.filter(cmd => cmd.id !== id) }));
    };

    const handleSave = () => {
        updateContent({ ...content, voiceNavigation: formData });
        alert('Voice Navigation settings saved!');
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Voice Navigation Settings</h2>

            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-cyan-400">Voice Commands</h3>
                    <button onClick={addCommand} className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-md text-sm font-semibold hover:bg-cyan-500/40">Add Command</button>
                </div>
                <div className="space-y-4">
                    {formData.commands.map((command, index) => (
                        <div key={command.id} className="p-4 bg-gray-800/30 rounded-md space-y-3 border border-gray-700/50">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Keywords (comma-separated)</label>
                                <input
                                    type="text"
                                    value={command.keywords.join(', ')}
                                    onChange={e => handleCommandChange(index, 'keywords', e.target.value.split(',').map(k => k.trim()))}
                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Command Type</label>
                                    <select
                                        value={command.type}
                                        onChange={e => handleCommandChange(index, 'type', e.target.value)}
                                        className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                                    >
                                        <option value="navigate">Navigate</option>
                                        <option value="action">Action</option>
                                        <option value="quick_view">Quick View</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Target</label>
                                    <input
                                        type="text"
                                        placeholder={command.type === 'navigate' ? '#section-id' : 'ACTION_NAME'}
                                        value={command.target}
                                        onChange={e => handleCommandChange(index, 'target', e.target.value)}
                                        className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        For Navigate: `#home`, `#services`. For Action: `OPEN_CHAT`, `SCROLL_DOWN`, etc.
                                    </p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Feedback Message</label>
                                <input
                                    type="text"
                                    value={command.feedback}
                                    onChange={e => handleCommandChange(index, 'feedback', e.target.value)}
                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                                />
                            </div>
                            <button onClick={() => removeCommand(command.id)} className="text-red-500 hover:text-red-400 font-semibold text-sm">Remove Command</button>
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

export default VoiceNavSettings;