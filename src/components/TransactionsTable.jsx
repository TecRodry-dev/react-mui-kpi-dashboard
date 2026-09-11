import {
  Paper,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
} from '@mui/material'
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded'
import { tokens } from '../theme.js'

const statusColor = {
  Pagado: { bg: tokens.brandSoft, fg: tokens.brand },
  Pendiente: { bg: tokens.goldSoft, fg: tokens.gold },
  Vencido: { bg: tokens.negativeSoft, fg: tokens.negative },
}

const currencyFormatter = new Intl.NumberFormat('es-SV', {
  style: 'currency',
  currency: 'USD',
})

export default function TransactionsTable({ transactions, onImportClick }) {
  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.25 }}>
            Transacciones recientes
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Módulo de recibos y liquidaciones
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="small"
          startIcon={<UploadFileRoundedIcon fontSize="small" />}
          onClick={onImportClick}
        >
          Importar Excel
        </Button>
      </Box>

      <Box sx={{ overflowX: 'auto' }}>
      <Table size="small" sx={{ minWidth: 480 }}>
        <TableHead>
          <TableRow>
            <TableCell>Folio</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell align="right">Monto</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx) => {
            const colors = statusColor[tx.estado] ?? statusColor.Pendiente
            return (
              <TableRow key={tx.id} hover>
                <TableCell className="figure">{tx.id}</TableCell>
                <TableCell>{tx.cliente}</TableCell>
                <TableCell align="right" className="figure">
                  {currencyFormatter.format(tx.monto)}
                </TableCell>
                <TableCell>
                  <Chip
                    label={tx.estado}
                    size="small"
                    sx={{ bgcolor: colors.bg, color: colors.fg, fontWeight: 600 }}
                  />
                </TableCell>
                <TableCell className="figure">{tx.fecha}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      </Box>
    </Paper>
  )
}
