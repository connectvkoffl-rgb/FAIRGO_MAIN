
import React, { useState, useEffect } from 'react';
import Website from './pages/Website';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import ToolsPage from './pages/ToolsPage';
import { CmsProvider } from './context/CmsContext';
import { isAuthenticated, setAuthCallback } from './services/authService';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    setAuthCallback(setLoggedIn);

    const handleHashChange = () => {
      setRoute(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      setAuthCallback(null);
    };
  }, []);
  
  const renderPage = () => {
    if (route.startsWith('/#admin')) {
      return loggedIn ? <AdminDashboard /> : <LoginPage />;
    }
    if (route.startsWith('/#tools')) {
        return <ToolsPage />;
    }
    return <Website />;
  };

  return (
    <CmsProvider>
        {renderPage()}
    </CmsProvider>
  );
};

export default App;
