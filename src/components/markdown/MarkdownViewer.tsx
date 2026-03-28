'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'github-markdown-css/github-markdown-dark.css';
import styles from './MarkdownViewer.module.css';

interface MarkdownViewerProps {
  content: string;
}

export const MarkdownViewer = ({ content }: MarkdownViewerProps) => {
  return (
    <div className={`${styles.markdownWrapper} markdown-body`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
               <div className="code-block-container" style={{ position: 'relative', margin: '1.5rem 0' }}>
                 <div style={{ 
                    position: 'absolute', 
                    top: '-12px', 
                    right: '12px', 
                    fontSize: '10px', 
                    fontWeight: 600,
                    textTransform: 'uppercase', 
                    background: '#6272a4',
                    color: '#f8f8f2',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    zIndex: 10
                  }}>
                    {match[1]}
                 </div>
                 <SyntaxHighlighter
                    {...props}
                    style={dracula}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      borderRadius: '8px',
                      fontSize: '14px',
                      background: '#282a36',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
               </div>
            ) : (
              <code className={className} {...props} style={{ background: 'rgba(98, 114, 164, 0.2)', padding: '2px 6px', borderRadius: '4px', color: '#50fa7b' }}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
