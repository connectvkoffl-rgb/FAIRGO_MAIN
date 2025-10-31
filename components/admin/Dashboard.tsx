
import React, { useContext } from 'react';
import { CmsContext } from '../../context/CmsContext';

const StatCard: React.FC<{ title: string; value: string | number }> = ({ title, value }) => (
    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
    </div>
);

const Dashboard: React.FC = () => {
    const { content } = useContext(CmsContext);

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Dashboard</h2>
            
            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-white">Welcome to the FAIRGO CMS</h3>
                <p className="text-gray-400">
                    From here, you can manage all the content on your website. Use the sidebar to navigate to different sections.
                    Your changes will be saved to the browser's local storage. To see them live, simply refresh the main website page.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Services" value={content.services.cards.length} />
                <StatCard title="Projects" value={content.projects.list.length} />
                <StatCard title="Blog Posts" value={content.blog.posts.length} />
                <StatCard title="Testimonials" value={content.testimonials.list.length} />
            </div>
        </div>
    );
};

export default Dashboard;
