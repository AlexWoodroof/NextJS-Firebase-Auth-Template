import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useError } from '@/components/Dashboard/Popups/ErrorContext';
import '../../styles/auth-utilities.css';

interface AuthFormProps {
  onSubmit: (data: { [key: string]: string }) => void;
  fields: Array<{ id: string; type: string; placeholder: string }>;
  buttonText: string;
  title: string;
  bottomText: string;
  bottomLinkText: string;
  bottomLinkUrl: string;
  usePasswordField?: boolean;
  onContinue?: (email: string) => void;
  useEmailValidation?: boolean;
  showForgotPassword?: boolean;
  onForgotPassword?: () => void;
  showStayLoggedIn?: boolean;
  onStayLoggedInChange?: (checked: boolean) => void;
  children?: React.ReactNode;
  onPasswordChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBottomLinkClick?: () => void;
  passwordRequirements?: React.ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  fields,
  buttonText,
  title,
  bottomText,
  bottomLinkText,
  bottomLinkUrl,
  usePasswordField = false,
  onContinue,
  useEmailValidation = false,
  showForgotPassword = false,
  onForgotPassword,
  showStayLoggedIn = false,
  onStayLoggedInChange,
  children,
  onPasswordChange,
  onBottomLinkClick,
  passwordRequirements,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [showPasswordField, setShowPasswordField] = useState(!useEmailValidation);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { addError } = useError();

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (id === 'password' && onPasswordChange) {
      onPasswordChange(e);
    }
  };

  const handleInputFocus = (id: string) => {
    setFocusedField(id);
  };

  const handleInputBlur = () => {
    setFocusedField(null);
  };

  const handleContinue = (e: React.MouseEvent) => {
    e.preventDefault();
    if (validateEmail(formData.email)) {
      setShowPasswordField(true);
      if (onContinue) {
        onContinue(formData.email);
      }
    } else {
      addError('Please enter a valid email address');
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: string[] = [];

    fields.forEach((field) => {
      if (!formData[field.id]) {
        newErrors.push(`${field.placeholder} is required`);
      }
    });

    if (useEmailValidation && !validateEmail(formData.email)) {
      newErrors.push('Please enter a valid email address');
    }

    if (newErrors.length === 0) {
      onSubmit(formData);
    } else {
      newErrors.forEach(error => addError(error));
    }
  };

  const handleStayLoggedInChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStayLoggedIn(e.target.checked);
    if (onStayLoggedInChange) {
      onStayLoggedInChange(e.target.checked);
    }
  };

  return (
    <div className="content">
      <form onSubmit={handleSubmit} className="form">
        <h2>{title}</h2>
        {fields.map((field) => (
          field.id !== 'password' && (
            <div key={field.id} className="field visible">
              <div className={`inputContainer ${focusedField === field.id || formData[field.id] ? 'active' : ''}`}>
                <input
                  id={field.id}
                  type={field.type}
                  value={formData[field.id] || ''}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus(field.id)}
                  onBlur={handleInputBlur}
                  required
                  aria-required="true"
                  placeholder=" "
                />
                <label htmlFor={field.id}>{field.placeholder}</label>
              </div>
            </div>
          )
        ))}
        {usePasswordField && (
          <div id="passwordSection" className={`password-section ${showPasswordField ? 'expanded' : ''}`}>
            <div className="field">
              <div className={`inputContainer ${focusedField === 'password' || formData.password ? 'active' : ''}`}>
                <input
                  id="password"
                  type="password"
                  value={formData.password || ''}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('password')}
                  onBlur={handleInputBlur}
                  required
                  aria-required="true"
                  placeholder=" "
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            {passwordRequirements}
            {showForgotPassword && (
              <div className="forgotPassword">
                <a href="#" onClick={onForgotPassword}>Forgot password?</a>
              </div>
            )}
            {showStayLoggedIn && (
              <div className="stayLoggedIn">
                <input
                  type="checkbox"
                  id="stayLoggedIn"
                  checked={stayLoggedIn}
                  onChange={handleStayLoggedInChange}
                />
                <label htmlFor="stayLoggedIn">Stay logged in for 30 days</label>
              </div>
            )}
          </div>
        )}
        {useEmailValidation && !showPasswordField ? (
          <button type="button" onClick={handleContinue} className="button">
            Continue
          </button>
        ) : (
          <button type="submit" className="button">
            {buttonText}
          </button>
        )}
        <div className="bottomText">
          <p>
            {bottomText}{' '}
            <a href={bottomLinkUrl} onClick={onBottomLinkClick} style={{ color: '#10a37f' }}>
              {bottomLinkText}
            </a>
          </p>
        </div>
        {children}
      </form>
    </div>
  );
};

export default AuthForm;