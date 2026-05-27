import { createContext } from 'react'

type User = {
    data: {
        id: string
        name: string
        email: string
        role: "USER" | "SUPER_ADMIN"
    }
}

export type AuthContextValue = {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<unknown>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
