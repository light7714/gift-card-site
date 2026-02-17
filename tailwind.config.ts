import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        blush: '#ff4d6d',
        twilight: '#3b82f6'
      },
      boxShadow: {
        glass: '0 20px 60px -20px rgba(0, 0, 0, 0.45)'
      }
    }
  },
  plugins: []
};

export default config;
