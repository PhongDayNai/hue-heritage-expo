import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        hueRed: '#7a1f1f',
        hueGold: '#c49b3d',
        hueInk: '#1f1a17',
        hueBg: '#fdfaf5'
      },
      boxShadow: {
        glow: '0 10px 40px rgba(196,155,61,0.25)'
      }
    }
  },
  plugins: []
};

export default config;
