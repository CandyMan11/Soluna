const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          50: "var(--color-apple-50)",
          100: "var(--color-apple-100)",
          200: "var(--color-apple-200)",
          300: "var(--color-apple-300)",
          400: "var(--color-apple-400)",
          500: "var(--color-apple-500)",
          600: "var(--color-apple-600)",
          700: "var(--color-apple-700)",
          800: "var(--color-apple-800)",
          900: "var(--color-apple-900)",
          950: "var(--color-apple-950)",
        },
        "sky-blue": {
          50: "var(--color-sky-blue-50)",
          100: "var(--color-sky-blue-100)",
          200: "var(--color-sky-blue-200)",
          300: "var(--color-sky-blue-300)",
          400: "var(--color-sky-blue-400)",
          500: "var(--color-sky-blue-500)",
          600: "var(--color-sky-blue-600)",
          700: "var(--color-sky-blue-700)",
          800: "var(--color-sky-blue-800)",
          900: "var(--color-sky-blue-900)",
          950: "var(--color-sky-blue-950)",
        },
      },
    },
  },
  plugins: [],
};
