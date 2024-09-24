import React, { useEffect, useState, ReactNode } from 'react';
import '../../styles/appBar.css';
import {
  SunIcon,
  MoonIcon,
  ArrowRightStartOnRectangleIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import { onAuthStateChanged } from 'firebase/auth';
import { logout } from '../../utils/firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '../ThemeContext';

interface AppBarProps {
  children?: ReactNode;
}

const AppBar: React.FC<AppBarProps> = ({ children }) => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserSignedIn(!!user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await logout();
      setIsUserSignedIn(false);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="app-bar">
      <div className="app-bar-content">
        <div className="left-section">
          <button onClick={toggleTheme} className="icon-button" type="button" aria-label="Toggle theme">
            {isDarkMode ? <SunIcon className="icon" /> : <MoonIcon className="icon" />}
          </button>
        </div>
        {isUserSignedIn && (
          <div className="right-section">
            <button onClick={() => {}} className="icon-button" type="button" aria-label="Notifications">
              <BellIcon className="icon" />
            </button>
            <button onClick={handleSignOut} className="icon-button" type="button" aria-label="Sign out">
              <ArrowRightStartOnRectangleIcon className="icon" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppBar;
