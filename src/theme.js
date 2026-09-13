import { createTheme } from '@mui/material/styles'

// Tokens — Paleta de colores azul marino oscuro con tonos azulados
export const tokens = {
  bg: '#1A2A40', // azul marino oscuro (fondo principal)
  surface: '#2D3F57', // azul oscuro secundario (superficies)
  surfaceAlt: '#f5f7fa', // fondo claro de tarjetas
  border: '#D6DEEA', // gris azulado (bordes/divisores)
  text: '#ECF0F6', // azul muy claro (texto principal)
  textMuted: '#8B95AA', // gris azulado (texto secundario)
  brand: '#4A6BA8', // azul medio (acciones/hover)
  brandSoft: 'rgba(74, 107, 168, 0.14)',
  gold: '#4b9bff', // azul acción secundario
  goldSoft: 'rgba(75, 155, 255, 0.14)',
  negative: '#E74C3C', // rojo (error)
  negativeSoft: 'rgba(231, 76, 60, 0.14)',
  success: '#00A578', // verde (éxito)
  successSoft: 'rgba(0, 165, 120, 0.14)',
  warning: '#FF9F43', // naranja (advertencia)
  warningSoft: 'rgba(255, 159, 67, 0.14)',
  info: '#1976d2', // azul (info)
  infoSoft: 'rgba(25, 118, 210, 0.14)',
  appBg: '#EAF5F5', // fondo general de la app
}

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: tokens.appBg,
      paper: '#ffffff',
    },
    text: {
      primary: tokens.bg,
      secondary: tokens.textMuted,
    },
    primary: {
      main: tokens.brand,
      contrastText: '#ffffff',
    },
    secondary: {
      main: tokens.gold,
      contrastText: '#ffffff',
    },
    error: {
      main: tokens.negative,
    },
    success: {
      main: tokens.success,
    },
    warning: {
      main: tokens.warning,
    },
    info: {
      main: tokens.info,
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
          backgroundColor: tokens.surfaceAlt,
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
