import React from 'react';
import AuthForm from '../AuthForm';

interface CodeVerificationFormProps {
    onSubmit: (code: string) => void;
  }

const CodeVerificationForm: React.FC<CodeVerificationFormProps> = ({ onSubmit }) => {
  const fields = [
    { id: 'verificationCode', type: 'text', placeholder: 'Verification Code' },
  ];

  const handleSubmit = (data: { [key: string]: string }) => {
    onSubmit(data.verificationCode);
  };

  return (
    <AuthForm
      onSubmit={handleSubmit}
      fields={fields}
      buttonText="Verify"
      title="Verify your account"
      bottomText="Didn't receive a code?"
      bottomLinkText="Resend"
      bottomLinkUrl="#"
    />
  );
};

export default CodeVerificationForm;