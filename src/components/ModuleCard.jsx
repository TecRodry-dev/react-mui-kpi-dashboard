import { Paper, Box, Typography, Chip } from '@mui/material'
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded'

export default function ModuleCard({ module, allowed }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        opacity: allowed ? 1 : 0.55,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {module.name}
        </Typography>
        {allowed ? (
          <LockOpenRoundedIcon fontSize="small" sx={{ color: 'primary.main' }} />
        ) : (
          <LockRoundedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
        )}
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
        {module.description}
      </Typography>
      <Chip
        label={allowed ? 'Acceso habilitado' : 'Restringido para tu rol'}
        size="small"
        sx={{
          alignSelf: 'flex-start',
          bgcolor: allowed ? 'rgba(74, 107, 168, 0.14)' : 'rgba(139, 149, 170, 0.14)',
          color: allowed ? 'primary.main' : 'text.secondary',
          fontWeight: 600,
        }}
      />
    </Paper>
  )
}
