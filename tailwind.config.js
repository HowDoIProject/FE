/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#FFA41B',
                main: '#1F1F1F',
                secondary: '#F0F3FC',
                yellow: '#FFD93D',
                brown: '#351509',
                gray_01: '#666666',
                gray_02: '#8A8A8A',
                gray_03: '#CACACA',
                gray_04: '#EEEEEE',
                gray_05: '#F9F9F9',
                white: '#FFFFFF',
                red: '#E62020',
                rating: '#FFB628',
                bgjoin: '#FFFCF7',
                bgcard: '#FFFBEC',
            },
            fontFamily: {},
        },
        fontSize: {},
    },
    plugins: [require('tailwind-scrollbar-hide')],
};
