import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { CmsContent } from '../types';
import { getData, updateData, initializeData } from '../services/cmsService';

interface CmsContextType {
  content: CmsContent;
  updateContent: (newContent: CmsContent) => void;
}

// Create a context with a default value
export const CmsContext = createContext<CmsContextType>({
  content: {} as CmsContent, // Start with an empty object, will be populated by provider
  updateContent: () => {},
});

interface CmsProviderProps {
  children: ReactNode;
}

export const CmsProvider: React.FC<CmsProviderProps> = ({ children }) => {
  const [content, setContent] = useState<CmsContent | null>(null);

  useEffect(() => {
    // Initialize default data if it doesn't exist in localStorage
    initializeData();
    // Then load the data
    const loadedContent = getData();
    setContent(loadedContent);
  }, []);

  const handleUpdateContent = (newContent: CmsContent) => {
    updateData(newContent);
    setContent(newContent);
  };

  if (!content) {
    // Render a loading state or null while content is being fetched
    return <div className="bg-[#01010c] min-h-screen"></div>;
  }

  return (
    <CmsContext.Provider value={{ content, updateContent: handleUpdateContent }}>
      {children}
    </CmsContext.Provider>
  );
};
