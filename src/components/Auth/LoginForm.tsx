// src/components/Auth/LoginForm.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from './AuthForm';
import { login, isLoggedIn } from '../../utils/firebase/auth';
import { useError } from '@/components/Dashboard/Popups/ErrorContext';

const LoginForm: React.FC = () => {
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { addError } = useError();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const loggedIn = await isLoggedIn();
        if (loggedIn) {
          router.push('/dashboard');
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error checking auth status:', err);
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [router]);

  const handleSubmit = async (data: { [key: string]: string }) => {
    try {
      const user = await login(data.email, data.password, stayLoggedIn);
      if (user) {
        router.push('/dashboard');
      } else {
        addError('Failed to log in. Please check your credentials and try again.');
      }
    } catch (err: any) {
      addError(err.message || 'Failed to log in. Please check your credentials and try again.');
    }
  };

  const handleStayLoggedInChange = (checked: boolean) => {
    setStayLoggedIn(checked);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const fields = [
    { id: 'email', type: 'email', placeholder: 'Email Address' },
  ];

  return (
    <AuthForm
      onSubmit={handleSubmit}
      fields={fields}
      buttonText="Log in"
      title="Welcome back"
      bottomText="Don't have an account?"
      bottomLinkText="Sign Up"
      bottomLinkUrl="../register"
      useEmailValidation={true}
      showForgotPassword={true}
      onForgotPassword={() => router.push('/forgot-password')}
      showStayLoggedIn={true}
      onStayLoggedInChange={handleStayLoggedInChange}
      usePasswordField={true}
    />
  );
};

export default LoginForm;