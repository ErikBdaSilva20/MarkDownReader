import { getRepoTree } from '@/services/githubApi';
import { ClientLayoutWrapper } from '@/components/layout/ClientLayoutWrapper';

export const dynamic = 'force-dynamic';

export default async function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch full nested contents for the sidebar
  const sidebarItems = await getRepoTree();

  return (
    <ClientLayoutWrapper sidebarItems={sidebarItems}>
      {children}
    </ClientLayoutWrapper>
  );
}
