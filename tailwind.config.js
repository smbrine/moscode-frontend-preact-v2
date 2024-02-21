/** @type {import('tailwindcss').Config} */
export default {
    mode: "jit",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/**/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            'Roboto': ['Roboto'],
            'main': [
                "Noto Sans KR",
                "Inter", "Montserrat", 'Noto Sans JP', 'Overpass Mono',
                'Roboto',
            ]
        },
        extend: {
            colors: {
                'clean': {
                    'black': {
                        '50': '#f5f6f6',
                        '100': '#e5e8e8',
                        '200': '#cdd3d4',
                        '300': '#aab3b6',
                        '400': '#808d90',
                        '500': '#657275',
                        '600': '#566064',
                        '700': '#4a5154',
                        '800': '#414749',
                        'main': '#414749',
                        '900': '#393d3f',
                        '950': '#242728',
                    },
                    'white': {
                        'main': '#fdfdff',
                        '100': '#e0e0fe',
                        '200': '#babefd',
                        '300': '#7d87fc',
                        '400': '#384af8',
                        '500': '#0e22e9',
                        '600': '#020ec7',
                        '700': '#030aa1',
                        '800': '#070d85',
                        '900': '#0c0f6e',
                        '950': '#080849',
                    },
                    'accent': {
                        '50': '#eafff7',
                        '100': '#cdfeeb',
                        '200': '#a0fadc',
                        '300': '#63f2ca',
                        '400': '#25e2b3',
                        '500': '#00c49a',
                        'main': '#00a481',
                        '600': '#00a481',
                        '700': '#00836b',
                        '800': '#006756',
                        '900': '#005548',
                        '950': '#00302a',
                    },
                }
            },
        },
    },
    plugins: [],
}