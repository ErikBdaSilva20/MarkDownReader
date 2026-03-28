import { getRawContent, getRepoTree, findNodeByPath } from '@/services/githubApi';
import { MarkdownViewer } from '@/components/markdown/MarkdownViewer';
import { Breadcrumbs } from '@/components/layout/Breadcrumb';
import { notFound } from 'next/navigation';
import { DirectoryViewer } from '@/components/markdown/DirectoryViewer';

interface LearnPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function LearnPage({ params }: LearnPageProps) {
  const { slug } = await params;
  
  // Create path directly from slugs (they are usually url-encoded)
  const path = slug.map(part => decodeURIComponent(part)).join('/');

  const isMarkdown = path.endsWith('.md');
  
  try {
    if (!isMarkdown) {
      const tree = await getRepoTree();
      const node = findNodeByPath(tree, path);

      if (!node || node.type !== 'dir') {
        return notFound();
      }

      // Look for a README file inside the directory
      const readmeNode = node.children?.find(c => c.name.toLowerCase() === 'readme.md');
      let readmeContent = '';
      if (readmeNode) {
         try {
           readmeContent = await getRawContent(readmeNode.path);
         } catch {
           console.error("Failed to load generic README");
         }
      }

      return (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', paddingBottom: '3rem' }}>
          <Breadcrumbs pathParts={slug} />
          <DirectoryViewer node={node} readmeContent={readmeContent} />
        </div>
      );
    }

    const content = await getRawContent(path);

    return (
      <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Breadcrumbs pathParts={slug} />
        <MarkdownViewer content={content} />
      </div>
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}
