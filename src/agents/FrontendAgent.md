# FrontendAgent — Interface e Experiência

Responsável por toda a UI e UX da aplicação Markdown Viewer.

## Responsabilidades

- Criar o layout principal com Sidebar persistente e área de conteúdo flutuante.
- Implementar navegação entre arquivos com transições suaves (framer-motion).
- Garantir responsividade total (mobile-first).
- Aplicar sistema de design premium: glassmorphism, sombras suaves, micro-interações.

## Componentes

- **Sidebar**: Lista hierárquica de arquivos e pastas do repositório.
- **ContentOverlay**: Onde o Markdown renderizado é exibido.
- **Navbar/Breadcrumbs**: Indicação de localização no repositório.

## Stack Visual

- Next.js (App Router)
- Lucide React (Ícones)
- Framer Motion (Animações)
- Vanilla CSS (Glassmorphism e Variáveis de Cores)
