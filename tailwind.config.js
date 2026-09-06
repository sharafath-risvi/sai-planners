/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-navy': '#282D7F',
        'brand-gold': '#FCAE16',
        'brand-black': '#0A0A0D',
        'brand-soft-grey': '#F3F3F5',
        'brand-dark-grey': '#15161B',
        'brand-muted-grey': '#737373',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        growLine: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        marqueeLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333333%)' },
        },
        marqueeRight: {
          '0%': { transform: 'translateX(-33.333333%)' },
          '100%': { transform: 'translateX(0)' },
        },
        marqueeUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        }
      },
      animation: {
        'marquee-left': 'marqueeLeft 40s linear infinite',
        'marquee-right': 'marqueeRight 40s linear infinite',
        'marquee-up': 'marqueeUp 40s linear infinite',
      }
    },
  },
  plugins: [],
}
