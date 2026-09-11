import { createTheme } from '@mui/material/styles'

// Tokens — panel operativo tipo "sala de control": tinta profunda, teal de marca,
// oro como acento de énfasis, vino apagado para valores negativos.
export const tokens = {
  bg: '#0F1A1C',
  surface: '#16242A',
  surfaceAlt: '#1D2F33',
  border: '#28393D',
  text: '#EAF1EF',
  textMuted: '#93A9A6',
  brand: '#3FA88C',
  brandSoft: 'rgba(63, 168, 140, 0.14)',
  gold: '#D9A44E',
  goldSoft: 'rgba(217, 164, 78, 0.14)',
  negative: '#B1566A',
  negativeSoft: 'rgba(177, 86, 106, 0.14)',
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: tokens.bg,
      paper: tokens.surface,
    },
    text: {
      primary: tokens.text,
      secondary: tokens.textMuted,
    },
    primary: {
      main: tokens.brand,
      contrastText: '#0A1513',
    },
    secondary: {
      main: tokens.gold,
      contrastText: '#0A1513',
    },
    error: {
      main: tokens.negative,
    },
    divider: tokens.border,
  },
  typography: {
    fontFamily: '"IBM Plex Sans", "Segoe UI", sans-serif',
    h1: { fontFamily: '"IBM Plex Sans", sans-serif', fontWeight: 600 },
    h2: { fontFamily: '"IBM Plex Sans", sans-serif', fontWeight: 600 },
    h3: { fontFamily: '"IBM Plex Sans", sans-serif', fontWeight: 600 },
    h4: { fontFamily: '"IBM Plex Sans", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"IBM Plex Sans", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"IBM Plex Sans", sans-serif', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: `1px solid ${tokens.border}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: tokens.border,
        },
      },
    },
  },
})

export default theme
