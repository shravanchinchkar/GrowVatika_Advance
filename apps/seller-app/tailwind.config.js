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
        "glow-pulse": {
          "0%": {
            "box-shadow": "0 0 5px #ef4444, 0 0 10px #ef4444, 0 0 15px #ef4444",
            "border-color": "#ef4444",
          },
          "100%": {
            "box-shadow":
              "0 0 10px #dc2626, 0 0 20px #dc2626, 0 0 30px #dc2626, 0 0 40px #dc2626",
            "border-color": "#dc2626",
          },
        },
        "text-blink": {
          "0%, 50%": {
            color: "#ef4444",
            opacity: "1",
          },
          "51%, 100%": {
            color: "#dc2626",
            opacity: "0.3",
          },
        },
        "border-blink": {
          "0%, 50%": {
            borderColor: "#ef4444",
            opacity: "1",
          },
          "51%, 100%": {
            borderColor: "#dc2626",
            opacity: "0.3",
          },
        },
      },
      animation: {
        "bg-bounce-in": "bg-bounce-in-1 0.5s ease-out 1",
        "bg-bounce-in-2": "bg-bounce-in-new-2 0.5s ease-out 1",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite alternate",
        "text-blink": "text-blink 1s linear infinite",
        "border-blink": "border-blink 1s linear infinite",
      },
    },
  },
  plugins: [],
};
