/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'swimmer-0': '#667eea',
        'swimmer-1': '#f093fb',
        'swimmer-2': '#4facfe',
        'swimmer-3': '#43e97b',
        'swimmer-4': '#fa709a',
        'swimmer-5': '#a8edea',
        'swimmer-6': '#ff9a9e',
        'swimmer-7': '#ffecd2',
        'swimmer-8': '#a8e6cf',
        'swimmer-9': '#ffd3a5',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
    },
  },
  plugins: [],
}