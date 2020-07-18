/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
    purge: ['./components/**/*.js', './pages/**/*.js'],
    theme: {
        corePlugins: {
            container: false,
        },
        screens: {
            '2xl': { max: '1440px' },
            xl: { max: '1280px' },
            lg: { max: '1024px' },
            md: { max: '768px' },
            sm: { max: '640px' },
            xs: { max: '440px' },
            '2xs': { max: '384px' },
        },
        fontFamily: {
            primary:
                'Oswald, -apple-system, "Helvetica Neue", "Segoe UI", Roboto, Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            secondary: 'Domine, Georgia, Cambria, "Times New Roman", Times, serif',
            tertiary:
                'Inter, -apple-system, "Helvetica Neue", "Segoe UI", Roboto, Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        },
        colors: {
            black: colors.black,
            white: colors.white,
            grey: {
                '100': '#f5f5f5',
                '200': '#eeeeee',
                '300': '#e0e0e0',
                '400': '#bdbdbd',
                '500': '#9e9e9e',
                '600': '#757575',
                '700': '#616161',
                '800': '#424242',
                '900': '#212121',
            },
            red: colors.red,
            yellow: colors.yellow,
            green: colors.green,
            teal: colors.teal,
            blue: colors.blue,
            indigo: colors.indigo,
            purple: colors.purple,
            pink: colors.pink,
        },
        opacity: {
            '0': '0',
            '10': '.1',
            '20': '.2',
            '25': '.25',
            '30': '.3',
            '40': '.4',
            '50': '.5',
            '60': '.6',
            '70': '.7',
            '75': '.75',
            '80': '.8',
            '90': '.9',
            '95': '.95',
            '100': '1',
        },
        typography: theme => ({
            default: {
                css: {
                    color: theme('colors.grey.900'),
                    p: {
                        fontFamily: theme('fontFamily.secondary'),
                        overflowWrap: 'break-word',
                    },
                },
            },
        }),
        extend: {
            spacing: {
                28: '7rem',
                '72': '18rem',
                '84': '21rem',
                '96': '24rem',
                '220px': '220px',
                '2px': '2px',
                '3px': '3px',
                '4px': '4px',
                '5px': '5px',
                '6px': '6px',
                '7px': '7px',
                '8px': '8px',
                '9px': '9px',
                '10px': '10px',
            },
            fontSize: {
                '2xs': '.65rem',
                xs: '.75rem',
                sm: '.875rem',
                md: '1rem',
                lg: '1.125rem',
                xl: '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.75rem',
                '4xl': '2rem',
                '5xl': '2.25rem',
                '6xl': '2.75rem',
                '7xl': '3.25rem',
                title: '6rem',
            },
            boxShadow: {
                small: '0 5px 10px rgba(0, 0, 0, 0.12)',
                medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
            },
            maxWidth: {
                '1500px': '1500px',
                '1070px': '1070px',
                '1340px': '1340px',
            },
            width: {
                '1/7': '14.2857143%',
                '2/7': '28.5714286%',
                '3/7': '42.8571429%',
                '4/7': '57.1428571%',
                '5/7': '71.4285714%',
                '6/7': '85.7142857%',
                'min-content': 'min-content',
                'max-content': 'max-content',
                '10px': '10px',
            },
            height: {
                '510px': '510px',
                '800px': '800px',
                '900px': '900px',
            },
            backgroundSize: {
                'auto-100%': 'auto 100%',
            },
            inset: {
                '10px': '10px',
                '20px': '20px',
                '30px': '30px',
                '40px': '40px',
                '50px': '50px',
                '60px': '60px',
                '70px': '70px',
                '80px': '80px',
                '90px': '90px',
                '100px': '100px',
                '1/4': '25%',
                '1/3': '33%',
                '1/2': '50%',
                '2/3': '66%',
                '3/4': '75%',
            },
            borderRadius: {
                0: '0',
                sm: '0.125rem',
                default: '0.25rem',
                md: '0.375rem',
                lg: '0.5rem',
                xl: '0.75rem',
                '2xl': '1rem',
                '3xl': '1.25rem',
                full: '9999px',
            },
            transitionDuration: {
                '0': '0ms',
                '2000': '2000ms',
                '3000': '3000ms',
                '4000': '4000ms',
                '5000': '5000ms',
                '6000': '6000ms',
                '7000': '7000ms',
                '8000': '8000ms',
            },
        },
    },
    variants: {
        translate: ['responsive', 'hover', 'group-hover'],
    },
    plugins: [require('@tailwindcss/typography'), 'tailwindcss', 'postcss-preset-env'],
};
