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
        "25px": "20px",
        "24px": "19px",
      },
      top: {
        pxCustom: "-1px",
      },
      right: {
        fourPxCustom: "-3px",
      },
      bottom: {
        pxCustom: "-1px",
        "-165px": "-165px",
      },
      width: {
        widthBorder: "70%",
        114: "35rem",
      },
    },
  },
  plugins: [],
  important: true,
};
