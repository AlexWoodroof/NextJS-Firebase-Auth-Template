// src/components/Dashboard/Widgets/BaseWidget.tsx
import React, { useState } from 'react';
import { ArrowsPointingOutIcon, ArrowsPointingInIcon } from '@heroicons/react/24/outline';
import styles from './Widget.module.css';

interface BaseWidgetProps {
  title: string;
  isExpandable: boolean;
  onExpand?: () => void;
  children: React.ReactNode;
}

const BaseWidget: React.FC<BaseWidgetProps> = ({ title, isExpandable, onExpand, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    console.log('Expanding...');
    if (isExpandable) {
      setIsExpanded(!isExpanded);
      if (onExpand) onExpand();
    }
  };

  return (
    <div className={`${styles.widget} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.widgetHeader} onClick={handleExpand}>
        <span>{title}</span>
        {isExpandable && (
          <button className={styles.expandButton}>
            {isExpanded ? <ArrowsPointingInIcon /> : <ArrowsPointingOutIcon />}
          </button>
        )}
      </div>
      <div className={styles.widgetContent}>
        {children}
      </div>
    </div>
  );
};

export default BaseWidget;