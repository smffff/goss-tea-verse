
export const tailwindKeyframes = {
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
};

export const tailwindAnimations = {
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
};
