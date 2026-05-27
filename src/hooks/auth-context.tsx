import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { getSprintHubAPI } from '../api/generated'
import { AuthContext } from './auth'
import { useMe } from './useMe'

const { authControllerLogin, authControllerLogout, usersControllerMe } = getSprintHubAPI()
export function AuthProvider({ children }: { children: React.ReactNode }) {

    const queryClient = useQueryClient()

    const { data: userData, isLoading: isQueryLoading } = useMe()

    const login = async (email: string, password: string) => {
        try {
            const res = await authControllerLogin({ email, password })

            const user = await queryClient.fetchQuery({
                queryKey: ['me'],
                queryFn: usersControllerMe,
            })

            queryClient.setQueryData(['me'], user)

            return res
        } catch (error) {
            throw error
        }
    }

    const logout = useCallback(async () => {
        try {
            await authControllerLogout()
        } finally {
            queryClient.setQueryData(['me'], null)

            if (typeof window !== 'undefined') {
                window.location.href = '/login'
            }
        }
    }, [queryClient])

    const isAuthenticated = !!userData
    const isLoading = isQueryLoading

    return (
        <AuthContext.Provider
            value={{
                user: userData || null,
                isLoading,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
