/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  // 加入 darkMode
  darkMode: 'class',
  theme: {
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

  plugins: [require('@tailwindcss/typography')],
};
