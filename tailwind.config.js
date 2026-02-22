/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        electric: '#2563ff',
        cyanGlow: '#22d3ee',
      },
      borderRadius: {
        glass: '2.5rem',
      },
      boxShadow: {
        neon: '0 0 40px rgba(34, 211, 238, 0.22)',
      },
    },
  },
  plugins: [],
}
