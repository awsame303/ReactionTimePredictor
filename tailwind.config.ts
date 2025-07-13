// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define your custom colors here
        "primary-blue": "#3490dc",
        "secondary-red": "#e3342f",
      },
      spacing: {
        // Define custom spacing
        "128": "32rem",
        "144": "36rem",
      },
      // You can extend other theme properties like fontSize, fontFamily, etc.
    },
  },
  plugins: [
    // Add your Tailwind CSS plugins here
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
  // Other top-level options can go here, like prefix, important, etc.
  // prefix: 'tw-',
};

export default config;
