/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
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
        "nunito-sans": ["Nunito Sans", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
        unbounded: ["Unbounded", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      dropShadow: {
        "hero-custom-dropShadow": "0 3.2px 32px rgba(0, 0, 0, 0.25)",
        "3xl": "0 5px 5px rgba(0, 0, 0, 0.75)",
        "4xl": "0 15px 25px rgba(0, 0, 0, 0.85)",
      },
      backdropBlur: {
        navbar: "20px",
        "hero-custom-backdropBlur": "16px",
      },
      borderWidth: {
        0.8: "0.8px",
      },
      backgroundImage: {
        "navbar-bg":
          "linear-gradient(297deg, rgba(100, 145, 115, 0.53) 14.21%, rgba(219, 213, 164, 0.53) 86.53%)",
        "add-to-cart":
          "linear-gradient(90deg, #0F5889 0%, #1A9AEF 27.88%, #FFF 100%)",
        "user-popup":
          "linear-gradient(90deg, #56A430 0%, rgba(86, 164, 48, 0.77) 27.88%, #FFF 100%)",
        "hero-custom-parent-bg":
          "radial-gradient(702.53% 105.84% at 81.38% 29.84%, #DBD5A4 0%, #85A947 41.5%, #35431C 100%)",
        "button-custom-gradient":
          "linear-gradient(297deg, rgba(100, 145, 115, 0.53) 14.21%, rgba(219, 213, 164, 0.53) 86.53%)",
        "explore/about-custom-linear-gradient":
          "linear-gradient(301deg, rgba(100, 145, 115, 0.53) 18.97%, rgba(219, 213, 164, 0.53) 87.28%)",
        "feature-linear-gradient":
          "linear-gradient(301deg, rgba(100, 145, 115, 0.30) 34.51%, rgba(219, 213, 164, 0.30) 102.82%)",
        "test-one": "url('/assets/images/TestmonialImageOne.jpg')",
        "test-two": "url('/assets/images/TestmonialImageTwo.jpeg')",
        "test-three": "url('/assets/images/TestmonialImageThree.jpg')",
        "testimonial/footer-linear-gradient":
          "linear-gradient(301deg, rgba(100, 145, 115, 0.53) 34.51%, rgba(219, 213, 164, 0.53) 102.82%)",
        "getstarted-linear-gradient":
          "linear-gradient(301deg, rgba(100, 145, 115, 0.30) 18.97%, rgba(219, 213, 164, 0.30) 87.28%)",
      },
      boxShadow: {
        "navbar-boxshadow": "0 4px 40px -1px rgba(0, 0, 0, 0.25)",
        "explore-by-seller-button": "0 3.2px 32px -0.8px rgba(0, 0, 0, 0.25)",
        "custom-boxshadow": "0 3.21px 32.099px -0.802px rgba(0, 0, 0, 0.25)",
        "productcard-custom-boxShadow": "0 0 25px -11px rgba(0, 0, 0, 0.25)",
        "dropdown-custom-boxShadow": "0 3.2px 32px -0.8px rgba(0, 0, 0, 0.25)",
        "explore-button-custom-boxshadow":
          "0 2.362px 23.619px -0.59px rgba(0, 0, 0, 0.25)",
        "explorecrad-custom-boxShadow": "0 5px 59.9px 0 #85A947",
        "testinomial-custom": "0px 4px 9.9px 0px rgba(0, 0, 0, 0.44)",
        "add-to-cart-wishlist":"0 3.2px 32px -0.8px rgba(0, 0, 0, 0.25)"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "scroll-left": {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(-25%)" },
        },
      },
      animation: {
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-in-left":"slide-in-left 0.3s ease-out",
        "scroll-animation": "scroll-left 60s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
