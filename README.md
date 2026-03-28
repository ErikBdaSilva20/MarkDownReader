# 🚀 MarkdownReader — Aprendizado de Projetos

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/GitHub_API-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub API" />
</p>

---

## 📖 Sobre o Projeto

O **MarkdownReader** é uma plataforma moderna e elegante desenvolvida para explorar, ler e estudar documentações técnicas hospedadas no GitHub. Ele transforma repositórios de aprendizado em uma experiência de leitura fluida, com uma interface inspirada no ecossistema do GitHub, mas otimizada para o consumo de conteúdo educacional.

O projeto consome dinamicamente a estrutura de pastas e o conteúdo dos arquivos `.md` do repositório [Aprendizado-Dos-Projetos](https://github.com/ErikBdaSilva20/Aprendizado-Dos-Projetos), permitindo uma navegação hierárquica e intuitiva.

## ✨ Funcionalidades Principais

- 📂 **Exploração Hierárquica**: Navegação por pastas e arquivos diretamente na barra lateral (File Tree).
- 🎨 **Visual GitHub Style**: Renderização de Markdown fiel ao estilo do GitHub (Dark Mode).
- 💻 **Syntax Highlighting**: Realce de sintaxe premium para múltiplos blocos de código usando Dracula Theme.
- ⚡ **Performance Nativa**: Construído sobre Next.js com Server-Side Rendering para carregamento instantâneo.
- 📱 **Design Responsivo**: Experiência otimizada para diferentes tamanhos de tela.
- 🔄 **Sincronização em Tempo Real**: Botão de refresh para atualizar a estrutura de arquivos sem recarregar a página.

## 🛠️ Stack Tecnológica

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: CSS Modules & Tailwind CSS (PostCSS 4)
- **Componentes de UI**: [Lucide React](https://lucide.dev/) (Ícones)
- **Animações**: [Framer Motion](https://www.framer.com/motion/)
- **Renderização Markdown**:
  - `react-markdown`
  - `remark-gfm` (GitHub Flavored Markdown)
  - `github-markdown-css`
- **Realce de Código**: `react-syntax-highlighter` (Prism/Dracula)

## 🚀 Como Executar o Projeto

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/ErikBdaSilva20/MarkdownReader.git
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   # ou
   pnpm install
   ```

3. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env.local` na raiz e adicione seu Token do GitHub para evitar rate limits:

   ```env
   GITHUB_TOKEN=seu_token_aqui
   ```

4. **Inicie o servidor de desenvolvimento**:

   ```bash
   npm run dev
   ```

5. **Acesse**: [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Arquitetura e Decisões Técnicas

O projeto foi estruturado seguindo as melhores práticas de Clean Code e componentização:

- **`src/services/githubApi.ts`**: Centraliza a comunicação com a API do GitHub, realizando o parsing da árvore (Tree) recursiva e normalizando os dados.
- **`src/components/sidebar`**: Implementação de uma Sidebar recursiva que utiliza a API nativa `<details>`/`<summary>` para expansão de pastas com performance máxima.
- **`src/components/markdown`**: Componentes desacoplados para visualização de conteúdo e renderização estilizada.
- **`src/app/learn`**: Roteamento dinâmico utilizando Catch-all segments (`[...slug]`) para mapear caminhos do GitHub para URLs do projeto.

---

## 👨‍💻 Autor

**Erik Borges da Silva**

- GitHub: [@ErikBdaSilva20](https://github.com/ErikBdaSilva20)
- LinkedIn: [Erik Borges Silva](https://www.linkedin.com/in/erik-borgessilva20/)
- WhatsApp: [+55 (54) 99956-6625](https://wa.me/5554999566625)

---

<p align="center">Desenvolvido com Next.js para a comunidade de desenvolvedores.</p>
a
