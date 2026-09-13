import { Box, Drawer, Typography, List, ListItemButton, ListItemIcon, ListItemText, Divider, Chip } from '@mui/material'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded'
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded'
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { useAuth } from '../context/AuthContext.jsx'
import { modules, roles } from '../data/mockData.js'

const icons = {
  fondos: AccountBalanceWalletRoundedIcon,
  recibos: ReceiptLongRoundedIcon,
  convenios: HandshakeRoundedIcon,
  pedidos: Inventory2RoundedIcon,
}

export const SIDEBAR_WIDTH = 248

function SidebarContent({ onNavigate }) {
  const { session, logout } = useAuth()
  const roleLabel = roles.find((r) => r.value === session?.role)?.label ?? session?.role

  return (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        px: 2,
        py: 2.5,
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.1, px: 1, mb: 3 }}>
        <InsightsRoundedIcon sx={{ color: 'primary.main' }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
          Bitácora
        </Typography>
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ px: 1, mb: 0.5 }}>
        Módulos
      </Typography>
      <List sx={{ py: 0 }}>
        <ListItemButton selected onClick={onNavigate} sx={{ borderRadius: 2, mb: 0.5 }}>
          <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
            <InsightsRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Resumen" primaryTypographyProps={{ fontSize: 14 }} />
        </ListItemButton>

        {modules.map((m) => {
          const Icon = icons[m.id]
          const allowed = m.allowedRoles.includes(session?.role)
          return (
            <ListItemButton
              key={m.id}
              disabled={!allowed}
              onClick={onNavigate}
              sx={{ borderRadius: 2, mb: 0.5, opacity: allowed ? 1 : 0.45 }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={m.name} primaryTypographyProps={{ fontSize: 14 }} />
            </ListItemButton>
          )
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider sx={{ mb: 1.5 }} />
      <Box sx={{ px: 1, mb: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {session?.email}
        </Typography>
        <Chip
          label={roleLabel}
          size="small"
          sx={{ mt: 0.5, bgcolor: 'rgba(74, 107, 168, 0.14)', color: 'primary.main', fontWeight: 600 }}
        />
      </Box>
      <ListItemButton onClick={logout} sx={{ borderRadius: 2 }}>
        <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
          <LogoutRoundedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Cerrar sesión" primaryTypographyProps={{ fontSize: 14 }} />
      </ListItemButton>
    </Box>
  )
}

// En pantallas md+ el sidebar queda fijo y siempre visible (variant="permanent").
// Debajo de md se convierte en un panel que entra desde la izquierda
// (variant="temporary"), controlado por el botón de menú del Topbar.
export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <Box component="nav" sx={{ width: { md: SIDEBAR_WIDTH }, flexShrink: { md: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box',
            bgcolor: 'background.default',
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        <SidebarContent onNavigate={onClose} />
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box',
            bgcolor: 'background.default',
            borderRight: '1px solid',
            borderColor: 'divider',
            position: 'sticky',
            height: '100vh',
          },
        }}
        open
      >
        <SidebarContent />
      </Drawer>
    </Box>
  )
}
