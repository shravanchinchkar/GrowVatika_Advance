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
      screens: {
        "new-lg": "1153px",
        "new-xl": "1356px",
      },
      boxShadow: {
        editButton: "0px 0px 2px 5px #FF4B4B",
        "seller-header-custom": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        "custom-boxshadow": "0px 1.282px 12.818px -0.32px rgba(0, 0, 0, 0.25)",
        "explore-custom": "10px 10px 59px #85A947",
      },
      backgroundImage: {
        "button-custom-gradient":
          "linear-gradient(297deg, rgba(100, 145, 115, 0.53) 14.21%, rgba(219, 213, 164, 0.53) 86.53%)",
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
        "3xl": "0 5px 5px rgba(0, 0, 0, 0.75)",
        "4xl": "0 15px 25px rgba(0, 0, 0, 0.85)",
      },
    },
  },
  plugins: [],
};
