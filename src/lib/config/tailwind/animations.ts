
export const tailwindKeyframes = {
  "accordion-down": {
    from: { height: "0" },
    to: { height: "var(--radix-accordion-content-height)" },
  },
  "accordion-up": {
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: "0" },
  },
  "fade-in": {
    "0%": {
      opacity: "0",
      transform: "translateY(10px)"
    },
    "100%": {
      opacity: "1",
      transform: "translateY(0)"
    }
  },
  "wiggle": {
    "0%, 100%": { transform: "rotate(0deg)" },
    "25%": { transform: "rotate(1deg)" },
    "75%": { transform: "rotate(-1deg)" }
  }
};

export const tailwindAnimations = {
  "accordion-down": "accordion-down 0.2s ease-out",
  "accordion-up": "accordion-up 0.2s ease-out",
  "fade-in": "fade-in 0.3s ease-out",
  "wiggle": "wiggle 2s ease-in-out infinite",
};
