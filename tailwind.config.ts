import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Nunito', 'ui-sans-serif', 'system-ui'],
    },
  },
  plugins: [],
} satisfies Config;
