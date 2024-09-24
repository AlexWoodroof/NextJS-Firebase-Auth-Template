import React, { useState } from 'react';
import { resetPassword, confirmResetPassword } from '../../utils/firebase/auth';
import AuthForm from './AuthForm';
import { useRouter } from 'next/navigation';
import { useError } from '@/components/Dashboard/Popups/ErrorContext';

const ForgotPasswordForm: React.FC = () => {
  const [stage, setStage] = useState('request');
  const [email, setEmail] = useState('');
  const { addError } = useError();
  const router = useRouter();

  const handleRequestSubmit = async (data: { [key: string]: string }) => {
    try {
      await resetPassword(data.email);
      setEmail(data.email);
      setStage('reset');
    } catch (err: any) {
      addError(err.message || 'An error occurred during password reset request');
    }
  };

  const handleResetSubmit = async (data: { [key: string]: string }) => {
    try {
      await confirmResetPassword(data.code, data.newPassword);
      setStage('success');
    } catch (err: any) {
      addError(err.message || 'An error occurred during password reset');
    }
  };

  const requestFields = [
    { id: 'email', type: 'email', placeholder: 'Email Address' },
  ];

  const resetFields = [
    { id: 'code', type: 'text', placeholder: 'Verification Code' },
    { id: 'newPassword', type: 'password', placeholder: 'New Password' },
  ];

  if (stage === 'request') {
    return (
      <>
        <AuthForm
          onSubmit={handleRequestSubmit}
          fields={requestFields}
          buttonText="Send Reset Code"
          title="Forgot Password"
          bottomText="Remember your password?"
          bottomLinkText="Log In"
          bottomLinkUrl="../login"
        />
      </>
    );
  }

  if (stage === 'reset') {
    return (
      <>
        <AuthForm
          onSubmit={handleResetSubmit}
          fields={resetFields}
          buttonText="Reset Password"
          title="Reset Password"
          bottomText=""
          bottomLinkText=""
          bottomLinkUrl=""
        />
      </>
    );
  }

  if (stage === 'success') {
    return (
      <div>
        <h2>Password Reset Successful</h2>
        <p>Your password has been reset. You can now <a href="#" onClick={() => router.push('/login')}>log in</a> with your new password.</p>
      </div>
    );
  }

  return null;
};

export default ForgotPasswordForm;
