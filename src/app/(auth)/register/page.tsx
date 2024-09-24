'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RegisterForm from '../../../components/Auth/Registration/RegistrationForm';
import { logout } from '../../../utils/firebase/auth';

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const signOutUser = async () => {
      try {
        await logout();
      } catch (error) {
        console.error('Error signing out:', error);
      }
      setIsClient(true);
    };

    signOutUser();
  }, []);

  const handleRegisterSuccess = () => {
    router.push('/dashboard');
  };

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div className="content">
      <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
      {error && <p className={"error"}>{error}</p>}
    </div>
  );
}