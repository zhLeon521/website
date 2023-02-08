/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  // 加入 darkMode
  darkMode: 'class',
  theme: {
    colors: {
      'hong-fg': 'var(--hong-fg)',
      'hong-bg': 'var(--hong-bg)',
      'accent-1': 'var(--accent-1)',
      'accent-2': 'var(--accent-2)',
      'accent-3': 'var(--accent-3)',
      'accent-4': 'var(--accent-4)',
      'accent-5': 'var(--accent-5)',
      'accent-6': 'var(--accent-6)',
      'accent-7': 'var(--accent-7)',
      'accent-8': 'var(--accent-8)',
      'theme-1': 'var(--theme-1)',
      'theme-2': 'var(--theme-2)',
      'theme-3': 'var(--theme-3)',
      'theme-4': 'var(--theme-4)',
      'theme-5': 'var(--theme-5)',
      'theme-6': 'var(--theme-6)',
      'theme-7': 'var(--theme-7)',
      'theme-8': 'var(--theme-8)',
      'theme-9': 'var(--theme-9)',
      'theme-10': 'var(--theme-10)',
      'theme-11': 'var(--theme-11)',
      'theme-12': 'var(--theme-12)',
    },
    extend: {
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

  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/line-clamp')],
};
