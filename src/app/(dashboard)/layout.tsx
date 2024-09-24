'use client';

import React from 'react';
import '../../styles/globals.css';
import '../../styles/theme.css';
import '../../styles/components.css';
import { useTheme } from '../../components/ThemeContext';
import AuthWrapper from '../../components/Auth/AuthWrapper';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useTheme();

  return (
    <AuthWrapper>
      <div className={`dashboard-layout ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="background-wrapper">
          <div className="background-pattern"></div>
        </div>
        <main className="content-wrapper">{children}</main>
      </div>
    </AuthWrapper>
  );
}