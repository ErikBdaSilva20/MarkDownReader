/**
 * Service to interact with the GitHub API.
 */

const GITHUB_REPO_OWNER = process.env.NEXT_PUBLIC_GITHUB_REPO_OWNER || 'ErikBdaSilva20';
const GITHUB_REPO_NAME = process.env.NEXT_PUBLIC_GITHUB_REPO_NAME || 'Aprendizado_Dos_Projetos';
const GITHUB_BRANCH = process.env.NEXT_PUBLIC_GITHUB_BRANCH || 'master';
const GITHUB_BASE_URL = 'https://api.github.com';
const GITHUB_RAW_URL = 'https://raw.githubusercontent.com';

export interface GitHubTreeItem {
  path: string;
  mode: string;
  type: 'blob' | 'tree';
  sha: string;
  size?: number;
  url: string;
}

export interface TreeNode {
  name: string;
  path: string;
  type: 'file' | 'dir';
  children?: TreeNode[];
}

/**
 * Fetches the entire repository tree and normalizes it into a nested structure.
 * Only includes .md files and directories containing them.
 */
export async function getRepoTree(): Promise<TreeNode[]> {
  const url = `${GITHUB_BASE_URL}/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/git/trees/${GITHUB_BRANCH}?recursive=1`;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };

  const token = process.env.GITHUB_TOKEN?.trim();
  if (token && token !== 'undefined' && token !== 'null' && token !== '') {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    cache: 'no-store',
    headers,
  });

  if (!response.ok) {
    if (response.status === 404 || response.status === 403) {
      console.error(
        `GitHub API error: ${response.status} at ${url}`,
        `Token present: ${!!process.env.GITHUB_TOKEN}`,
        await response.text()
      );
    }
    throw new Error(`Failed to fetch repo tree: ${response.statusText}`);
  }

  const data = await response.json();
  const tree: GitHubTreeItem[] = data.tree;

  // Build tree structure
  const root: TreeNode[] = [];
  const map = new Map<string, TreeNode>();

  tree.forEach((item) => {
    // Only accept directories or markdown files
    if (item.type === 'blob' && !item.path.toLowerCase().endsWith('.md')) return;

    const parts = item.path.split('/');
    let currentPath = '';

    // Proactively build parent directories to ensure no orphans
    for (let i = 0; i < parts.length - 1; i++) {
      const parentPath = currentPath;
      currentPath = currentPath ? `${currentPath}/${parts[i]}` : parts[i];

      if (!map.has(currentPath)) {
        const dirNode: TreeNode = {
          name: parts[i],
          path: currentPath,
          type: 'dir',
          children: [],
        };
        map.set(currentPath, dirNode);

        if (parentPath === '') {
          root.push(dirNode);
        } else {
          map.get(parentPath)!.children!.push(dirNode);
        }
      }
    }

    // Add exactly if it's a file
    if (item.type === 'blob') {
      const name = parts[parts.length - 1];
      const parentPath = parts.slice(0, -1).join('/');

      const fileNode: TreeNode = {
        name,
        path: item.path,
        type: 'file',
      };

      if (parentPath === '') {
        root.push(fileNode);
      } else {
        map.get(parentPath)!.children!.push(fileNode);
      }
    }
  });

  // Filter out empty directories
  const filterEmptyDirs = (nodes: TreeNode[]): TreeNode[] => {
    return nodes.filter((node) => {
      if (node.type === 'dir') {
        node.children = filterEmptyDirs(node.children || []);
        return node.children.length > 0;
      }
      return true;
    });
  };

  const filteredRoot = filterEmptyDirs(root);

  // Sort: directories first, then alphabetical
  const sortNodes = (nodes: TreeNode[]) => {
    nodes.sort((a, b) => {
      if (a.type === 'dir' && b.type === 'file') return -1;
      if (a.type === 'file' && b.type === 'dir') return 1;
      return a.name.localeCompare(b.name);
    });
    nodes.forEach((node) => {
      if (node.children) sortNodes(node.children);
    });
  };

  sortNodes(filteredRoot);

  // Debug: write tree to file for inspection
  try {
    const fs = require('fs');
    const path = require('path');
    const logPath = path.join(process.cwd(), 'tree-debug.json');
    fs.writeFileSync(logPath, JSON.stringify(filteredRoot, null, 2));
  } catch (err) {
    // Ignore logging errors in production
  }

  return filteredRoot;
}

/**
 * Fetches raw content from a GitHub file.
 */
export async function getRawContent(path: string): Promise<string> {
  const encodedPath = path
    .split('/')
    .map((p) => encodeURIComponent(p))
    .join('/');
  const url = `${GITHUB_RAW_URL}/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/${GITHUB_BRANCH}/${encodedPath}`;
  const response = await fetch(url, {
    cache: 'no-store',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  if (!response.ok) {
    throw new Error(`Failed to fetch raw content: ${response.statusText}`);
  }

  const text = await response.text();
  console.log(`Fetched raw content for ${path}: ${text.length} chars`);
  return text;
}

/**
 * Helper to find a node by its path in the tree
 */
export function findNodeByPath(nodes: TreeNode[], targetPath: string): TreeNode | null {
  for (const node of nodes) {
    if (node.path === targetPath) return node;
    if (node.children) {
      const found = findNodeByPath(node.children, targetPath);
      if (found) return found;
    }
  }
  return null;
}
