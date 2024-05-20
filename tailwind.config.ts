import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'primary': '#4F72D8',
        'secondary': '#3456B9',
        'error': '#E12929',
        'success': '#4BCC40',
        'white-opacity': 'rgba(255, 255, 255, 0.5)',
        'custom-color': '#00ff00'
      },
      gridTemplateRows: {
        // Simple 16 row grid
        '16': 'repeat(16, minmax(0, 1fr))',

        // Complex site-specific row configuration
        'layout': '100% 1fr 1fr 1fr 1fr',
      },
      background: {
        'neutral-800-important': 'bg-neutral-800 !important',


      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ]
};
export default config;
