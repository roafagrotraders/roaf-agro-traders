import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            fontFamily: {
                sans: ['Nunito', 'system-ui', 'sans-serif'],
                serif: ['Merriweather', 'Georgia', 'serif'],
            },
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                success: {
                    DEFAULT: 'oklch(var(--success) / <alpha-value>)',
                    foreground: 'oklch(var(--success-foreground))'
                },
                warning: {
                    DEFAULT: 'oklch(var(--warning) / <alpha-value>)',
                    foreground: 'oklch(var(--warning-foreground))'
                },
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))'
                },
                sidebar: {
                    DEFAULT: 'oklch(var(--sidebar))',
                    foreground: 'oklch(var(--sidebar-foreground))',
                    primary: 'oklch(var(--sidebar-primary))',
                    'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
                    accent: 'oklch(var(--sidebar-accent))',
                    'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
                    border: 'oklch(var(--sidebar-border))',
                    ring: 'oklch(var(--sidebar-ring))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
                card: '0 2px 8px 0 rgba(0,0,0,0.08)',
                'card-hover': '0 4px 16px 0 rgba(0,0,0,0.12)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                // Agricultural & Horticultural animations
                'sway': {
                    '0%, 100%': { transform: 'rotate(-4deg) translateX(0px)' },
                    '25%': { transform: 'rotate(3deg) translateX(2px)' },
                    '50%': { transform: 'rotate(-2deg) translateX(-1px)' },
                    '75%': { transform: 'rotate(4deg) translateX(1px)' },
                },
                'sway-slow': {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                'float-up': {
                    '0%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.7' },
                    '50%': { transform: 'translateY(-18px) rotate(8deg)', opacity: '1' },
                    '100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.7' },
                },
                'leaf-drift': {
                    '0%': { transform: 'translate(0px, 0px) rotate(0deg)', opacity: '0' },
                    '10%': { opacity: '0.8' },
                    '90%': { opacity: '0.6' },
                    '100%': { transform: 'translate(-60px, -80px) rotate(-30deg)', opacity: '0' },
                },
                'grow-in': {
                    '0%': { transform: 'scaleY(0) translateY(10px)', opacity: '0', transformOrigin: 'bottom' },
                    '60%': { transform: 'scaleY(1.05) translateY(-2px)', opacity: '1', transformOrigin: 'bottom' },
                    '100%': { transform: 'scaleY(1) translateY(0px)', opacity: '1', transformOrigin: 'bottom' },
                },
                'sprout-pulse': {
                    '0%, 100%': { transform: 'scale(1)', opacity: '0.85' },
                    '50%': { transform: 'scale(1.08)', opacity: '1' },
                },
                'scroll-field': {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'pollen-float': {
                    '0%': { transform: 'translateY(0px) translateX(0px)', opacity: '0' },
                    '20%': { opacity: '0.6' },
                    '80%': { opacity: '0.4' },
                    '100%': { transform: 'translateY(-40px) translateX(20px)', opacity: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                // Agricultural & Horticultural animations
                'sway': 'sway 3s ease-in-out infinite',
                'sway-slow': 'sway-slow 5s ease-in-out infinite',
                'sway-delayed': 'sway 3.5s ease-in-out infinite 0.8s',
                'sway-alt': 'sway-slow 4s ease-in-out infinite 1.2s',
                'float-up': 'float-up 4s ease-in-out infinite',
                'float-up-delayed': 'float-up 4.5s ease-in-out infinite 1.5s',
                'float-up-slow': 'float-up 6s ease-in-out infinite 0.5s',
                'leaf-drift': 'leaf-drift 6s ease-in-out infinite',
                'leaf-drift-delayed': 'leaf-drift 7s ease-in-out infinite 2s',
                'leaf-drift-slow': 'leaf-drift 9s ease-in-out infinite 4s',
                'grow-in': 'grow-in 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                'sprout-pulse': 'sprout-pulse 3s ease-in-out infinite',
                'scroll-field': 'scroll-field 20s linear infinite',
                'pollen-float': 'pollen-float 5s ease-in-out infinite',
                'pollen-float-delayed': 'pollen-float 6s ease-in-out infinite 2s',
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
