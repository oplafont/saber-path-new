import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['var(--font-orbitron)'],
        sans: ['var(--font-inter)'],
      },
      colors: {
        jedi: {
          blue: '#5ec8f2',
          green: '#7ff07f',
          purple: '#a287f4',
          red: '#f25757',
          gold: '#f2c94c',
        },
      },
    },
  },
  plugins: [],
};

export default config;