import { createContext, useContext, useState, useMemo } from 'react'

// Contexto de autenticación simulado. No hay backend real en este demo:
// el "token" es un objeto en memoria/sessionStorage, no un JWT firmado.
// En producción esto se conecta a un endpoint .NET Core que sí emite
// JWT + refresh token, como en el sistema real en el que se basa este panel.

const AuthContext = createContext(null)

const STORAGE_KEY = 'bitacora_session'

function readStoredSession() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession)

  const login = ({ email, role }) => {
    const nextSession = { email, role, loggedInAt: new Date().toISOString() }
    setSession(nextSession)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession))
  }

  const logout = () => {
    setSession(null)
    sessionStorage.removeItem(STORAGE_KEY)
  }

  const value = useMemo(
    () => ({ session, isAuthenticated: Boolean(session), login, logout }),
    [session],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
