import React, { useContext, useState } from 'react';
import { CmsContext } from '../../context/CmsContext';
import { BlogSection } from '../../types';
import { AiGenerateButton } from './AiGenerateButton';
import { v4 as uuidv4 } from 'uuid';

const BlogSettings: React.FC = () => {
    const { content, updateContent } = useContext(CmsContext);
    const [formData, setFormData] = useState<BlogSection>(content.blog);

    const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const handlePostChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newPosts = [...formData.posts];
        const post: any = newPosts[index];
        post[name] = value;
        setFormData(prev => ({...prev, posts: newPosts}));
    };
    
    const handlePostAiText = (index: number, field: 'title' | 'excerpt', text: string) => {
        const newPosts = [...formData.posts];
        const post: any = newPosts[index];
        post[field] = text;
        setFormData(prev => ({...prev, posts: newPosts}));
    };

    const addPost = () => {
        const newPost = { id: uuidv4(), image: "https://picsum.photos/seed/new-blog/400/250", title: "New Blog Post", excerpt: "A short excerpt for the new blog post." };
        setFormData(prev => ({ ...prev, posts: [...prev.posts, newPost] }));
    };

    const removePost = (id: string) => {
        setFormData(prev => ({ ...prev, posts: prev.posts.filter(p => p.id !== id) }));
    };

    const handleSave = () => {
        updateContent({ ...content, blog: formData });
        alert('Blog settings saved!');
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Blog Settings</h2>
            
            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">Section Header</h3>
                <div className="space-y-4">
                     <input type="text" name="title" value={formData.title} onChange={handleHeaderChange} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" placeholder="Title" />
                     <input type="text" name="subtitle" value={formData.subtitle} onChange={handleHeaderChange} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" placeholder="Subtitle" />
                </div>
            </div>

            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-cyan-400">Blog Posts</h3>
                    <button onClick={addPost} className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-md text-sm font-semibold hover:bg-cyan-500/40">Add Post</button>
                </div>
                <div className="space-y-6">
                    {formData.posts.map((post, index) => (
                        <div key={post.id} className="p-4 bg-gray-800/30 rounded-md space-y-3 border border-gray-700/50">
                             <input type="text" name="image" value={post.image} onChange={(e) => handlePostChange(index, e)} placeholder="Image URL" className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                             <div className="flex items-center gap-2">
                                <input type="text" name="title" value={post.title} onChange={(e) => handlePostChange(index, e)} placeholder="Post Title" className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                                <AiGenerateButton onTextGenerated={(text) => handlePostAiText(index, 'title', text)} />
                             </div>
                             <div className="flex items-center gap-2">
                                <textarea name="excerpt" value={post.excerpt} onChange={(e) => handlePostChange(index, e)} placeholder="Excerpt" rows={3} className="w-full bg-gray-800/50 border border-gray-700 rounded-md px-3 py-2 text-white" />
                                <AiGenerateButton onTextGenerated={(text) => handlePostAiText(index, 'excerpt', text)} />
                             </div>
                             <button onClick={() => removePost(post.id)} className="text-red-500 hover:text-red-400 font-semibold text-sm pt-2">Remove Post</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <button onClick={handleSave} className="bg-white text-black px-6 py-2 rounded-md font-semibold">Save Changes</button>
            </div>
        </div>
    );
};

export default BlogSettings;
