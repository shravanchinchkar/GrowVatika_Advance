/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-bg":
          "linear-gradient(90deg, #56A430 34.13%, #8EB961 62.02%, #B6C783 83.17%, #C4CD90 99.99%, #DBD5A4 100%)",
      },

      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Unbounded: ["Unbounded", "sans-serif"],
      },
    },
  },
  plugins: [],
};
