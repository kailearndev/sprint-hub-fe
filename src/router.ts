import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export interface RouterContext {
    auth: {
        isLoading: boolean
        isAuthenticated: boolean
    }
}

export const router = createRouter({
    routeTree,
    context: {
        auth: {
            isLoading: false,
            isAuthenticated: false,
            user: null,
        },
    }
})

declare module '@tanstack/react-router' {

    interface Register {
        router: typeof router
    }
}
