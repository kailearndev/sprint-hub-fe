// src/auth/auth-context.tsx
import { createContext, useContext, useState } from 'react'

type User = {
    id: string
    name: string
    email: string
}

export type AuthContextValue = {
    user: User | null
    isAuthenticated: boolean
    login: (token: string, user: User) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    const login = (token: string, user: User) => {
        localStorage.setItem('token', token)
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const auth = useContext(AuthContext)

    if (!auth) {
        throw new Error('useAuth must be used inside AuthProvider')
    }

    return auth
}