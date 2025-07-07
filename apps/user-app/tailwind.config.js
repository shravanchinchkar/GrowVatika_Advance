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
        "3xl": "0 5px 5px rgba(0, 0, 0, 0.75)",
        "4xl": "0 15px 25px rgba(0, 0, 0, 0.85)",
      },
      backgroundImage: {
        "button-custom-gradient":
          "linear-gradient(297deg, rgba(100, 145, 115, 0.53) 14.21%, rgba(219, 213, 164, 0.53) 86.53%)",

        "custom-gradient": "linear-gradient(to left, #649173, #DBD5A4)",
        "feature-gradient":
          "linear-gradient(301deg, rgba(100, 145, 115, 0.30) 34.51%, rgba(219, 213, 164, 0.30) 102.82%)",
        "test-one": "url('/assets/images/TestmonialImageOne.jpg')",
        "test-two": "url('/assets/images/TestmonialImageTwo.jpeg')",
        "test-three": "url('/assets/images/TestmonialImageThree.jpg')",
        "testimonial-gradient":
          "linear-gradient(301deg, rgba(100, 145, 115, 0.53) 34.51%, rgba(219, 213, 164, 0.53) 102.82%)",
        "testimonial-gradient-2":
          "linear-gradient(301deg, rgba(100, 145, 115, 0.53) 34.51%, rgba(219, 213, 164, 0.53) 102.82%)",
        "contact-form":
          "linear-gradient(301deg, rgba(100, 145, 115, 0.30) 18.97%, rgba(219, 213, 164, 0.30) 87.28%)",
      },
      boxShadow: {
        "button-custom-boxshadow":
          "0px 1.282px 12.818px -0.32px rgba(0, 0, 0, 0.25)",
        "explore-custom": "10px 10px 59px #85A947",
        "testinomial-custom": "0px 4px 9.9px 0px rgba(0, 0, 0, 0.44)",
      },
      screens: {
        "new-sm": "360px",
        "new-sm-1": "430px",
        "new-xl": "1330px",
        "new-xl-2": "1400px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
