import { Paper, Box, Typography, LinearProgress } from '@mui/material'
import { moduleCompliance } from '../data/mockData.js'
import { tokens } from '../theme.js'

export default function ComplianceList() {
  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.25 }}>
        Cumplimiento por módulo
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
        Meta mensual alcanzada
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.25 }}>
        {moduleCompliance.map((m) => (
          <Box key={m.name}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2">{m.name}</Typography>
              <Typography variant="body2" className="figure" sx={{ fontWeight: 600 }}>
                {m.value}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={m.value}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: tokens.surfaceAlt,
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                  bgcolor: m.value >= 90 ? tokens.brand : tokens.gold,
                },
              }}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  )
}
