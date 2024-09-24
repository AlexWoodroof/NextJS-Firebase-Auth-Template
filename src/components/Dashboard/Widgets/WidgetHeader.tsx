import React, { useState, useEffect } from 'react';
import { ArrowsPointingOutIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from './Widgets.module.css';
import { getWatchlist } from '@/utils/firebase/firestore/watchlistManagement';
import { getCurrentUser } from '@/utils/firebase/auth';

interface WidgetHeaderProps {
  title: string;
  isEditMode: boolean;
  onRemove: () => void;
  detailPath: string;
  selectedInstrument: string;
  onInstrumentChange: (instrument: string) => void;
  showInstrumentDropdown?: boolean;
}

const WidgetHeader: React.FC<WidgetHeaderProps> = ({
  title,
  isEditMode,
  onRemove,
  detailPath,
  selectedInstrument,
  onInstrumentChange,
  showInstrumentDropdown = false,
}) => {
  const [symbols, setSymbols] = useState<{ symbol: string; name: string; }[]>([]);

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          const watchlist = await getWatchlist(user.uid);
          setSymbols(watchlist.map(symbol => ({ symbol, name: symbol })));
        }
      } catch (error) {
        console.error('Error fetching symbols:', error);
      }
    };

    fetchSymbols();
  }, []);

  return (
    <div className={styles.widgetHeader}>
      <span>{title}</span>
      <div className={styles.widgetHeaderActions}>
        {!isEditMode && (
          <>
            {showInstrumentDropdown && (
              <select
                onChange={(e) => onInstrumentChange(e.target.value)}
                value={selectedInstrument}
                className={styles.instrumentDropdown}
                aria-label="Select an instrument"
              >
                <option value="">Auto Rotate</option>
                {symbols.map((s) => (
                  <option key={s.symbol} value={s.symbol}>{s.name}</option>
                ))}
              </select>
            )}
            <Link href={detailPath} passHref>
              <button
                type="button"
                className={styles.expandWidget}
                aria-label={`Expand ${title} widget`}
              >
                <ArrowsPointingOutIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </Link>
          </>
        )}
        {isEditMode && (
          <button 
            className={styles.removeWidget} 
            onClick={onRemove} 
            aria-label={`Remove ${title} widget`}
          >
            <TrashIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};

export default WidgetHeader;