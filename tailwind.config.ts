import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111827',
        mist: '#f6f7fb',
        ember: '#ff5a36',
        tide: '#0f766e',
      },
      boxShadow: {
        soft: '0 24px 80px -32px rgba(17, 24, 39, 0.35)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}

export default config

