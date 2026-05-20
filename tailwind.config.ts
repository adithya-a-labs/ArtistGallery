import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        terracotta: "hsl(var(--terracotta))",
        olive: "hsl(var(--olive))",
        peach: "hsl(var(--peach))",
        charcoal: "hsl(var(--charcoal))",
        paper: "hsl(var(--paper))",
        cream: "hsl(var(--cream))",
        rust: "hsl(var(--rust))",
        sand: "hsl(var(--sand))",
        /* Legacy compat */
        saffron: "hsl(var(--terracotta))",
        turmeric: "hsl(var(--peach))",
        henna: "hsl(var(--rust))",
        sandalwood: "hsl(var(--sand))",
        indigo: "hsl(var(--charcoal))",
        emerald: "hsl(var(--olive))",
      },
      fontFamily: {
        sans:       ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        serif:      ["Fraunces", "ui-serif", "Georgia", "serif"],
        fraunces:   ["Fraunces", "ui-serif", "Georgia", "serif"],
        instrument: ["Instrument Serif", "ui-serif", "Georgia", "serif"],
        caveat:     ["Caveat", "cursive"],
        dm:         ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        /* Legacy compat */
        poppins:    ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        spectral:   ["Fraunces", "ui-serif", "Georgia", "serif"],
        cursive:    ["Caveat", "cursive"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "paper-texture": "radial-gradient(ellipse at 20% 10%, hsl(var(--peach) / 0.2) 0%, transparent 50%), radial-gradient(ellipse at 80% 90%, hsl(var(--primary) / 0.08) 0%, transparent 50%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
