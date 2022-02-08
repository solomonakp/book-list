const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        fogra: '#00171f',
        crayola: '#00A7E1',
        prussian: '#003459',
        cg: '#007EA7',
      },
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
