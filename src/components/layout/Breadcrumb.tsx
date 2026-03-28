import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { Fragment } from 'react';
import styles from './Breadcrumb.module.css';

interface BreadcrumbProps {
  pathParts: string[];
}

export const Breadcrumbs: React.FC<BreadcrumbProps> = ({ pathParts }) => {
  return (
    <nav className={styles.container}>
      <Link href="/learn" className={styles.item}>
        <Home size={16} />
      </Link>
      
      {pathParts.map((part, index) => {
        const isLast = index === pathParts.length - 1;
        const decodedPart = decodeURIComponent(part);
        
        return (
          <Fragment key={index}>
            <ChevronRight size={14} className={styles.separator} />
            {isLast ? (
              <span className={styles.lastItem}>{decodedPart}</span>
            ) : (
              <span className={styles.item}>{decodedPart}</span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
};
