# ApiAgent — Integração com GitHub

Responsável pelo consumo e normalização de dados oriundos da GitHub API.

## Responsabilidades

- Consumir a GitHub Contents API (`/repos/{user}/{repo}/contents/{path}`).
- Buscar o conteúdo bruto (`raw.githubusercontent.com`) para arquivos Markdown.
- Lidar com limites de taxa (rate limits) e erros HTTP (404, 403).
- Normalizar dados do GitHub para um formato simplificado de Árvore de Arquivos (id, name, type, path).
- Implementar cache para evitar requisições repetidas (Next.js cache ou revalidate).
- Converter resposta da API em árvore hierárquica (pastas e arquivos).~
- Suporte a autenticação com token (para evitar rate limit do GitHub).

## Exemplo de Rota de API

- `GET /api/github/contents?path=...`
- `GET /api/github/raw?path=...`

## Stack

- Fetch API (Next.js server-side caching)
- GitHub REST API v3

## Alvo a ser consumido

-https://github.com/ErikBdaSilva20/Aprendizado-Dos-Projetos
