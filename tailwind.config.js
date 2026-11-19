/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        institutional: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        crest: {
          navy: '#0d1f3c',
          deep: '#071326',
          blue: '#1a365d',
          gold: '#c59b27',
          goldLight: '#e4b849',
          goldDark: '#9a7516',
          maroon: '#6e1a24',
          slate: '#3b4856'
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'seal': '0 4px 20px -2px rgba(13, 31, 60, 0.15)',
        'elevated': '0 10px 30px -4px rgba(13, 31, 60, 0.08), 0 4px 6px -2px rgba(13, 31, 60, 0.03)'
      }
    },
  },
  plugins: [],
}
