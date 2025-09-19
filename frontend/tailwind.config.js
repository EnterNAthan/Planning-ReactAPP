/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🎨 PALETTE STYLE SHADCN (compatible v3)
        background: '#ffffff',
        foreground: '#0f172a',

        primary: {
          DEFAULT: '#0f172a',
          foreground: '#f8fafc',
        },

        secondary: {
          DEFAULT: '#f1f5f9',
          foreground: '#0f172a',
        },

        muted: {
          DEFAULT: '#f1f5f9',
          foreground: '#64748b',
        },

        accent: {
          DEFAULT: '#f1f5f9',
          foreground: '#0f172a',
        },

        card: {
          DEFAULT: '#ffffff',
          foreground: '#0f172a',
        },

        border: '#e2e8f0',
        input: '#e2e8f0',
        ring: '#0f172a',

        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#f8fafc',
        },
      },
    },
  },
  plugins: [],
}
