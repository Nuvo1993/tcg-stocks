module.exports = {
  plugins: {
    tailwindcss:{},
    "@fullhuman/postcss-purgecss": {
      content: [
        "./src/app/**/*.{js,jsx,ts,tsx,css,scss}", // Include the app directory
        "./components/**/*.{js,jsx,ts,tsx}",
        "./pages/**/*.{js,jsx,ts,tsx}", // Include the pages directory
      ],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: ["html", "body"],
    },
  },
};
