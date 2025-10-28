
import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="inline-block px-4 py-1 border border-gray-700 rounded-full text-sm bg-gray-900/50 mb-4">
        {children}
    </div>
);

const campaigns = [
    {
        logo: 'Cloud',
        title: 'Cloud AI Mailing',
        description: 'Automated email campaigns powered by cloud-based AI tools — built to personalize, segment, and deliver at scale.',
        stats: [
            { value: '70K+', label: 'new customers' },
            { value: '$8m+', label: 'opportunity Value' },
        ]
    },
    {
        logo: 'Minty',
        title: 'Minty Ads Automation',
        description: 'A fresh approach to paid media, using AI to optimize targeting, creatives, and real-time performance across ad platforms.',
        stats: [
            { value: '25%', label: 'ROAS Rise' },
            { value: '22%', label: 'Reduced CPC' },
        ]
    }
];

const CampaignCard: React.FC<{ campaign: typeof campaigns[0] }> = ({ campaign }) => (
    <div className="relative p-8 bg-gray-900/50 border border-gray-800/70 rounded-lg backdrop-blur-sm w-full">
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gray-600"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gray-600"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gray-600"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gray-600"></div>
        
        <h3 className="text-2xl font-bold text-white mb-2">{campaign.logo}</h3>
        <h4 className="text-xl font-semibold text-gray-300 mb-4">{campaign.title}</h4>
        <p className="text-gray-400 mb-8">{campaign.description}</p>
        <div className="grid grid-cols-2 gap-4 border-t border-gray-800 pt-6">
            {campaign.stats.map(stat => (
                <div key={stat.label}>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-gray-500">{stat.label}</p>
                </div>
            ))}
        </div>
    </div>
);

export const Campaigns: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prev = () => setCurrentIndex(i => (i === 0 ? campaigns.length - 1 : i - 1));
    const next = () => setCurrentIndex(i => (i === campaigns.length - 1 ? 0 : i + 1));
    
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <SectionTitle>Campaigns</SectionTitle>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">Campaigns That Convert</h2>
                    <p className="mt-4 text-lg text-gray-400">We combine data, AI, and automation to deliver campaigns that convert</p>
                </div>

                <div className="relative">
                    <div className="overflow-hidden relative h-[480px]">
                        {campaigns.map((campaign, index) => (
                             <div 
                                key={index}
                                className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                                style={{ opacity: index === currentIndex ? 1 : 0, zIndex: index === currentIndex ? 10 : 1 }}
                              >
                                <div className="p-4 h-full">
                                    <CampaignCard campaign={campaign} />
                                </div>
                             </div>
                        ))}
                    </div>
                    <button onClick={prev} className="absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2 bg-gray-800/50 p-2 rounded-full hover:bg-gray-700 z-20">
                        <ChevronLeftIcon className="w-6 h-6 text-white" />
                    </button>
                    <button onClick={next} className="absolute top-1/2 -right-4 md:-right-8 -translate-y-1/2 bg-gray-800/50 p-2 rounded-full hover:bg-gray-700 z-20">
                        <ChevronRightIcon className="w-6 h-6 text-white" />
                    </button>
                </div>
            </div>
        </section>
    );
};
