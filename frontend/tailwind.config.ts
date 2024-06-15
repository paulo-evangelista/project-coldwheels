import type { Config } from "tailwindcss";

const config = {
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
                mainOrange: "#FF9900",
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
            },
            fontFamily: {
                montserrat: ["Montserrat", "sans-serif"],
                pulp: ["Pulp", "sans-serif"],
                gothic: ["Gothic", "sans-serif"],
            },
            backgroundImage: {
                wireframe: "url('/assets/wireframe.svg')",
                wireframeH: "url('/assets/wireframeH.svg')",
                "custom-radial-offset":
                    "radial-gradient(circle at -20% 30%, rgba(255,142,57,1) 0%, rgba(11,6,0,1) 100%)",
                "custom-radial-offset-reversed":
                    "radial-gradient(circle at 120% 30%, rgba(255,142,57,1) 0%, rgba(11,6,0,1) 100%)",
                "hash-pattern": `linear-gradient(to right, black 7%, transparent 7%),
                         linear-gradient(to bottom, black 7%, transparent 7%)`,
            },
            backgroundSize: {
                "hash-size": "5% 5%",
            },

            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            boxShadow: {
                "neon-orange":
                    "0 0 10px 0 rgba(234, 88, 12, 0.8), 0 0 20px 0 rgba(234, 88, 12, 0.6), 0 0 30px 0 rgba(234, 88, 12, 0.4)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
