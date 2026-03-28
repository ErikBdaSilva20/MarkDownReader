'use client';

import React, { useEffect, useState } from 'react';
import type { TreeNode } from '@/services/githubApi';
import { ChevronRight, FileText, Folder, FolderOpen, Home, MessageCircle, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Sidebar.module.css';

interface SidebarProps {
  items: TreeNode[];
  title?: string;
  className?: string;
}

interface SidebarNodeProps {
  node: TreeNode;
  level?: number;
}

const SidebarNode = ({ node, level = 0 }: SidebarNodeProps) => {
  const pathname = (usePathname() as string) || '/learn';
  const decodedPathname = decodeURIComponent(pathname);

  const pathParts = decodedPathname.split('/').filter(Boolean);
  const currentPath = pathParts.slice(1).join('/'); 
  
  const isActive = currentPath === node.path;
  const isChildActive = node.type === 'dir' && (currentPath + '/').startsWith(node.path + '/');

  const [isOpen, setIsOpen] = useState(isChildActive);

  // Sync state if isChildActive changes (e.g. navigation)
  useEffect(() => {
    if (isChildActive) setIsOpen(true);
  }, [isChildActive]);

  if (node.type === 'dir') {
    return (
      <details 
        className={styles.nodeContainer} 
        open={isOpen || undefined}
        onToggle={(e: any) => setIsOpen(e.currentTarget.open)}
      >
        <summary
          className={`${styles.item} ${isActive ? styles.itemActive : ''} ${isChildActive && !isActive ? styles.itemChildActive : ''}`}
          style={{ 
            paddingLeft: `${level * 12 + 12}px`,
            listStyle: 'none',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          {isOpen ? (
            <FolderOpen size={16} style={{ color: '#f6c177', marginRight: '8px' }} />
          ) : (
            <Folder size={16} style={{ color: '#f6c177', marginRight: '8px' }} />
          )}
          <span className={styles.itemName}>{node.name}</span>
          <div
            className={styles.chevron}
            style={{ 
              marginLeft: 'auto', 
            }}
          >
            <ChevronRight size={14} />
          </div>
        </summary>

        <div className={styles.childrenWrapper}>
          {node.children && node.children.length > 0 ? (
            node.children.map((child: TreeNode) => (
              <SidebarNode key={child.path} node={child} level={level + 1} />
            ))
          ) : (
            <div style={{ paddingLeft: `${(level + 1) * 12 + 12}px`, fontSize: '0.75rem', opacity: 0.5, padding: '4px 0' }}>
              (Vazio)
            </div>
          )}
        </div>
      </details>
    );
  }

  return (
    <div className="file-node">
      <Link
        href={`/learn/${node.path}`}
        className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
        style={{ paddingLeft: `${level * 12 + 12}px`, display: 'flex', alignItems: 'center' }}
      >
        <FileText size={16} style={{ color: '#89b4fa', marginRight: '8px' }} />
        <span className={styles.itemName} title={node.name}>{node.name.replace('.md', '')}</span>
      </Link>
    </div>
  );
};

export const Sidebar = ({ items, title = 'Docs', className = '' }: SidebarProps) => {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <aside className={`${styles.sidebar} ${className}`}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerTitle}>
            <Home size={18} />
            <span>{title}</span>
          </div>
          <button
            className={styles.refreshBtn}
            onClick={handleRefresh}
            title="Recarregar Sidebar"
          >
            <RefreshCcw size={16} className={isRefreshing ? styles.spinning : ''} />
          </button>
        </div>
      </header>

      <nav className={styles.nav}>
        {items.map((item: TreeNode) => (
          <SidebarNode key={item.path} node={item} />
        ))}
      </nav>

      <footer className={styles.footer}>
        <div className={styles.socialTitle}>Contatos</div>
        <div className={styles.socialLinks}>
          <a
            href="https://github.com/ErikBdaSilva20"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialItem}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4" /><path d="M9 20a5 5 0 0 1-5-1.5 5 5 0 0 1-1-3" /></svg>
          </a>
          <a
            href="https://www.linkedin.com/in/erik-borgessilva20/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialItem}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
          </a>
          <a
            href="https://wa.me/5554999566625"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialItem}
          >
            <MessageCircle size={18} />
          </a>
        </div>
      </footer>
    </aside>
  );
};
