import { Paper, Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded'

const currencyFormatter = new Intl.NumberFormat('es-SV', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})
const numberFormatter = new Intl.NumberFormat('es-SV')

function formatValue(value, format) {
  if (format === 'currency') return currencyFormatter.format(value)
  if (format === 'percent') return `${value}%`
  return numberFormatter.format(value)
}

export default function KpiCard({ kpi, index = 0 }) {
  const isPositive = kpi.delta >= 0
  const DeltaIcon = isPositive ? TrendingUpRoundedIcon : TrendingDownRoundedIcon

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      style={{ height: '100%' }}
    >
      <Paper
        elevation={0}
        sx={{
          height: '100%',
          p: kpi.hero ? 3.5 : 2.75,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          bgcolor: 'background.paper',
          background: kpi.hero
            ? 'linear-gradient(160deg, rgba(63,168,140,0.14), rgba(22,36,42,0) 70%)'
            : undefined,
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mb: kpi.hero ? 2 : 1.25 }}>
          {kpi.label}
        </Typography>
        <Typography
          className="figure"
          sx={{
            fontSize: kpi.hero ? { xs: 30, sm: 34, md: 40 } : { xs: 22, md: 26 },
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            wordBreak: 'break-word',
          }}
        >
          {formatValue(kpi.value, kpi.format)}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1.5, flexWrap: 'wrap' }}>
          <DeltaIcon
            fontSize="small"
            sx={{ color: isPositive ? 'primary.main' : 'error.main' }}
          />
          <Typography
            variant="body2"
            className="figure"
            sx={{ color: isPositive ? 'primary.main' : 'error.main', fontWeight: 600 }}
          >
            {isPositive ? '+' : ''}
            {kpi.delta}%
          </Typography>
          <Typography variant="caption" color="text.secondary">
            vs. mes anterior
          </Typography>
        </Box>
      </Paper>
    </motion.div>
  )
}
