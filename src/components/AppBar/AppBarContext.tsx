import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppBarContextType {
  showRootAppBar: boolean;
  setShowRootAppBar: (show: boolean) => void;
}

const AppBarContext = createContext<AppBarContextType | undefined>(undefined);

export const AppBarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showRootAppBar, setShowRootAppBar] = useState(true);

  return (
    <AppBarContext.Provider value={{ showRootAppBar, setShowRootAppBar }}>
      {children}
    </AppBarContext.Provider>
  );
};

export const useAppBar = () => {
  const context = useContext(AppBarContext);
  if (context === undefined) {
    throw new Error('useAppBar must be used within an AppBarProvider');
  }
  return context;
};