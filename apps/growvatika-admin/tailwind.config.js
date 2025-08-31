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
        "new-sm": "320px",
        "new-sm-1": "360px",
        "new-sm-2": "430px",
        "new-sm-3": "535px",
        "new-md": "888px",
        "new-xl": "1330px",
        "new-xl-2": "1400px",
      },
      fontFamily: {
        nunito: ["var(--font-nunito)", "sans-serif"],
        outfit: ["var(--font-outfit)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
        ubuntu: ["var(--font-ubuntu)", "sans-serif"],
        unbounded: ["var(--font-unbounded)", "sans-serif"],
      },
      backgroundImage: {
        "button-custom-gradient":
          "linear-gradient(297deg, rgba(100, 145, 115, 0.53) 14.21%, rgba(219, 213, 164, 0.53) 86.53%)",
      },
      boxShadow: {
        "admindashboard-button-boxShadow": "0 0 7px 0 rgba(0, 0, 0, 0.25)",
      },
      keyframes: {
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        "slide-in-right": "slide-in-right 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
