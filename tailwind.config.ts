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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: '#00d1c1',
					2: '#ff61a6',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// CTea Brand Colors
				ctea: {
					'dark': '#1a0d26',
					'darker': '#0f0619',
					'teal': '#00d4aa',
					'cyan': '#4dd9d4',
					'pink': '#ff1b8d',
					'purple': '#9b59b6',
					'yellow': '#f1c40f',
					'orange': '#ff6b35',
				}
			},
			backgroundImage: {
				'gradient-ctea': 'linear-gradient(135deg, #ff1b8d 0%, #00d4aa 50%, #9b59b6 100%)',
				'gradient-dark': 'linear-gradient(135deg, #1a0d26 0%, #0f0619 100%)',
				'gradient-neon': 'linear-gradient(45deg, #ff1b8d, #00d4aa, #4dd9d4, #9b59b6)',
				'gradient-ctea-pastel': 'linear-gradient(135deg, #ffb6e6 0%, #ffddb0 40%, #b6f7ef 100%)',
			},
			animation: {
				'glow': 'glow 2s ease-in-out infinite alternate',
				'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'float': 'float 6s ease-in-out infinite',
			},
			keyframes: {
				glow: {
					'0%': { 
						textShadow: '0 0 5px #00d4aa, 0 0 10px #00d4aa, 0 0 15px #00d4aa',
					},
					'100%': { 
						textShadow: '0 0 10px #ff1b8d, 0 0 20px #ff1b8d, 0 0 30px #ff1b8d',
					},
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
