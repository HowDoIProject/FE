/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                white: '#FFFFFF',
                black: '#000',
                lightgray: '#F3F3F3',
                darkgray: '#979797',
                'gray-1': '#ababab',
                'gray-3': '#eee',
                darkslategray: '#333',
                powderblue: '#c0e5ed',
                paleturquoise: '#c0edd2',
                pink: '#ffcbcb',
            },
            fontFamily: {
                inter: 'Inter',
                applesdgothicneob00: 'AppleSDGothicNeoB00',
            },
        },
        fontSize: {
            xs: '12px',
            sm: '14px',
            smi: '13px',
            base: '16px',
        },
    },
    corePlugins: {
        preflight: false,
    },
};
