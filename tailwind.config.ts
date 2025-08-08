import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-open-sans)", "sans-serif"],
        quicksand: ["var(--font-quicksand)", "var(--font-open-sans)", "sans-serif"],
      },
      colors: {
        primary: "#e03",
        background: "var(--background)",
        foreground: "var(--foreground)",
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
      keyframes: {
        loading: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        loading: 'loading 1s ease-in-out infinite'
      },
      aspectRatio: {
        '1/1': '1 / 1',
        '16/9': '16 / 9',
        '9/16': '9 / 16',
      }
    },
  },
  plugins: [],
};
export default config;
