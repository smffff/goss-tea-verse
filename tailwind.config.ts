
import type { Config } from "tailwindcss";

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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'ctea': {
          teal: '#00D8A4',
          purple: '#8b5cf6',
          pink: '#FF4FB3',
          yellow: '#f59e0b',
          orange: '#FF9C39',
          dark: '#100C2A',
          darker: '#1a0d26',
          black: '#0a0a0a',
        },
        // Vaporwave color palette
        'neon': {
          pink: '#FF4FB3',
          teal: '#00D8A4',
          orange: '#FF9C39',
          purple: '#8b5cf6',
          blue: '#00bfff',
        },
        'retro': {
          black: '#0a0a0a',
          purple: '#100C2A',
          'purple-dark': '#1a0d26',
        },
        'vintage-red': '#c41e3a',
        'tabloid-black': '#2c2c2c',
        'pale-pink': '#fef7f0',
        'newsprint': '#f8f8f0',
      },
      fontFamily: {
        'retro': ['Press Start 2P', 'monospace'],
        'luckiest': ['Luckiest Guy', 'cursive'],
        'inter': ['Inter', 'sans-serif'],
        'headline': ['Luckiest Guy', 'cursive'],
        'body': ['Inter', 'sans-serif'],
        'mono': ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 209, 193, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 209, 193, 0.8)" },
        },
        "neon-flicker": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "scan-lines": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "vhs-noise": {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        "retro-blink": {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0.3" },
        },
        "teacup-shake": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-1deg)" },
          "75%": { transform: "rotate(1deg)" },
        },
        "steam": {
          "0%": { 
            opacity: "0",
            transform: "translateY(0px) scale(0.8)",
          },
          "50%": { 
            opacity: "1",
            transform: "translateY(-8px) scale(1.2)",
          },
          "100%": { 
            opacity: "0",
            transform: "translateY(-16px) scale(0.6)",
          },
        },
        "wink": {
          "0%, 90%, 100%": { transform: "scaleY(1)" },
          "95%": { transform: "scaleY(0.1)" },
        },
        "splash": {
          "0%": { 
            opacity: "0",
            transform: "scale(0) rotate(0deg)",
          },
          "50%": { 
            opacity: "1",
            transform: "scale(1.2) rotate(180deg)",
          },
          "100%": { 
            opacity: "0",
            transform: "scale(0) rotate(360deg)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "neon-flicker": "neon-flicker 1.5s ease-in-out infinite",
        "scan-lines": "scan-lines 2s linear infinite",
        "vhs-noise": "vhs-noise 0.1s infinite",
        "retro-blink": "retro-blink 1s step-end infinite",
        "teacup-shake": "teacup-shake 0.5s ease-in-out infinite",
        "steam": "steam 2s ease-out infinite",
        "wink": "wink 4s ease-in-out infinite",
        "splash": "splash 1.5s ease-out infinite",
      },
      backgroundImage: {
        'gradient-ctea': 'linear-gradient(135deg, #00D8A4 0%, #FF4FB3 50%, #FF9C39 100%)',
        'gradient-vaporwave': 'linear-gradient(135deg, #100C2A 0%, #1a0d26 50%, #0a0a0a 100%)',
        'gradient-retro': 'linear-gradient(45deg, #FF4FB3 0%, #00D8A4 50%, #FF9C39 100%)',
        'retro-grid': 'linear-gradient(rgba(0, 216, 164, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 216, 164, 0.3) 1px, transparent 1px)',
        'scan-lines': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 216, 164, 0.1) 2px, rgba(0, 216, 164, 0.1) 4px)',
      },
      backdropBlur: {
        'vhs': '4px',
      },
      boxShadow: {
        'neon-teal': '0 0 20px rgba(0, 216, 164, 0.5), 0 0 40px rgba(0, 216, 164, 0.3)',
        'neon-pink': '0 0 20px rgba(255, 79, 179, 0.5), 0 0 40px rgba(255, 79, 179, 0.3)',
        'neon-orange': '0 0 20px rgba(255, 156, 57, 0.5), 0 0 40px rgba(255, 156, 57, 0.3)',
        'retro-inset': 'inset 0 0 20px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
