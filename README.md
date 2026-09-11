# Bitácora — Panel operativo (pieza de portafolio)

Dashboard empresarial de ejemplo construido con el stack real que uso en producción:
**React 19 + Vite, Material UI v7, Framer Motion, Recharts, Formik + Yup, Axios,
SweetAlert2 y xlsx**.

No expone código ni datos de ningún cliente real — es una recreación desde cero,
inspirada en el tipo de módulos que desarrollo en mi trabajo actual (KPIs en tiempo
real, control de roles y permisos, importación masiva desde Excel, dashboards
analíticos), pero con datos y nombres ficticios.

## Cómo correrlo localmente

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`. En el login, cualquier correo válido y una contraseña
de 6+ caracteres funcionan — no hay backend real detrás (ver sección siguiente).

## Qué incluye

- **Login con Formik + Yup**: validación de formulario, selector de rol (Admin /
  Gerente / Asesor) que luego controla qué módulos se ven en el sidebar — así se
  demuestra RBAC sin necesitar un backend real.
- **KPIs animados con Framer Motion**: entrada escalonada de las tarjetas al cargar
  el dashboard.
- **Gráfica de evolución con Recharts**: ingresos mensuales vs. meta, con tooltip
  personalizado.
- **Importación de Excel/CSV con `xlsx`**: sube un archivo `.xlsx`, `.xls` o `.csv`
  y las filas se agregan a la tabla de transacciones. Reconoce columnas comunes
  (Cliente, Monto, Estado, Fecha) sin importar mayúsculas.
- **Confirmaciones con SweetAlert2**: al iniciar sesión y al importar datos.
- **Axios ya configurado** (`src/pages/Login.jsx`): la llamada real a un backend
  está comentada y lista — solo falta apuntar `VITE_API_URL` a una API .NET Core
  real y quitar el mock.

## Cómo se conecta con mi experiencia real

Este demo recrea, de forma simplificada, módulos que construí en producción para
**ProbeOffice** (React 19 + Vite, .NET Core, SQL Server): dashboards con KPIs en
tiempo real, control de roles y permisos con JWT, e importación masiva desde Excel.
Como ese código es privado y corporativo, esta es la versión pública que sí puedo
mostrar y compartir el repositorio.

## Siguiente paso: backend real

Para pasar esto a producción, el backend natural es una API .NET Core + SQL Server
(mi stack real), desplegada en Azure App Service (plan F1 gratis para empezar) con
Azure SQL Database (también con capa gratuita). El frontend, tal como está, se
despliega gratis en Vercel o Netlify apuntando a esa API.

## Estructura

```
src/
  components/     Sidebar, Topbar, KpiCard, RevenueChart, ComplianceList,
                   TransactionsTable, ImportDataDialog, ModuleCard
  context/        AuthContext (sesión simulada)
  data/           mockData.js — KPIs, transacciones, módulos de ejemplo
  pages/          Login, Dashboard
  theme.js        Tema de Material UI (paleta, tipografía)
```
