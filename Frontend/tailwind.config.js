/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        connect: "url('/src/assets/montagne.jpg')",
      },
    },
  },
  plugins: [],
};
