import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8EE',
        sunflower: '#F6C544',
        blush: '#F7D6E0',
        brown: '#4A3F35',
        peach: '#FFEFE5',
      },
      fontFamily: {
        script: ['var(--font-script)', 'cursive'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config

