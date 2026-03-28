import React from 'react';
import { Folder, FileText } from 'lucide-react';
import Link from 'next/link';
import { MarkdownViewer } from './MarkdownViewer';
import type { TreeNode } from '@/services/githubApi';

interface DirectoryViewerProps {
  node: TreeNode;
  readmeContent?: string;
}

export const DirectoryViewer = ({ node, readmeContent }: DirectoryViewerProps) => {
  const children = node.children || [];

  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: '#0d1117', overflow: 'hidden' }}>
        <div style={{ padding: '16px', backgroundColor: '#161b22', borderBottom: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 600, color: '#e6edf3' }}>{node.name}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {children.map((child: TreeNode, index: number) => (
            <Link
              key={child.path}
              href={`/learn/${child.path}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderBottom: index !== children.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                textDecoration: 'none',
                transition: 'background-color 0.2s',
                backgroundColor: 'transparent'
              }}
              className="dir-item"
            >
              {child.type === 'dir' ? (
                <Folder size={18} fill="#54aeff" color="#54aeff" />
              ) : (
                <FileText size={18} color="#e6edf3" />
              )}
              <span style={{ color: '#e6edf3', fontSize: '14px' }}>
                {child.name}
              </span>
            </Link>
          ))}
          {children.length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: '#8b949e', fontSize: '14px' }}>
              Este diretório está vazio.
            </div>
          )}
        </div>
      </div>

      {readmeContent && (
        <div style={{ borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: '#0d1117', overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', backgroundColor: '#161b22', borderBottom: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
             <FileText size={16} color="#e6edf3" />
             <span style={{ fontWeight: 600, color: '#e6edf3', fontSize: '14px' }}>README.md</span>
          </div>
          <MarkdownViewer content={readmeContent} />
        </div>
      )}

      <style>{`
        .dir-item:hover {
          background-color: rgba(255, 255, 255, 0.05) !important;
        }
      `}</style>
    </div>
  );
};
