import { Paper, Box, Typography } from '@mui/material'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
} from 'recharts'
import { revenueEvolution } from '../data/mockData.js'
import { tokens } from '../theme.js'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <Box
      sx={{
        bgcolor: tokens.surfaceAlt,
        border: `1px solid ${tokens.border}`,
        borderRadius: 2,
        px: 1.5,
        py: 1,
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      {payload.map((entry) => (
        <Typography
          key={entry.dataKey}
          variant="body2"
          className="figure"
          sx={{ color: entry.color, fontWeight: 600 }}
        >
          {entry.name}: ${entry.value.toLocaleString('es-SV')}
        </Typography>
      ))}
    </Box>
  )
}

export default function RevenueChart() {
  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.25 }}>
        Evolución de ingresos
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Últimos 6 meses vs. meta mensual
      </Typography>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={revenueEvolution} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="ingresosGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={tokens.brand} stopOpacity={0.35} />
              <stop offset="100%" stopColor={tokens.brand} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={tokens.border} vertical={false} />
          <XAxis
            dataKey="month"
            stroke={tokens.textMuted}
            tickLine={false}
            axisLine={{ stroke: tokens.border }}
            fontSize={12}
          />
          <YAxis
            stroke={tokens.textMuted}
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tickFormatter={(v) => `$${v / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="ingresos"
            name="Ingresos"
            stroke={tokens.brand}
            strokeWidth={2}
            fill="url(#ingresosGradient)"
          />
          <Line
            type="monotone"
            dataKey="meta"
            name="Meta"
            stroke={tokens.gold}
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  )
}
