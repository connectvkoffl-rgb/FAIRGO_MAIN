import React, { useEffect } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { logout } from '../../services/authService';
import { ensureAuthenticated } from '../../services/puterService';

interface AdminLayoutProps {
    children: React.ReactNode;
    currentPage: string;
    setCurrentPage: (page: any) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentPage, setCurrentPage }) => {
    useEffect(() => {
        // Ensure user is authenticated with Puter when admin panel loads
        ensureAuthenticated();
    }, []);
    
    return (
        <div className="bg-[#01010c] text-gray-300 min-h-screen font-sans flex">
            <AdminSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <div className="flex-1 flex flex-col">
                <header className="bg-gray-900/50 border-b border-gray-800/70 p-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                    <button
                        onClick={logout}
                        className="bg-gray-700 hover:bg-red-500/50 text-white px-4 py-2 rounded-md font-semibold transition-colors"
                    >
                        Logout
                    </button>
                </header>
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};