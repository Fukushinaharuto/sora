/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#314158",       
        primaryLight: "#45556C",   
        secondary: "#90A1B9",
        black: "0F172B",
        borderColor: "#E2E8F0",
      },
    },
  },
  plugins: [],
}
