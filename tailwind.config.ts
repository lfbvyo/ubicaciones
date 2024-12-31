import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        ubuntu: ["Ubuntu Sans Mono", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        "pastel-yellow": "#eacc84",
        "pastel-yellow-hover": "#dbbf62",
        "pastel-gray": "#a699a2",
        "pastel-gray-hover": "#b4b0ad",
      },
    },
  },
  plugins: [],
};
export default config;
