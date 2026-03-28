/**
 * Dashboard for /learn
 */

export default function LearnIndexPage() {
  return (
    <div style={{ padding: '6rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1
        style={{
          fontSize: '3rem',
          fontWeight: 800,
          marginBottom: '1.5rem',
          background: 'linear-gradient(90deg, #58a6ff, #89b4fa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Aprendizado de Projetos
      </h1>
      <p style={{ fontSize: '1.25rem', opacity: 0.7, lineHeight: 1.6 }}>
        Explore comigo e estude a documentação de projetos diretamente do GitHub com uma interface
        de leitura fluida e organizada.
      </p>
      <div
        style={{
          marginTop: '3rem',
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <h3 style={{ marginBottom: '1rem' }}>Começar Agora</h3>
        <p style={{ opacity: 0.6 }}>👈 Selecione um arquivo na barra lateral para começar a ler.</p>
      </div>
    </div>
  );
}
