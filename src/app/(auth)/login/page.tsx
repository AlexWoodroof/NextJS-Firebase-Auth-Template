// src/app/login/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '../../../components/Auth/LoginForm';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../config/firebaseConfig';

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard');
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <LoginForm />;
};

export default LoginPage;