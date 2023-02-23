/** @type {import('tailwindcss').Config} */
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
      mono: ['monospace'],
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
              scrollMarginTop: '90px',

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
  ],
};
