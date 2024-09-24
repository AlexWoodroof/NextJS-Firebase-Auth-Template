'use client';

import React, { ReactNode } from 'react';
import { useTheme } from '../../components/ThemeContext';

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`auth-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="auth-content">
        {children}
      </div>
    </div>
  );
};

export default PublicLayout;