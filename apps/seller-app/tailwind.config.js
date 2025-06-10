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
      boxShadow: {
        "seller-header-custom": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
      backgroundImage: {
        "custom-bg":
          "linear-gradient(90deg, #56A430 34.13%, #8EB961 62.02%, #B6C783 83.17%, #C4CD90 99.99%, #DBD5A4 100%)",
      },

      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Unbounded: ["Unbounded", "sans-serif"],
      },
      colors: {
        "custom-fill": "#FFF6F4",
      },
      dropShadow: {
        custom: "0px 3.2px 15px rgba(0, 0, 0, 0.25)",
      },
      keyframes: {
        "bg-bounce-in-1": {
          "0%": {
            backgroundColor: "#FFF6F4",
            transform: "translateY(-10px)",
          },
          "50%": {
            backgroundColor: "#FFF6F4",
            transform: "translateY(5px)",
          },
          "100%": {
            backgroundColor: "#FFF6F4",
            transform: "translateY(0)",
          },
        },

        "bg-bounce-in-new-2": {
          "0%": {
            backgroundColor: "#56A430",
            transform: "translateY(-10px)",
          },
          "50%": {
            backgroundColor: "#56A430",
            transform: "translateY(5px)",
          },
          "100%": {
            backgroundColor: "#56A430",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "bg-bounce-in": "bg-bounce-in-1 0.5s ease-out 1",
        "bg-bounce-in-2":"bg-bounce-in-new-2 0.5s ease-out 1"
      },
    },
  },
  plugins: [],
};
