/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    screens: {
      sm: "380px",
      md: "740px",
      lg: "1440px",
    },
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
      square: "square",
    },
    darkMode: "class",
    extend: {
      keyframes: {
        'tilt-animation': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(30deg)' },
        },
        'question-mark': {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        'tilt': 'tilt-animation 2s infinite',
        'question-fade': 'question-mark 2s infinite',
      },
    },
  },
  plugins: [],
};
