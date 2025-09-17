/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
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
        border: "var(--color-border)", /* nebula-purple-20 */
        input: "var(--color-input)", /* elevated-cosmic-surface */
        ring: "var(--color-ring)", /* stellar-blue */
        background: "var(--color-background)", /* deep-space-navy */
        foreground: "var(--color-foreground)", /* white */
        primary: {
          DEFAULT: "var(--color-primary)", /* stellar-blue */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* nebula-purple */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* red-giant-crimson */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* elevated-cosmic-surface-80 */
          foreground: "var(--color-muted-foreground)", /* soft-stellar-gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* solar-gold */
          foreground: "var(--color-accent-foreground)", /* deep-space-navy */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* elevated-cosmic-surface */
          foreground: "var(--color-popover-foreground)", /* white */
        },
        card: {
          DEFAULT: "var(--color-card)", /* elevated-cosmic-surface */
          foreground: "var(--color-card-foreground)", /* white */
        },
        success: {
          DEFAULT: "var(--color-success)", /* aurora-green */
          foreground: "var(--color-success-foreground)", /* deep-space-navy */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* solar-flare-orange */
          foreground: "var(--color-warning-foreground)", /* white */
        },
        error: {
          DEFAULT: "var(--color-error)", /* red-giant-crimson */
          foreground: "var(--color-error-foreground)", /* white */
        },
        /* Custom Cosmic Colors */
        'stellar-blue': '#4A90E2', /* stellar-blue */
        'nebula-purple': '#7B68EE', /* nebula-purple */
        'solar-gold': '#FFD700', /* solar-gold */
        'deep-space': '#0B0B1A', /* deep-space-navy */
        'cosmic-surface': '#1A1A2E', /* elevated-cosmic-surface */
        'stellar-gray': '#B8C5D6', /* soft-stellar-gray */
        'aurora-green': '#00FF88', /* aurora-green */
        'solar-flare': '#FF6B35', /* solar-flare-orange */
        'red-giant': '#FF4757', /* red-giant-crimson */
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'cosmic-sm': '4px',
        'cosmic-md': '8px',
        'cosmic-lg': '16px',
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
        'caption': ['Roboto', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'cosmic-sm': '0 0 8px rgba(74, 144, 226, 0.3), 0 0 16px rgba(123, 104, 238, 0.2)',
        'cosmic-md': '0 0 16px rgba(74, 144, 226, 0.4), 0 0 32px rgba(123, 104, 238, 0.3)',
        'cosmic-lg': '0 0 32px rgba(74, 144, 226, 0.5), 0 0 64px rgba(123, 104, 238, 0.4)',
        'cosmic-xl': '0 0 64px rgba(74, 144, 226, 0.6), 0 0 128px rgba(123, 104, 238, 0.5)',
      },
      animation: {
        'cosmic-pulse': 'cosmic-pulse 2s cubic-bezier(0.4, 0.0, 0.2, 1) infinite',
      },
      keyframes: {
        'cosmic-pulse': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 8px rgba(74, 144, 226, 0.3)',
          },
          '50%': {
            opacity: '0.8',
            boxShadow: '0 0 16px rgba(74, 144, 226, 0.5)',
          },
        },
      },
      backdropBlur: {
        'cosmic': '12px',
      },
      transitionTimingFunction: {
        'cosmic': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      transitionDuration: {
        'cosmic': '300ms',
        'cosmic-slow': '800ms',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}