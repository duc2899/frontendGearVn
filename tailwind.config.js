/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      scale: {
        115: "1.05",
      },
      backgroundColor: {
        "black-rgba": "rgba(0, 0, 0, 0.34)",
      },
      margin: {
        72: "72px",
      },
      height: {
        height1px: "1px",
        vh52: "52vh",
      },
      minHeight: {
        vh52: "52vh",
      },
      width: {
        widthBorder: "70%",
      },
    },
  },
  plugins: [],
  important: true,
};
