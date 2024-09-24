import React from 'react';
import AuthForm from '../AuthForm';

interface UserInfoFormProps {
  onSubmit: (data: { [key: string]: string }) => void;
}

export const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit }) => {
  const fields = [
    { id: 'given_name', type: 'text', placeholder: 'Given Name' },
    { id: 'family_name', type: 'text', placeholder: 'Family Name' },
    { id: 'phone_number', type: 'tel', placeholder: 'Phone Number' },
  ];

  return (
    <AuthForm
      onSubmit={(data) => onSubmit({ given_name: data.given_name, family_name: data.family_name, phone_number: data.phone_number })}
      fields={fields}
      buttonText="Complete Profile"
      title="Complete your profile"
      bottomText=""
      bottomLinkText=""
      bottomLinkUrl=""
      useEmailValidation={false}
    />
  );
};

export default UserInfoForm;
