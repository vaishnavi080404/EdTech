// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // --- THIS IS THE CORRECTED AND MERGED SECTION ---
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'soft-terracotta': '#FFF1F0',
        'warm-stone': '#8D837C',
        'burnt-sienna': '#D95D39',
        'espresso-brown': '#4A3F35',
        'light-gray': '#CED4DA',
        'mid-gray': '#343A40',
        'rose-gold': '#B76E79',
        'muted-terracotta': '#F8E8E6',
        'glow-purple': '#a855f7',
        'glow-blue': '#3B82F6',
        'glow-green': '#22C55E',
        'glow-yellow': '#EAB308',
        'glow-red': '#EF4444', 
        'vibrant-cyan': '#17A2B8',
      },
      boxShadow: {
        'wave': '0 10px 25px -5px rgba(22, 27, 34, 0.3)', 
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.6)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.6)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.6)',
        'glow-yellow': '0 0 20px rgba(234, 179, 8, 0.6)',
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.6)',
        'glow-cyan': '0 0 20px rgba(23, 162, 184, 0.5)', 
      },
      keyframes: {
        // For general fade-in animations
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // For the hero background
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        // For the CodeBlock sphere
        spherePulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.2' },
          '50%': { transform: 'scale(1.05)', opacity: '0.3' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
         zoomAndShake: {
          '0%': { transform: 'scale(0.8) rotate(0deg)', opacity: '0' },
          '80%': { transform: 'scale(1.05) rotate(-2deg)' },
          '90%': { transform: 'scale(0.98) rotate(2deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },rocketWiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        rocketLaunch: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-150vh)', opacity: '0' },
        },
        smokePuff: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.2)', opacity: '0.5' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        textPopIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeOut: { // You should already have this, but ensure it's here
          '0%': { opacity: '1' },
          '100%': { opacity: '0', visibility: 'hidden' },
        },
      },
      animation: {
        // Generic fadeInUp for staggered effects
        'fadeInUp': 'fadeInUp 1s ease-out forwards',
        // Specific durations for fadeInUp
        'fadeInUp-slow': 'fadeInUp 1s ease-out forwards',
        'fadeInUp-medium': 'fadeInUp 0.8s ease-out forwards',
        'fadeInUp-fast': 'fadeInUp 0.6s ease-out forwards',
        // Other animations
        'aurora': 'aurora 15s ease infinite',
        'sphere-pulse': 'spherePulse 8s ease-in-out infinite',
        'fadeIn-left': 'fadeInLeft 1s ease-out forwards',
        'fadeIn-right': 'fadeInRight 1s ease-out forwards',
         'zoom-and-shake': 'zoomAndShake 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
          'rocket-wiggle': 'rocketWiggle 0.3s ease-in-out infinite',
        'rocket-launch': 'rocketLaunch 1s ease-in forwards',
        'smoke-puff': 'smokePuff 1.5s ease-out infinite',
        'text-pop-in': 'textPopIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards',
        'fade-out-slow': 'fadeOut 0.5s ease-out forwards',
      },
      animationDelay: {
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '800': '800ms', // Added for the timeline image
      },
    },
    // --- END OF CORRECTED SECTION ---
  },
  plugins: [],
}