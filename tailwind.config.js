/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#081F1D",
        background: "#F9FEFD",
        primary: "#BC93E5",
        secondary: "#DA68D1",
        accent: "#33CDB2",
      },
    },
  },
  plugins: [],
};
