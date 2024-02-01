/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                'jetbrains': ['JetBrains Mono', 'monospace'],
                'jura': ['Jura', 'sans-serif'],
            }
        },
    },
    plugins: [],
}

