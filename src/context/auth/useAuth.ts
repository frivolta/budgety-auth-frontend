import { createContext, useContext, useDebugValue } from 'react'

export const AuthContext: any = createContext(undefined)

export function useAuth() {
  useDebugValue(AuthContext)
  return useContext(AuthContext)
}
