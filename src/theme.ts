// Design System Theme Constants - Matching Logo Colors Exactly
export const theme = {
  colors: {
    primaryDark: '#0F1415', // Exact from logo
    primaryAccent: '#34C0CA', // Exact cyan from logo
    secondaryAccent: '#66BD59', // Exact green from logo
    surface: '#FFFFFF', // Exact white from logo
    // Logo gradient: #34C0CA -> #66BD59
    gradient: {
      primary: 'linear-gradient(135deg, #34C0CA 0%, #66BD59 100%)',
      primaryReverse: 'linear-gradient(135deg, #66BD59 0%, #34C0CA 100%)',
    },
    text: {
      primary: '#0F1415',
      secondary: '#525252',
      tertiary: '#737373',
      inverse: '#FFFFFF',
    },
    status: {
      success: '#66BD59', // Using logo green
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#34C0CA', // Using logo cyan
    },
  },
  typography: {
    fontFamily: 'Poppins, system-ui, sans-serif',
    h1: {
      fontSize: '28px',
      lineHeight: '1.2',
      fontWeight: 600,
    },
    h2: {
      fontSize: '22px',
      lineHeight: '1.3',
      fontWeight: 600,
    },
    body: {
      fontSize: '16px',
      lineHeight: '1.5',
      fontWeight: 400,
    },
    caption: {
      fontSize: '13px',
      lineHeight: '1.4',
      fontWeight: 400,
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    full: '9999px',
  },
  shadows: {
    card: '0 2px 8px rgba(0, 0, 0, 0.08)',
    cardHover: '0 4px 12px rgba(0, 0, 0, 0.12)',
    overlay: '0 -4px 24px rgba(0, 0, 0, 0.15)',
  },
} as const;

