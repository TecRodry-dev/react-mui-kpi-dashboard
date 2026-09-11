import { useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import Sidebar from '../components/Sidebar.jsx'
import Topbar from '../components/Topbar.jsx'
import KpiCard from '../components/KpiCard.jsx'
import RevenueChart from '../components/RevenueChart.jsx'
import ComplianceList from '../components/ComplianceList.jsx'
import TransactionsTable from '../components/TransactionsTable.jsx'
import ImportDataDialog from '../components/ImportDataDialog.jsx'
import ModuleCard from '../components/ModuleCard.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { kpis, initialTransactions, modules } from '../data/mockData.js'

export default function Dashboard() {
  const { session } = useAuth()
  const [transactions, setTransactions] = useState(initialTransactions)
  const [importOpen, setImportOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const heroKpi = kpis.find((k) => k.hero)
  const secondaryKpis = kpis.filter((k) => !k.hero)

  const handleImport = (newRows) => {
    setTransactions((prev) => [...newRows, ...prev])
  }

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh', overflowX: 'hidden' }}>
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Topbar onMenuClick={() => setMobileOpen(true)} />

        <Box sx={{ p: { xs: 2.5, md: 4 } }}>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, sm: 12, md: 6 }} sx={{ minWidth: 0 }}>
              <KpiCard kpi={heroKpi} index={0} />
            </Grid>
            {secondaryKpis.map((kpi, i) => (
              <Grid key={kpi.id} size={{ xs: 12, sm: 4, md: 2 }} sx={{ minWidth: 0 }}>
                <KpiCard kpi={kpi} index={i + 1} />
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, md: 8 }} sx={{ minWidth: 0 }}>
              <RevenueChart />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} sx={{ minWidth: 0 }}>
              <ComplianceList />
            </Grid>
          </Grid>

          <Box sx={{ mb: 3 }}>
            <TransactionsTable
              transactions={transactions}
              onImportClick={() => setImportOpen(true)}
            />
          </Box>

          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
            Módulos
          </Typography>
          <Grid container spacing={2.5}>
            {modules.map((m) => (
              <Grid key={m.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <ModuleCard module={m} allowed={m.allowedRoles.includes(session?.role)} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <ImportDataDialog
        open={importOpen}
        onClose={() => setImportOpen(false)}
        onImport={handleImport}
      />
    </Box>
  )
}
