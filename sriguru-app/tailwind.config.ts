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
    },
    colors: {
      'crystal_blue': '#58ABAE',
      'opal': '#A5CBC6',
      'platinum': '#E5E5E5',
      'seashell': '#FAF4F0',
      'pale_pink': '#FFD6D4',
      'cherry_blossom': '#FEB8C5'
    },
  },
  plugins: [],
};
export default config;
