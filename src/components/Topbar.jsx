import { Box, Typography, TextField, InputAdornment, IconButton } from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'

const today = new Date()
const formattedRange = `1 – ${today.getDate()} ${today.toLocaleDateString('es-SV', { month: 'long' })}`

export default function Topbar({ onMenuClick }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, md: 4 },
        py: 2.5,
        borderBottom: '1px solid',
        borderColor: 'divider',
        gap: 2,
        flexWrap: 'wrap',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
        <IconButton
          onClick={onMenuClick}
          sx={{ display: { xs: 'inline-flex', md: 'none' } }}
          aria-label="Abrir menú"
        >
          <MenuRoundedIcon />
        </IconButton>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
            Resumen operativo
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.25 }}>
            <CalendarTodayRoundedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
              {formattedRange}
            </Typography>
          </Box>
        </Box>
      </Box>

      <TextField
        size="small"
        placeholder="Buscar cliente, factura, módulo…"
        sx={{ width: { xs: '100%', sm: 280 } }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  )
}
