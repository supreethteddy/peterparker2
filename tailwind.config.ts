/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            dark: '#0F1415',
            accent: '#34C0CA',
            accentHover: '#2BA8B2',
            accentActive: '#25909A',
          },
          secondary: {
            accent: '#66BD59',
            accentHover: '#52A547',
            accentActive: '#3D8A35',
          },
          surface: '#FFFFFF',
          status: {
            success: '#66BD59',
            warning: '#F59E0B',
            error: '#EF4444',
            info: '#34C0CA',
          },
          gradient: {
            from: '#34C0CA',
            to: '#66BD59',
          },
          neutral: {
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#E5E5E5',
            300: '#D4D4D4',
            400: '#A3A3A3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
          },
        },
        fontFamily: {
          sans: ['Poppins', 'system-ui', 'sans-serif'],
        },
        fontSize: {
          'h1': ['28px', { lineHeight: '1.2', fontWeight: '600' }],
          'h2': ['22px', { lineHeight: '1.3', fontWeight: '600' }],
          'body': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
          'caption': ['13px', { lineHeight: '1.4', fontWeight: '400' }],
        },
        borderRadius: {
          'card': '12px',
          'button': '12px',
          'large': '16px',
        },
        boxShadow: {
          'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
          'card-hover': '0 4px 12px rgba(0, 0, 0, 0.12)',
          'overlay': '0 -4px 24px rgba(0, 0, 0, 0.15)',
        },
      },
    },
    plugins: [],
  }