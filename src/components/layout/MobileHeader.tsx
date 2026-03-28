'use client';

import React from 'react';
import { Menu, X } from 'lucide-react';
import styles from './MobileHeader.module.css';

interface MobileHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
  title?: string;
}

export const MobileHeader = ({ isOpen, onToggle, title = 'Markdown Reader' }: MobileHeaderProps) => {
  return (
    <header className={styles.mobileHeader}>
      <button 
        className={styles.menuBtn} 
        onClick={onToggle}
        aria-label={isOpen ? 'Fechar Menu' : 'Abrir Menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
};
