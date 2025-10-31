
import React from 'react';

interface AdminSidebarProps {
    currentPage: string;
    setCurrentPage: (page: string) => void;
}

const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'general', label: 'General' },
    { id: 'hero', label: 'Hero Section' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'articles', label: 'Articles' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'blog', label: 'Blog' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'about', label: 'About' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
    { id: 'chatbot', label: 'Chatbot' },
    { id: 'ai-services', label: 'AI Services' },
    { id: 'voice-nav', label: 'Voice Nav' },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentPage, setCurrentPage }) => {
    return (
        <aside className="w-64 bg-gray-900/30 border-r border-gray-800/70 p-4 flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-8">CMS Admin</h2>
            <nav className="flex-1 space-y-2">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setCurrentPage(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            currentPage === item.id 
                            ? 'bg-cyan-500/20 text-cyan-300' 
                            : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
        </aside>
    );
};