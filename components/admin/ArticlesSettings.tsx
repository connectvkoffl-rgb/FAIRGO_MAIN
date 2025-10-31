import React, { useContext, useState } from 'react';
import { CmsContext } from '../../context/CmsContext';
import { CmsContent } from '../../types';
import { AiGenerateButton } from './AiGenerateButton';

// A simple in-memory UUID implementation
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const ArticlesSettings: React.FC = () => {
    const { content, updateContent } = useContext(CmsContext);
    const [articles, setArticles] = useState(content.projects.featuredArticles);

    // Articles CRUD
    const handleArticleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const { name, value } = e.target;
        const newItems = [...articles];
        const item: any = newItems[index];
        item[name] = value;
        setArticles(newItems);
    };
    
    const handleArticleAiText = (index: number, field: 'title' | 'description', text: string) => {
        const newItems = [...articles];
        const item: any = newItems[index];
        item[field] = text;
        setArticles(newItems);
    }

    const addArticle = () => {
        const newItem = { id: uuidv4(), image: 'https://picsum.photos/seed/new-article/500/300', title: 'New Article', description: 'A new description.' };
        setArticles(prev => [...prev, newItem]);
    };

    const removeArticle = (id: string) => {
        if (window.confirm("Are you sure you want to delete this article?")) {
            setArticles(prev => prev.filter(item => item.id !== id));
        }
    };

    const handleSave = () => {
        const updatedContent: CmsContent = {
            ...content,
            projects: {
                ...content.projects,
                featuredArticles: articles
            }
        };
        updateContent(updatedContent);
        alert('Featured articles saved!');
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Featured Articles Settings</h2>

            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-cyan-400">Manage Articles</h3>
                    <button onClick={addArticle} className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-md text-sm font-semibold hover:bg-cyan-500/40">Add Article</button>
                </div>
                <div className="space-y-6">
                    {articles.map((article, index) => (
                        <div key={article.id} className="p-4 bg-gray-800/30 rounded-md space-y-3 border border-gray-700/50">
                            <h4 className="text-lg font-medium text-white">Article {index + 1}</h4>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
                                <input type="text" name="image" value={article.image} onChange={e => handleArticleChange(e, index)} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                                <div className="flex items-center gap-2">
                                <input type="text" name="title" value={article.title} onChange={e => handleArticleChange(e, index)} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                                <AiGenerateButton onTextGenerated={(text) => handleArticleAiText(index, 'title', text)} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                                <div className="flex items-center gap-2">
                                <textarea name="description" value={article.description} onChange={e => handleArticleChange(e, index)} rows={2} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                                <AiGenerateButton 
                                    promptHint={`e.g., Write a short, engaging description for an article titled "${article.title}"`}
                                    onTextGenerated={(text) => handleArticleAiText(index, 'description', text)} 
                                />
                                </div>
                            </div>
                             <button onClick={() => removeArticle(article.id)} className="text-red-500 hover:text-red-400 font-semibold text-sm">Remove Article</button>
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

export default ArticlesSettings;