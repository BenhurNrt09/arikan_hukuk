import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f3f8',
          100: '#d9e1f0',
          200: '#b0c3e1',
          300: '#8da5d3',
          400: '#6487c4',
          500: '#3d5a9f', // Navy Blue - Primary
          600: '#2d4480',
          700: '#1d2e60',
          800: '#131d3f',
          900: '#0c1525',
        },
        accent: {
          50: '#fffbf0',
          100: '#fff5d9',
          200: '#ffe9b0',
          300: '#ffdd8d',
          400: '#ffd166', // Gold/Yellow - Accent
          500: '#ffc83d',
          600: '#e6b800',
          700: '#b38f00',
          800: '#806600',
          900: '#4d3d00',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #3d5a9f 0%, #2d4480 100%)',
        'gradient-accent': 'linear-gradient(135deg, #ffd166 0%, #ffdd8d 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
