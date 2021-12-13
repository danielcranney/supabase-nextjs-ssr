const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    height: (theme) => ({
      auto: "auto",
      ...theme("spacing"),
      full: "100%",
      screen: "calc(var(--vh) * 100)",
    }),
    minHeight: (theme) => ({
      0: "0",
      ...theme("spacing"),
      full: "100%",
      screen: "calc(var(--vh) * 100)",
    }),
    minWidth: {
      0: "0",
      "1/4": "25%",
      "1/6": "16.66%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
    },
    container: {
      padding: {
        DEFAULT: "1.6rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    backgroundSize: {
      "50%": "50%",
    },
    colors: {
      transparent: "transparent",
      black: "#25282a",
      gray: {
        100: "#F3F4F6",
        200: "#DEE3ED",
        300: "#AFB6C4",
        400: "#929AA7",
        500: "#6C7580",
        550: "#5F6672",
        600: "#424750",
        700: "#2E3138",
        800: "#272A2F",
        900: "#1E2024",
      },
      white: "#fff",
      primary: {
        main: "#00af66",
        alt: "#38F491",
        mid: "#0DAD58",
        100: "#E5F7EF",
        200: "#ccefe0",
        300: "#b2e7d1",
        400: "#99dfc2",
        500: "#7fd7b2",
        900: "#007a5a",
      },
      red: colors.rose,
    },
    extend: {
      spacing: {
        116: "28rem",
        128: "32rem",
        144: "36rem",
      },
      fontFamily: {
        display: ['"neue-haas-unica"', "sans-serif"],
        body: ['"neue-haas-unica"', "sans-serif"],
      },
      width: {
        "32pc": "32%",
        "49pc": "49%",
        "48pc": "48%",
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
      },
      transitionProperty: {
        width: "width",
        height: "height",
      },
      backgroundImage: (theme) => ({
        "landing-image": "url('/img/landing-image.svg')",
      }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked", "label-checked", "even", "autofill", "dark"],
      textColor: ["autofill", "dark"],
      borderColor: ["checked", "autofill", "dark"],
      boxShadow: ["checked"],
      backgroundImage: ["checked"],
      transform: ["dark"],
      translate: ["dark"],
      backgroundOpacity: ["even"],
      textFill: ["dark"],
      shadowFill: ["dark"],
      display: ["first"],
      borderWidth: ["last"],
    },
  },
  plugins: [
    require("tailwindcss-autofill"),
    require("tailwindcss-shadow-fill"),
    require("tailwindcss-text-fill"),
    plugin(({ addVariant, e }) => {
      addVariant("label-checked", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          const eClassName = e(`label-checked${separator}${className}`); // escape class
          const yourSelector = 'input[type="radio"]'; // your input selector. Could be any
          return `${yourSelector}:checked ~ .${eClassName}`; // ~ - CSS selector for siblings
        });
      });
    }),
  ],
};
