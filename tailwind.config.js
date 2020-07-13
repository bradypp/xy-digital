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
        extend: {
            fontFamily: {
                sans:
                    '-apple-system, "Helvetica Neue", "Segoe UI", Roboto, Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            },
            spacing: {
                28: '7rem',
            },
            fontSize: {
                '5xl': '2.5rem',
                '6xl': '2.75rem',
                '7xl': '4.5rem',
                '8xl': '6.25rem',
            },
            boxShadow: {
                small: '0 5px 10px rgba(0, 0, 0, 0.12)',
                medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
            },
            maxWidth: {
                content: '1500px',
                inner: '1070px',
            },
        },
    },
    variants: {},
    plugins: ['tailwindcss', 'postcss-preset-env'],
};
