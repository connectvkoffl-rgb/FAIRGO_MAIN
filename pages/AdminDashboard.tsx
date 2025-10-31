
import React, { useState } from 'react';
import { AdminLayout } from '../components/admin/AdminLayout';
import Dashboard from '../components/admin/Dashboard';
import GeneralSettings from '../components/admin/GeneralSettings';
import HeroSettings from '../components/admin/HeroSettings';
import ServicesSettings from '../components/admin/ServicesSettings';
import ProjectsSettings from '../components/admin/ProjectsSettings';
import TestimonialsSettings from '../components/admin/TestimonialsSettings';
import FaqSettings from '../components/admin/FaqSettings';
import ChatbotSettings from '../components/admin/ChatbotSettings';
import ArticlesSettings from '../components/admin/ArticlesSettings';
import PricingSettings from '../components/admin/PricingSettings';
import BlogSettings from '../components/admin/BlogSettings';
import AboutSettings from '../components/admin/AboutSettings';
import ContactSettings from '../components/admin/ContactSettings';
import VoiceNavSettings from '../components/admin/VoiceNavSettings';
import AiServicesSettings from '../components/admin/AiServicesSettings';

const AdminDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  const renderContent = () => {
    switch (currentPage) {
        case 'dashboard':
            return <Dashboard />;
        case 'general':
            return <GeneralSettings />;
        case 'hero':
            return <HeroSettings />;
        case 'services':
            return <ServicesSettings />;
        case 'projects':
            return <ProjectsSettings />;
        case 'articles':
            return <ArticlesSettings />;
        case 'testimonials':
            return <TestimonialsSettings />;
        case 'faq':
            return <FaqSettings />;
        case 'chatbot':
            return <ChatbotSettings />;
        case 'pricing':
            return <PricingSettings />;
        case 'blog':
            return <BlogSettings />;
        case 'about':
            return <AboutSettings />;
        case 'contact':
            return <ContactSettings />;
        case 'voice-nav':
            return <VoiceNavSettings />;
        case 'ai-services':
            return <AiServicesSettings />;
        default:
            return <Dashboard />;
    }
  };

  return (
    <AdminLayout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminDashboard;