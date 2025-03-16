import type { Config } from "tailwindcss";
import enhancedTheme, { themeKeyframes } from "./src/styles/theme";

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
					DEFAULT: enhancedTheme.colors.primary.DEFAULT,
					foreground: 'hsl(var(--primary-foreground))',
					...enhancedTheme.colors.primary
				},
				secondary: {
					DEFAULT: enhancedTheme.colors.secondary.DEFAULT,
					foreground: 'hsl(var(--secondary-foreground))',
					...enhancedTheme.colors.secondary
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
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
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
                // Keep existing Custom colors
                dark: {
                    DEFAULT: enhancedTheme.colors.dark.DEFAULT,
                    ...enhancedTheme.colors.dark,
                    accent: '#1A1A1A',
                },
                purple: {
                    DEFAULT: '#8B5CF6',
                    light: '#A78BFA',
                    dark: '#7C3AED'
                },
                pink: {
                    DEFAULT: '#FF1493',
                    light: '#FF69B4',
                    dark: '#C71585'
                },
                code: {
                    red: '#FF6B6B',
                    green: '#4EC9B0',
                    blue: '#569CD6',
                    comment: '#6A9955',
                    background: '#1E1E1E'
                }
			},
			borderRadius: {
				lg: enhancedTheme.borderRadius.lg,
				md: enhancedTheme.borderRadius.DEFAULT,
				sm: enhancedTheme.borderRadius.sm
			},
			keyframes: {
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
				},
                'fade-in': themeKeyframes.fadeIn,
                'slide-out': {
                    '0%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    },
                    '100%': {
                        opacity: '0',
                        transform: 'translateY(10px)'
                    }
                },
                'slide-left': {
                    '0%': {
                        transform: 'translateX(-100%)'
                    },
                    '100%': {
                        transform: 'translateX(0)'
                    }
                },
                'slide-right': {
                    '0%': {
                        transform: 'translateX(0)'
                    },
                    '100%': {
                        transform: 'translateX(-100%)'
                    }
                },
                'float': {
                    '0%, 100%': {
                        transform: 'translateY(0)'
                    },
                    '50%': {
                        transform: 'translateY(-10px)'
                    }
                },
                'pulse-light': {
                    '0%, 100%': {
                        opacity: '1'
                    },
                    '50%': {
                        opacity: '0.7'
                    }
                },
                'slide-up': themeKeyframes.slideUp,
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': enhancedTheme.animation['fade-in'],
                'slide-out': 'slide-out 0.6s ease-out',
                'slide-left': 'slide-left 0.3s ease-out',
                'slide-right': 'slide-right 0.3s ease-out',
                'float': 'float 6s ease-in-out infinite',
                'pulse-light': 'pulse-light 2s ease-in-out infinite',
                'slide-up': enhancedTheme.animation['slide-up'],
			},
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                'button': '0 4px 14px 0 rgba(139, 92, 246, 0.4)',
                'card': '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
                'hover': '0 10px 40px -5px rgba(139, 92, 246, 0.4)',
            },
            dropShadow: {
                'glow': '0 0 10px rgba(139, 92, 246, 0.5)',
            }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
