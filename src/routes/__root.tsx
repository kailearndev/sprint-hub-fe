import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { RouterContext } from '../router'
import NotFound from '../pages/NotFound'

export const Route = createRootRouteWithContext<RouterContext>()({
    notFoundComponent: () => <NotFound />,

    component: () => (
        <>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),

})