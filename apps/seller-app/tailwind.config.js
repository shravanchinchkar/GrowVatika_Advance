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
        "box-shadow": "var(--box-shadow)",
        "button-hover": "var(--button-hover)",
        "card-shadow": "var(--card-shadow)",
      },
      backgroundImage: {
        "custom-bg":
          "linear-gradient(90deg, #56A430 0%, #C4CD90 89.47%, #DBD5A4 100%)",
      },
       colors: {
        'custom-fill': '#FFF6F4',
      },
      dropShadow: {
        'custom': '0px 3.2px 15px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
};
