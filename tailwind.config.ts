
import type { Config } from "tailwindcss";
import { tailwindColors } from "./src/lib/config/tailwind/colors";
import { tailwindFonts } from "./src/lib/config/tailwind/fonts";
import { tailwindKeyframes, tailwindAnimations } from "./src/lib/config/tailwind/animations";
import { tailwindBackgroundImages, tailwindBackdropBlur, tailwindBoxShadow } from "./src/lib/config/tailwind/effects";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: tailwindColors,
      fontFamily: tailwindFonts,
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: tailwindKeyframes,
      animation: tailwindAnimations,
      backgroundImage: tailwindBackgroundImages,
      backdropBlur: tailwindBackdropBlur,
      boxShadow: tailwindBoxShadow,
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
