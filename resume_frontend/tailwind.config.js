/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [require("daisyui")],

    // The definitive DaisyUI configuration
    daisyui: {
        // This tells DaisyUI which themes are available. We are only providing one.
        themes: [
            {
                cooltheme: {
                    "primary": "#00A9A5",
                    "secondary": "#4299E1",
                    "accent": "#00A9A5",
                    "neutral": "#2D3748",
                    "base-100": "#1A202C", // This is our dark background
                    "info": "#3ABFF8",
                    "success": "#36D399",
                    "warning": "#FBBD23",
                    "error": "#F87272",
                },
            },
        ],
        darkTheme: false, // This DISBLES the auto-detection of browser theme
    },
};