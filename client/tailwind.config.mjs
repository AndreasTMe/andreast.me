import plugin from "tailwindcss/plugin";

/** @type {import("tailwindcss").Config} */
export default {
    content: ["./src/**/*.{astro,html,js,md,mdx,svelte,ts}"],
    darkMode: "class",
    theme: {
        colors: {
            "text-color": "hsl(var(--text-color) / <alpha-value>)",
            "text-opposite-color": "hsl(var(--text-opposite-color) / <alpha-value>)",
            "background-color": "hsl(var(--background-color) / <alpha-value>)",
            "background-opposite-color": "hsl(var(--background-opposite-color) / <alpha-value>)",
            "primary-color": "hsl(var(--primary-color) / <alpha-value>)",
            "secondary-color": "hsl(var(--secondary-color) / <alpha-value>)",
            "accent-color": "hsl(var(--accent-color) / <alpha-value>)",
            "transparent": "transparent"
        },
        fontFamily: {
            "primary": "var(--font-family-primary)",
            "secondary": "var(--font-family-secondary)"
        },
        fontWeight: {
            "thin": "var(--font-weight-thin)",
            "regular": "var(--font-weight-regular)",
            "bold": "var(--font-weight-bold)"
        },
        fontSize: {
            "title-huge": "var(--font-size-title-huge)",
            "title-large": "var(--font-size-title-large)",
            "title-normal": "var(--font-size-title-normal)",
            "title-small": "var(--font-size-title-small)",
            "base": "var(--font-size-base)",
            "small": "calc(var(--font-size-base) * 0.9)"
        },
        extend: {
            borderWidth: {
                "1": "1px",
                "t-1": "1px 0 0 0",
                "r-1": "0 1px 0 0",
                "b-1": "0 0 1px 0",
                "l-1": "0 0 0 1px"
            },
            gridTemplateColumns: {
                "dual-12": "1fr 2fr",
                "dual-21": "2fr 1fr",
                "triple-112": "1fr 1fr 2fr",
                "triple-121": "1fr 2fr 1fr",
                "triple-211": "2fr 1fr 1fr"
            },
            listStyleType: {
                "lower-alpha": "lower-alpha",
                "lower-roman": "lower-roman",
                "lower-greek": "lower-greek",
                "circle": "circle",
                "square": "square"
            },
            keyframes: {
                fadeOut: {
                    "0%": { opacity: 1 },
                    "100%": { opacity: 0 }
                }
            }
        }
    },
    plugins: [
        plugin((
            function({ addVariant }) {
                addVariant("not-last", "&:not(:last-child)");
                addVariant("last-child", "&>*:last-child");
                addVariant("not-last-child", "&>*:not(:last-child)");
            }
        ))
    ]
};