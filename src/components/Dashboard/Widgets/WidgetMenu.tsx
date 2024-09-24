// src/components/Dashboard/Widgets/WidgetMenu.tsx
import React, { useState, useRef, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import './WidgetMenu.css';

interface WidgetMenuProps {
  availableWidgets: { id: string; name: string }[];
  activeWidgets: string[];
  onAddWidget: (widgetId: string) => void;
  onRemoveWidget: (widgetId: string) => void;
  isEditMode: boolean;
}

const WidgetMenu: React.FC<WidgetMenuProps> = ({
  availableWidgets,
  activeWidgets,
  onAddWidget,
  onRemoveWidget,
  isEditMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isEditMode) return null;

  return (
    <div className="widget-menu" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="icon-button"
        type="button"
        aria-label="Widget menu"
      >
        <PlusIcon className="icon" />
      </button>
      {isOpen && (
        <div className="widget-dropdown">
          <h3>Widgets</h3>
          {availableWidgets.map((widget) => (
            <label key={widget.id} className="widget-checkbox">
              <input
                type="checkbox"
                checked={activeWidgets.includes(widget.id)}
                onChange={() => {
                  if (activeWidgets.includes(widget.id)) {
                    onRemoveWidget(widget.id);
                  } else {
                    onAddWidget(widget.id);
                  }
                }}
              />
              {widget.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default WidgetMenu;