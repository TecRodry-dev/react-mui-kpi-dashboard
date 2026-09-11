import { useRef, useState } from 'react'
import * as XLSX from 'xlsx'
import Swal from 'sweetalert2'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  LinearProgress,
} from '@mui/material'
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded'
import { tokens } from '../theme.js'

// Busca un valor en una fila probando varios nombres de columna posibles
// (mayúsculas/minúsculas, español/inglés) — así el import es tolerante
// a plantillas de Excel distintas, igual que en el módulo real.
function pick(row, candidates) {
  const keys = Object.keys(row)
  for (const candidate of candidates) {
    const match = keys.find((k) => k.toLowerCase().trim() === candidate)
    if (match) return row[match]
  }
  return undefined
}

function normalizeRow(row, index) {
  const cliente = pick(row, ['cliente', 'client', 'nombre']) ?? `Cliente ${index + 1}`
  const monto = Number(pick(row, ['monto', 'amount', 'total']) ?? 0)
  const estado = pick(row, ['estado', 'status']) ?? 'Pendiente'
  const fecha = pick(row, ['fecha', 'date']) ?? new Date().toISOString().slice(0, 10)
  return {
    id: `TX-IMP-${1000 + index}`,
    cliente: String(cliente),
    monto: Number.isFinite(monto) ? monto : 0,
    estado: String(estado),
    fecha: String(fecha),
  }
}

export default function ImportDataDialog({ open, onClose, onImport }) {
  const fileInputRef = useRef(null)
  const [fileName, setFileName] = useState('')
  const [loading, setLoading] = useState(false)

  const resetState = () => {
    setFileName('')
    setLoading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    setLoading(true)

    try {
      const buffer = await file.arrayBuffer()
      const workbook = XLSX.read(buffer, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[firstSheetName]
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' })

      if (rows.length === 0) {
        throw new Error('El archivo no tiene filas de datos.')
      }

      const normalized = rows.slice(0, 200).map(normalizeRow)
      onImport(normalized)
      onClose()

      await Swal.fire({
        icon: 'success',
        title: 'Importación completada',
        text: `Se agregaron ${normalized.length} registros desde "${file.name}".`,
        background: tokens.surface,
        color: tokens.text,
        confirmButtonColor: tokens.brand,
      })
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'No se pudo importar el archivo',
        text: err.message || 'Verifica que el archivo sea .xlsx, .xls o .csv válido.',
        background: tokens.surface,
        color: tokens.text,
        confirmButtonColor: tokens.negative,
      })
    } finally {
      resetState()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>Importar transacciones</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Sube un archivo .xlsx, .xls o .csv. Se reconocen columnas como "Cliente", "Monto",
          "Estado" y "Fecha" (mayúsculas/minúsculas no importan).
        </Typography>

        <Box
          onClick={() => fileInputRef.current?.click()}
          sx={{
            border: '1px dashed',
            borderColor: 'divider',
            borderRadius: 2,
            p: 3,
            textAlign: 'center',
            cursor: 'pointer',
            '&:hover': { borderColor: 'primary.main' },
          }}
        >
          <UploadFileRoundedIcon sx={{ color: 'text.secondary', mb: 1 }} />
          <Typography variant="body2">
            {fileName || 'Haz clic para seleccionar un archivo'}
          </Typography>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            hidden
            onChange={handleFileChange}
          />
        </Box>

        {loading && <LinearProgress sx={{ mt: 2, borderRadius: 3 }} />}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  )
}
