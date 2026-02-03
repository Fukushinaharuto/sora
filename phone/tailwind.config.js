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
        blackLight: "#62748E",
        borderColor: "#E2E8F0",
        sub: "#1C398E",
        subLight: "#EFF6FF",
        borderSubColor: "#DBEAFE",
        grayLight: "#F8FAFC",
        bgIcon: "#F1F5F9",
        mapIconBlue: "#155DFC",
        red: "#FB2C36",
      },
    },
  },
  plugins: [],
}
