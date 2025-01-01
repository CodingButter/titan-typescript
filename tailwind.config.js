/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable dark mode toggling
  theme: {
    extend: {
      colors: {
        primary: {
          background: "#36AED0",
          text: "#FFFFFF",
        },
        contrast: {
          background: {
            light: "#FFFFFF",
            dark: "#0E1421",
          },
          text: {
            light: "#6D727A",
            dark: "#C2C2C2",
          },
        },
        accent: {
          background: "#F78B00",
          text: "#FFFFFF",
        },
        surface: {
          background: {
            light: "#F5F5F5",
            dark: "#0A0F17",
          },
          text: {
            light: "#6D727A",
            dark: "#C2C2C2",
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
