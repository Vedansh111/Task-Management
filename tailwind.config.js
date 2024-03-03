/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}", 'node_modules/preline/dist/*.js',],
    theme: {
        extend: {
            fontFamily: {
                'jetbrains': ['JetBrains Mono', 'monospace'],
                'jura': ['Jura', 'sans-serif'],
            }
        },
    },
    plugins: [
        require('tailwindcss-animated'),
        require('preline/plugin'),
    ],
}

