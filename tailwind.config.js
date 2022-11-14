/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
