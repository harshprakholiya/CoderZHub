/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          50: '#F0F7FF',
          100: '#C2E0FF',
          200: '#99CCF3',
          300: '#66B2FF',
          400: '#3399FF',
          500: '#007FFF',
          600: '#0072E5',
          700: '#0059B2',
          800: '#004C99',
          900: '#003A75',
          "main": '#3399FF',
        },
        secondary: {
          50: '#F3F6F9',
          100: '#E5EAF2',
          200: '#DAE2ED',
          300: '#C7D0DD',
          400: '#B0B8C4',
          500: '#9DA8B7',
          600: '#6B7A90',
          700: '#434D5B',
          800: '#303740',
          900: '#1C2025',
          "main": '#1F262E',
        },
        primaryDark: {
          50: '#EAEDF1',
          100: '#DAE0E7',
          200: '#ACBAC8',
          300: '#7B91A7',
          400: '#4B5E71',
          500: '#3B4A59',
          600: '#2F3A46',
          700: '#1F262E',
          800: '#141A1F',
          900: '#101418',
          "main": '#7B91A7',
        },
        background: {
          "default": '#101418',
          "paper": 'rgba(20, 26, 31, 0.8)',
        },
        grey: {
          50: '#F3F6F9',
          100: '#E5EAF2',
          200: '#DAE2ED',
          300: '#C7D0DD',
          400: '#B0B8C4',
          500: '#9DA8B7',
          600: '#6B7A90',
          700: '#434D5B',
          800: '#303740',
          900: '#1C2025',
        },
        error: { 
          500: '#FF505F',
        },
        gradients: {
          "lightGrayRadio": 'radial-gradient(50% 50% at 50% 50%, #F0F7FF 0%, rgba(240, 247, 255, 0.05) 100%)',
          "stylizedRadio": 'linear-gradient(rgba(0 0 0 / 0.1), rgba(0 0 0 / 0.1)), linear-gradient(254.86deg, rgba(0, 58, 117, 0.18) 0%, rgba(11, 13, 14, 0.3) 49.98%, rgba(0, 76, 153, 0.21) 100.95%)',
          "linearSubtle": 'linear-gradient(to top right, rgba(0, 58, 117, 0.1) 40%, rgba(20, 26, 31, 0.2) 100%)',
        },
        divider: 'rgba(59, 74, 89, 0.05)',
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        spaceGrotesk: ["var(--font-spaceGrotesk)"],
      },
      boxShadow: {
        "light-100":
          "0px 12px 20px 0px rgba(184, 184, 184, 0.03), 0px 6px 12px 0px rgba(184, 184, 184, 0.02), 0px 2px 4px 0px rgba(184, 184, 184, 0.03)",
        "light-200": "10px 10px 20px 0px rgba(218, 213, 213, 0.10)",
        "light-300": "-10px 10px 20px 0px rgba(218, 213, 213, 0.10)",
        "dark-100": "0px 2px 10px 0px rgba(46, 52, 56, 0.10)",
        "dark-200": "2px 0px 20px 0px rgba(39, 36, 36, 0.04)",
      },
      backgroundImage: {
        "auth-dark": "url('/assets/images/auth-bg-dark.png')",
        "auth-light": "url('/assets/images/auth-bg-light.png')",
      },
      screens: {
        xs: "420px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      }
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};