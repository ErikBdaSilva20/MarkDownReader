'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { MobileHeader } from './MobileHeader';
import type { TreeNode } from '@/services/githubApi';
import styles from '@/app/learn/LearnLayout.module.css';
import sidebarStyles from '@/components/sidebar/Sidebar.module.css';

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
  sidebarItems: TreeNode[];
}

export const ClientLayoutWrapper = ({ children, sidebarItems }: ClientLayoutWrapperProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on navigation (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className={styles.container}>
      <MobileHeader 
        isOpen={isSidebarOpen} 
        onToggle={toggleSidebar} 
        title="Aprendizado de Projetos" 
      />
      
      {/* Sidebar with visibility class for mobile */}
      <Sidebar 
        items={sidebarItems} 
        title="Aprendizado de Projetos" 
        className={isSidebarOpen ? sidebarStyles.sidebarVisible : ''}
      />

      {/* Backdrop for mobile - click to close */}
      <div 
        className={`${styles.backdrop} ${isSidebarOpen ? styles.backdropVisible : ''}`}
        onClick={closeSidebar}
      />

      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};
