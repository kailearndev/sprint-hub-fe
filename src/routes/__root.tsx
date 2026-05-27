import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from 'sonner'
import NotFound from '../components/layouts/NotFound'
import type { RouterContext } from '../router'

export const Route = createRootRouteWithContext<RouterContext>()({
    notFoundComponent: () => <NotFound />,

    component: Root,
})

function Root() {

    return (
        <>
            <Toaster position="top-right" />
            <Outlet />
            <TanStackRouterDevtools />
        </>
    )
}