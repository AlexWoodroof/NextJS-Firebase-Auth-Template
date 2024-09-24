// components/Dashboard/Popups/ErrorMessage.tsx
import React, { useState, useEffect } from 'react';
import styles from './ErrorMessage.module.css';
import { useError } from './ErrorContext';

interface ErrorMessageProps {
  id: string;
  message: string;
  onClose: (id: string) => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ id, message, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(id), 0);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isVisible || !message) return null;

  const messageLines = message.split('\n');
  const isLongMessage = messageLines.length > 3;

  return (
    <div className={`${styles.errorMessage} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.header}>
        <span className={styles.errorIcon}>⚠️</span>
        <button className={styles.closeButton} onClick={handleClose}>
          ×
        </button>
      </div>
      <div className={`${styles.content} ${isExpanded ? styles.expanded : ''}`}>
        {isLongMessage && !isExpanded ? (
          <>
            {messageLines.slice(0, 3).map((line, index) => (
              <p key={index}>{line}</p>
            ))}
            <button className={styles.expandButton} onClick={toggleExpand}>
              Expand
            </button>
          </>
        ) : (
          messageLines.map((line, index) => <p key={index}>{line}</p>)
        )}
      </div>
    </div>
  );
};

export const ErrorContainer: React.FC = () => {
  const { errors, removeError } = useError();

  return (
    <div className={styles.errorContainer}>
      {errors.map((error) => (
        <ErrorMessage
          key={error.id}
          id={error.id}
          message={error.message}
          onClose={removeError}
        />
      ))}
    </div>
  );
};

export default ErrorMessage;