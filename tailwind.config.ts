import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta do projeto
        navy: '#1B2A4A', // azul marinho — cor principal
        slate: '#2C3E50', // ardósia
        indigo: '#233A4E', // azul índigo — hover do botão principal
        surface: '#F7F8FA', // fundo secundário
        ink: '#1A1A1A', // texto principal
        muted: '#6B7280', // texto secundário
        line: '#E5E7EB', // bordas
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1180px',
        prose: '68ch',
      },
      borderRadius: {
        card: '10px',
      },
      letterSpacing: {
        eyebrow: '0.08em',
      },
    },
  },
  plugins: [],
};

export default config;
