const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        playfair: ["var(--font-playfair)"],
      },
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        // ... resto de colores de tu CSS
      },
    },
  },
  plugins: [],
};

export default config;
