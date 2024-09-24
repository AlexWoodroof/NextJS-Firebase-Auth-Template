import React from 'react';
import AuthForm from '../AuthForm';

interface EmailPasswordFormProps {
  onSubmit: (data: { [key: string]: string }) => void;
}

export const EmailPasswordForm: React.FC<EmailPasswordFormProps> = ({ onSubmit }) => {
  const fields = [
    { id: 'email', type: 'email', placeholder: 'Email Address' },
    { id: 'password', type: 'password', placeholder: 'Password' },
  ];

  return (
    <AuthForm
      onSubmit={(data) => onSubmit({ email: data.email, password: data.password })}
      fields={fields}
      buttonText="Sign Up"
      title="Create an account"
      bottomText="Already have an account?"
      bottomLinkText="Login"
      bottomLinkUrl="../login"
      useEmailValidation={true}
      usePasswordField={true}
    />
  );
};

export default EmailPasswordForm;
