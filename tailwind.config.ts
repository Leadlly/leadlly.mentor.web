import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/helpers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        box: "#F0E5FF61",
        "custom-purple": "#6200EE",
        "light-purple": "#E9D8FD",
        "dark-purple": "#6B46C1",
      },
      boxShadow: {
        "custom-inset": "0px -1px 10.8px 0px #9654F424 inset",
        "custom-point":
          "3.83px 3.83px 3.83px 0px #FFFFFF inset, -3.83px -3.83px 3.83px 0px #D2D2D2 inset",
        "custom-black": "0px 4px 4px 0px #00000040",
      },
      dropShadow: {
        "custom-user-chat": "1.67px 4.6px 4.35px 0px #CFB0FA1F",
      },
    },
  },
  plugins: [],
};
export default config;
