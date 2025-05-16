/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            colors: {
                primary: '#3B8E65', // Main green color
                secondary: '#2C6E4E', // Darker green
                accent: '#F7B538', // Yellow accent
                light: '#E8F5E9', // Light background
                dark: '#1E3A29', // Dark text

                'primary-light': '#4FA97E',
                'primary-dark': '#2A6C4D',
                'accent-light': '#F9C566',
                'accent-dark': '#D99B20',

                'neutral-100': '#F5F7F6',
                'neutral-200': '#E1E5E3',
                'neutral-300': '#C8CEC9',
                'neutral-400': '#A6AEA8',
                'neutral-500': '#8D968F',
            },
            fontFamily: {
                sans: ['Nunito', 'sans-serif'],
                heading: ['Poppins', 'sans-serif'],
            },
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
            backgroundColor: ['active', 'disabled'],
            textColor: ['active', 'disabled'],
            borderColor: ['active', 'focus-visible', 'disabled'],
            ringColor: ['hover', 'active', 'focus-visible'],
        },
    },
    plugins: [],
};
