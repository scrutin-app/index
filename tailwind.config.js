/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./layouts/**/*.html", "./content/**/*.md"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [{
      mytheme: {
        "primary": "#3b82f6",
        "secondary": "#F6AF3B",
        "accent": "#36D399",
        "neutral": "#3D4451",
        "base-100": "#FFFFFF",
        "info": "#3b82f6",
        "success": "#36D399",
        "warning": "#F6AF3B",
        "error": "#F87272",
      }
    }]
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
