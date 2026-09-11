// Datos de ejemplo. En un backend real esto vendría de .NET Core + SQL Server
// (así está construido el sistema en el que se inspira este demo).

export const roles = [
  { value: 'admin', label: 'Administrador' },
  { value: 'gerente', label: 'Gerente de área' },
  { value: 'asesor', label: 'Asesor comercial' },
]

export const kpis = [
  {
    id: 'ingresos',
    label: 'Ingresos del mes',
    value: 307450,
    format: 'currency',
    delta: 12.4,
    hero: true,
  },
  {
    id: 'facturas',
    label: 'Facturas pendientes',
    value: 38,
    format: 'number',
    delta: -6.1,
  },
  {
    id: 'metas',
    label: 'Cumplimiento de metas',
    value: 91,
    format: 'percent',
    delta: 4.2,
  },
  {
    id: 'inventario',
    label: 'Artículos en inventario',
    value: 5624,
    format: 'number',
    delta: 1.8,
  },
]

export const revenueEvolution = [
  { month: 'Abr', ingresos: 218000, meta: 230000 },
  { month: 'May', ingresos: 241500, meta: 235000 },
  { month: 'Jun', ingresos: 233800, meta: 240000 },
  { month: 'Jul', ingresos: 259200, meta: 245000 },
  { month: 'Ago', ingresos: 274600, meta: 250000 },
  { month: 'Sep', ingresos: 307450, meta: 260000 },
]

export const moduleCompliance = [
  { name: 'Requerimiento de fondos', value: 94 },
  { name: 'Recibos y liquidaciones', value: 88 },
  { name: 'Convenios comerciales', value: 76 },
  { name: 'Pedidos', value: 97 },
]

export const initialTransactions = [
  { id: 'TX-1042', cliente: 'Distribuidora Amaral', monto: 4820.5, estado: 'Pagado', fecha: '2026-09-08' },
  { id: 'TX-1041', cliente: 'Comercial Rosales', monto: 1290.0, estado: 'Pendiente', fecha: '2026-09-07' },
  { id: 'TX-1040', cliente: 'Grupo Iberia SV', monto: 9875.25, estado: 'Pagado', fecha: '2026-09-06' },
  { id: 'TX-1039', cliente: 'Ferretería Continental', monto: 640.0, estado: 'Vencido', fecha: '2026-09-04' },
  { id: 'TX-1038', cliente: 'Textiles del Valle', monto: 3120.75, estado: 'Pagado', fecha: '2026-09-03' },
]

export const modules = [
  {
    id: 'fondos',
    name: 'Requerimiento de fondos',
    description: 'Flujo de autorización con firma digital y distribución de pagos a plazos.',
    allowedRoles: ['admin', 'gerente'],
  },
  {
    id: 'recibos',
    name: 'Recibos y liquidaciones',
    description: 'Pagos mixtos, descuentos automáticos y aplicación a facturas.',
    allowedRoles: ['admin', 'gerente', 'asesor'],
  },
  {
    id: 'convenios',
    name: 'Convenios comerciales',
    description: 'Bonificaciones y seguimiento de cumplimiento de metas.',
    allowedRoles: ['admin', 'gerente'],
  },
  {
    id: 'pedidos',
    name: 'Pedidos e inventario',
    description: 'Inventario en tiempo real e importación masiva desde Excel.',
    allowedRoles: ['admin', 'gerente', 'asesor'],
  },
]
