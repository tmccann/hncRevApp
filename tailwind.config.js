/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "from-orange-500",
    "to-red-600",
    "from-pink-500",
    "to-rose-600",
    "from-fuchsia-500",
    "to-pink-600",
    "from-blue-500",
    "to-cyan-600",
    "from-emerald-500",
    "to-teal-600",
    "from-violet-500",
    "to-purple-600",
    "from-blue-600",
    "to-indigo-700",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
