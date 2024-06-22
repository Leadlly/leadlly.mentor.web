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
      dropShadow: {
        "custom-user-chat": "1.67px 4.6px 4.35px 0px #CFB0FA1F",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "sidebar-background": "hsla(262, 86%, 46%, 0.03)",
        box: "#F0E5FF61",
        "custom-purple": "#6200EE",
        "light-purple": "#E9D8FD",
        "dark-purple": "#6B46C1",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        boxShadow: {
        'custom-purple': '#9654F4',
          custom: "0px 17px 37px 0px rgba(165, 92, 255, 0.0)",
          dialog: "0 0 21.5px 2px rgba(0, 0, 0, 0.29)",
          tracker_subject_overview:
            "2px 1px 10.5px 0 rgba(151, 83, 245, 0.18), inset 0 0 32px -7px rgba(151, 83, 245, 0.18)",
            "custom-inset": "0px -1px 10.8px 0px #9654F424 inset",
          "custom-point":
            "3.83px 3.83px 3.83px 0px #FFFFFF inset, -3.83px -3.83px 3.83px 0px #D2D2D2 inset",
          "custom-black": "0px 4px 4px 0px #00000040",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontSize: {
        "page-title": ["40px", "52px"],
      },
      width: {
        sidebar: "261px",
      },
      height: {
        "main-height": "calc(100dvh - 24px)",
      },
      boxShadow: {
        custom: "0px 17px 37px 0px rgba(165, 92, 255, 0.0)",
        dialog: "0 0 21.5px 2px rgba(0, 0, 0, 0.29)",
        tracker_subject_overview:
          "2px 1px 10.5px 0 rgba(151, 83, 245, 0.18), inset 0 0 32px -7px rgba(151, 83, 245, 0.18)",
        "custom-inset": "0px -1px 10.8px 0px #9654F424 inset",
        "custom-point":
          "3.83px 3.83px 3.83px 0px #FFFFFF inset, -3.83px -3.83px 3.83px 0px #D2D2D2 inset",
        "custom-black": "0px 4px 4px 0px #00000040",
        "custom-quiz": "0px 8px 53.1px -13px #00000014",
       "custom-back": "inset 1.68px 3.37px 5.31px 0 rgba(0, 0, 0, 0.1)",
       "custom-message-box":" 0px 4px 4px 0px #00000080"
      },
    },
  },
  plugins: [],
};
export default config;
