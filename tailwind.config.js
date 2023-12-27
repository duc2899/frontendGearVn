/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      zIndex: {
        2000: "20",
      },
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
        96: "24rem",
      },
      borderWidth: {
        "1px": "1px",
      },
      top: {
        pxCustom: "-1px",
      },
      right: {
        fourPxCustom: "-3px",
      },
      bottom: {
        pxCustom: "-1px",
      },
      width: {
        widthBorder: "70%",
      },
    },
  },
  plugins: [],
  important: true,
};
