// src/components/AuthWrapper.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebaseConfig';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && !pathname.startsWith('/login') && pathname !== '/') {
        router.push('/login');
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthWrapper;