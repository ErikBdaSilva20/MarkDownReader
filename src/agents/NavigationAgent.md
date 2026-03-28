# NavigationAgent — Estrutura e Rotas

Responsável por mapear a estrutura do repositório para rotas Next.js.

## Responsabilidades
- Criar rotas dinâmicas: `src/app/learn/[...slug]`.
- Mapear a estrutura de pastas do GitHub para um formato navegável.
- Gerenciar o estado de arquivos e pastas no Sidebar e Breadcrumbs.
- Facilitar a navegação sequencial (Próximo / Anterior) no futuro.

## Rotas
- `/`: Dashboard do Repositório (opcional, ou redirecionar para Learn).
- `/learn/*`: Visualizador de arquivos Markdown.

## Stack
- Next.js (App Router, Dynamic Catch-all Segments)
- URL State Management (Search Params ou Path Params)
