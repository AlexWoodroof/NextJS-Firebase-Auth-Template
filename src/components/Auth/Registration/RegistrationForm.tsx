import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import EmailPasswordForm from './EmailPasswordForm';
import UserInfoForm from './UserInfoForm';
import { register } from '../../../utils/firebase/auth';
import { useError } from '@/components/Dashboard/Popups/ErrorContext';

interface RegisterFormProps {
  onRegisterSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
  const router = useRouter();
  const { addError } = useError();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    given_name: '',
    family_name: '',
    phone_number: '',
  });

  const handleEmailPasswordSubmit = (data: { [key: string]: string }) => {
    setFormData(prevData => ({ ...prevData, ...data }));
    setStep(2);
  };

  const handleUserInfoSubmit = async (data: { [key: string]: string }) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    try {
      await register(updatedData);
      onRegisterSuccess();
    } catch (error: any) {
      console.error("Registration error:", error);
      addError(error.message || 'Failed to register. Please try again.');
    }
  };

  return (
    <>
      {step === 1 && <EmailPasswordForm onSubmit={handleEmailPasswordSubmit} />}
      {step === 2 && <UserInfoForm onSubmit={handleUserInfoSubmit} />}
    </>
  );
};

export default RegisterForm;
