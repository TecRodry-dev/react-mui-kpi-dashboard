import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Swal from 'sweetalert2'
import { motion } from 'framer-motion'
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
} from '@mui/material'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import { useAuth } from '../context/AuthContext.jsx'
import { roles } from '../data/mockData.js'
import { tokens } from '../theme.js'

// Instancia de axios ya configurada apuntando a una API .NET Core.
// En este demo no hay backend real, así que la llamada se simula
// con mockLogin() más abajo — pero la instancia queda lista para
// conectarse a un endpoint real sin tocar el resto del formulario.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:5001/api',
  timeout: 8000,
})

function mockLogin({ email, role }) {
  // Simula latencia de red y devuelve una respuesta con forma de JWT.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          token: 'demo.jwt.token',
          user: { email, role },
        },
      })
    }, 700)
  })
}

const validationSchema = Yup.object({
  email: Yup.string().email('Correo inválido').required('El correo es requerido'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('La contraseña es requerida'),
  role: Yup.string().required('Selecciona un rol'),
})

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [submitError, setSubmitError] = useState('')

  const formik = useFormik({
    initialValues: { email: '', password: '', role: 'gerente' },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitError('')
      try {
        // void api.post('/auth/login', values) — así se vería con backend real
        const response = await mockLogin(values)
        login({ email: response.data.user.email, role: response.data.user.role })
        await Swal.fire({
          icon: 'success',
          title: 'Sesión iniciada',
          text: `Bienvenido, ${response.data.user.email}`,
          background: tokens.surface,
          color: tokens.text,
          confirmButtonColor: tokens.brand,
          timer: 1400,
          showConfirmButton: false,
        })
        navigate('/dashboard')
      } catch (err) {
        setSubmitError('No se pudo iniciar sesión. Intenta de nuevo.')
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        px: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Paper
          elevation={0}
          sx={{
            width: 380,
            maxWidth: '100%',
            p: 4,
            borderRadius: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 0.5 }}>
            <InsightsRoundedIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
              Bitácora
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Panel operativo — inicia sesión para ver tus módulos.
          </Typography>

          <form onSubmit={formik.handleSubmit} noValidate>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Correo"
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              type="password"
              label="Contraseña"
              margin="normal"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              select
              fullWidth
              id="role"
              name="role"
              label="Rol"
              margin="normal"
              value={formik.values.role}
              onChange={formik.handleChange}
              helperText="El rol controla qué módulos ves en el panel"
            >
              {roles.map((r) => (
                <MenuItem key={r.value} value={r.value}>
                  {r.label}
                </MenuItem>
              ))}
            </TextField>

            {submitError && (
              <Typography variant="body2" sx={{ color: 'error.main', mt: 1 }}>
                {submitError}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={formik.isSubmitting}
              sx={{ mt: 3, py: 1.1 }}
            >
              {formik.isSubmitting ? <CircularProgress size={22} color="inherit" /> : 'Entrar'}
            </Button>

            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
              Demo: cualquier correo y contraseña de 6+ caracteres funcionan. No hay backend real
              detrás de este formulario.
            </Typography>
          </form>
        </Paper>
      </motion.div>
    </Box>
  )
}
