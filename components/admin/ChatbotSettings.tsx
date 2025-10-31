import React, { useContext, useState } from 'react';
import { CmsContext } from '../../context/CmsContext';
import { ChatbotData, ChatAgent, KnowledgeItem } from '../../types';
import { v4 as uuidv4 } from 'uuid';

const ChatbotSettings: React.FC = () => {
    const { content, updateContent } = useContext(CmsContext);
    const [formData, setFormData] = useState<ChatbotData>(content.chatbot);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');


    const handleDefaultAgentChange = (agentId: string) => {
        setFormData(prev => ({ ...prev, defaultAgentId: agentId }));
    };
    
    // Agent CRUD
    const addAgent = () => {
        const newAgent: ChatAgent = { 
            id: uuidv4(), 
            name: "New Agent", 
            systemInstruction: "You are a helpful assistant.", 
            knowledgeIds: [],
            temperature: 0.7,
            maxOutputTokens: 1024,
        };
        setFormData(prev => ({...prev, agents: [...prev.agents, newAgent]}));
    };
    
    const updateAgent = (agentId: string, updatedAgent: Partial<ChatAgent>) => {
        setFormData(prev => ({
            ...prev,
            agents: prev.agents.map(agent => agent.id === agentId ? { ...agent, ...updatedAgent } : agent)
        }));
    };

    const deleteAgent = (agentId: string) => {
        if (window.confirm("Are you sure you want to delete this agent?")) {
            setFormData(prev => ({
                ...prev,
                agents: prev.agents.filter(agent => agent.id !== agentId),
                defaultAgentId: prev.defaultAgentId === agentId ? null : prev.defaultAgentId
            }));
        }
    };

    // Knowledge Base CRUD
    const addKnowledgeItem = (type: 'file' | 'url') => {
        if (type === 'file') {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.txt,.md';
            fileInput.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const newItem: KnowledgeItem = {
                            id: uuidv4(),
                            type: 'file',
                            name: file.name,
                            source: file.name,
                            content: event.target?.result as string
                        };
                        setFormData(prev => ({...prev, knowledgeBase: [...prev.knowledgeBase, newItem]}));
                    };
                    reader.readAsText(file);
                }
            };
            fileInput.click();
        } else { // URL
             const url = prompt("Enter the URL of the web page:");
             if(url) {
                 const newItem: KnowledgeItem = {
                    id: uuidv4(),
                    type: 'url',
                    name: `Content from ${url.substring(0, 30)}...`,
                    source: url,
                    content: `Please paste the content from ${url} here.`
                 };
                 setFormData(prev => ({...prev, knowledgeBase: [...prev.knowledgeBase, newItem]}));
             }
        }
    };
    
    const updateKnowledgeItem = (itemId: string, updatedItem: Partial<KnowledgeItem>) => {
         setFormData(prev => ({
            ...prev,
            knowledgeBase: prev.knowledgeBase.map(item => item.id === itemId ? { ...item, ...updatedItem } : item)
        }));
    };

    const deleteKnowledgeItem = (itemId: string) => {
        if (window.confirm("Are you sure you want to delete this knowledge item?")) {
            setFormData(prev => ({
                ...prev,
                knowledgeBase: prev.knowledgeBase.filter(item => item.id !== itemId),
                agents: prev.agents.map(agent => ({
                    ...agent,
                    knowledgeIds: agent.knowledgeIds.filter(id => id !== itemId)
                }))
            }));
        }
    };
    
    const handleSave = () => {
        setSaveStatus('saving');
        updateContent({ ...content, chatbot: formData });
        setTimeout(() => {
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000); // Reset after 2 seconds
        }, 500);
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Chatbot Settings</h2>

            {/* AI Agents */}
            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-cyan-400">AI Agents</h3>
                    <button onClick={addAgent} className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-md text-sm font-semibold hover:bg-cyan-500/40">Add Agent</button>
                </div>
                <div className="space-y-4">
                    {formData.agents.map(agent => (
                        <div key={agent.id} className="p-4 bg-gray-800/30 rounded-md space-y-3 border border-gray-700/50">
                            <div className="flex items-center gap-4">
                                <input
                                    type="text"
                                    value={agent.name}
                                    onChange={e => updateAgent(agent.id, { name: e.target.value })}
                                    className="flex-1 bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white font-semibold"
                                />
                                <button
                                    onClick={() => handleDefaultAgentChange(agent.id)}
                                    className={`px-3 py-1 text-xs rounded-full ${formData.defaultAgentId === agent.id ? 'bg-green-500/30 text-green-400' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                                >
                                    {formData.defaultAgentId === agent.id ? 'Default' : 'Set as Default'}
                                </button>
                                <button onClick={() => deleteAgent(agent.id)} className="text-red-500 hover:text-red-400 font-semibold text-sm">Delete</button>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">System Instruction (Persona)</label>
                                <textarea
                                    value={agent.systemInstruction}
                                    onChange={e => updateAgent(agent.id, { systemInstruction: e.target.value })}
                                    rows={3}
                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                                />
                            </div>

                            <div className="pt-3 border-t border-gray-700/50">
                                <h4 className="text-sm font-semibold text-gray-300 mb-2">Model Parameters</h4>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1 flex justify-between">
                                            <span>Temperature (Creativity)</span>
                                            <span className="font-mono text-cyan-400">{agent.temperature?.toFixed(1)}</span>
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.1"
                                            value={agent.temperature || 0.7}
                                            onChange={e => updateAgent(agent.id, { temperature: parseFloat(e.target.value) })}
                                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Max Tokens (Length)</label>
                                        <input
                                            type="number"
                                            value={agent.maxOutputTokens || 1024}
                                            onChange={e => updateAgent(agent.id, { maxOutputTokens: parseInt(e.target.value, 10) || 0 })}
                                            className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Assigned Knowledge</label>
                                <div className="p-3 bg-gray-800/50 border border-gray-700 rounded-md max-h-32 overflow-y-auto">
                                    {formData.knowledgeBase.length > 0 ? formData.knowledgeBase.map(item => (
                                        <div key={item.id} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id={`agent-${agent.id}-kb-${item.id}`}
                                                checked={agent.knowledgeIds.includes(item.id)}
                                                onChange={e => {
                                                    const newIds = e.target.checked
                                                        ? [...agent.knowledgeIds, item.id]
                                                        : agent.knowledgeIds.filter(id => id !== item.id);
                                                    updateAgent(agent.id, { knowledgeIds: newIds });
                                                }}
                                                className="w-4 h-4 text-cyan-600 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
                                            />
                                            <label htmlFor={`agent-${agent.id}-kb-${item.id}`} className="text-sm text-gray-300">{item.name}</label>
                                        </div>
                                    )) : <p className="text-sm text-gray-500">No knowledge items available.</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Knowledge Base */}
            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-cyan-400">Knowledge Base</h3>
                    <div className="flex gap-2">
                        <button onClick={() => addKnowledgeItem('file')} className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-md text-sm font-semibold hover:bg-blue-500/40">Upload File</button>
                        <button onClick={() => addKnowledgeItem('url')} className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-md text-sm font-semibold hover:bg-purple-500/40">Add Web Page</button>
                    </div>
                </div>
                <div className="space-y-4">
                    {formData.knowledgeBase.length > 0 ? formData.knowledgeBase.map(item => (
                         <div key={item.id} className="p-4 bg-gray-800/30 rounded-md space-y-3">
                             <div className="flex items-center gap-4">
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.type === 'file' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'}`}>{item.type.toUpperCase()}</span>
                                <input
                                    type="text"
                                    value={item.name}
                                    onChange={e => updateKnowledgeItem(item.id, { name: e.target.value })}
                                    className="flex-1 bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                                />
                                 <button onClick={() => deleteKnowledgeItem(item.id)} className="text-red-500 hover:text-red-400 font-semibold text-sm">Delete</button>
                             </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Content {item.type === 'url' && <span className="text-xs text-yellow-500">(Note: Please paste content manually due to browser restrictions)</span>}</label>
                                <textarea
                                    value={item.content}
                                    onChange={e => updateKnowledgeItem(item.id, { content: e.target.value })}
                                    rows={5}
                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white"
                                />
                            </div>
                         </div>
                    )) : <p className="text-center text-gray-500 py-4">No knowledge items. Upload a file or add a web page to get started.</p>}
                </div>
            </div>
            
            <div className="flex justify-end items-center gap-4">
                {saveStatus === 'saved' && (
                    <span className="text-green-400 transition-opacity duration-300 opacity-100">✓ Saved!</span>
                )}
                <button
                    onClick={handleSave}
                    disabled={saveStatus === 'saving'}
                    className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-300 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

export default ChatbotSettings;