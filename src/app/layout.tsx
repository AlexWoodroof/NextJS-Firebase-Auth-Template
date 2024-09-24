// app/layout.tsx
'use client';

import React, { ReactNode, useState } from 'react';
import { ThemeProvider, useTheme } from '../components/ThemeContext';

import AppBar from '../components/AppBar/AppBar';
import { AppBarProvider, useAppBar } from '../components/AppBar/AppBarContext';
import { ErrorProvider } from '../components/Dashboard/Popups/ErrorContext';
import { ErrorContainer } from '../components/Dashboard/Popups/ErrorMessage'; // Import ErrorContainer instead of ErrorMessage
import '../styles/globals.css';
import '../styles/theme.css';
import '../styles/components.css';
import '../styles/auth-utilities.css';
import '../styles/auth.css';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AppBarProvider>
            <ErrorProvider>
              <RootLayoutContent>{children}</RootLayoutContent>
            </ErrorProvider>
          </AppBarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

const RootLayoutContent: React.FC<RootLayoutProps> = ({ children }) => {
  const { isDarkMode } = useTheme();
  const { showRootAppBar } = useAppBar();
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className={`app-container background-pattern ${isDarkMode ? 'dark' : 'light'}`}>
      {showRootAppBar && (<AppBar/>)}
      <ErrorContainer /> {/* Use ErrorContainer instead of ErrorMessage */}
      <main>{children}</main>
    </div>
  );
};

export default RootLayout;