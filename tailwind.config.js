/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layout/*.{js,jsx,ts,tsx}',
  ],
  // 加入 darkMode
  darkMode: 'class',
  theme: {
    // add new Font
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      sarina: ['Sarina', 'cursive'],
      barlow: ['Barlow', 'sans-serif'],
      sans: ['Inter', ...fontFamily.sans],

      FiraCode: ['Fira Code', 'sans-serif'],
      LXGWBrightRegular: ['LXGWBright Regular', 'sans-serif'],
      LXGWBrightMedium: ['LXGWBright Medium', 'sans-serif'],
      LXGWBrightItalic: ['LXGWBright Italic', 'sans-serif'],
      LXGWBrightMediumItalic: ['LXGWBright MediumItalic', 'sans-serif'],
    },

    // colors: {
    //   'hong-fg': 'var(--hong-fg)',
    //   'hong-bg': 'var(--hong-bg)',
    //   'accent-1': 'var(--accent-1)',
    //   'accent-2': 'var(--accent-2)',
    //   'accent-3': 'var(--accent-3)',
    //   'accent-4': 'var(--accent-4)',
    //   'accent-5': 'var(--accent-5)',
    //   'accent-6': 'var(--accent-6)',
    //   'accent-7': 'var(--accent-7)',
    //   'accent-8': 'var(--accent-8)',
    //   'theme-1': 'var(--theme-1)',
    //   'theme-2': 'var(--theme-2)',
    //   'theme-3': 'var(--theme-3)',
    //   'theme-4': 'var(--theme-4)',
    //   'theme-5': 'var(--theme-5)',
    //   'theme-6': 'var(--theme-6)',
    //   'theme-7': 'var(--theme-7)',
    //   'theme-8': 'var(--theme-8)',
    //   'theme-9': 'var(--theme-9)',
    //   'theme-10': 'var(--theme-10)',
    //   'theme-11': 'var(--theme-11)',
    //   'theme-12': 'var(--theme-12)',
    // },
    extend: {
      colors: {
        darkPrimary: '#181A1B',
        darkSecondary: '#25282A',
        darkWhite: '#f2f5fa',
        'dark-3': '#b8b8b8',

        accent: 'var(--color-accent)',
        fore: {
          primary: 'var(--color-fore-primary)',
          secondary: 'var(--color-fore-secondary)',
          subtle: 'var(--color-fore-subtle)',
        },
        back: {
          primary: 'var(--color-back-primary)',
          secondary: 'var(--color-back-secondary)',
          subtle: 'var(--color-back-subtle)',
          accent: 'var(--color-back-accent)',
        },
        teal: colors.teal,
      },
      letterSpacing: {
        widestest: '0.2em',
      },
      backgroundSize: {
        200: '150%',
      },
      outline: {
        accent: ['2px dotted var(--color-accent)', '2px'],
      },
      animation: {
        'blob-spin': 'blobbing 25s linear infinite',
      },
      keyframes: {
        blobbing: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
      },
      listStyleType: {
        square: 'square',
        roman: 'upper-roman',
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        'photo-spin': 'photo-spin 2s 1 linear forwards',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'photo-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      screens: {
        // Custom Screen styles
        '3xl': '2000px',
        xs: '480px',
      },

      typography: () => ({
        DEFAULT: {
          css: {
            a: {
              textDecoration: 'none',
            },
            'h1, h2, h3, h4, h5, h6': {
              position: 'relative',

              '& a::before': {
                content: 'none !important',
              },
            },
            img: {
              margin: '24px auto',
            },
          },
        },
      }),
    },
  },
  // Adding Tailwind Plugins
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
