import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from 'sonner'
import NotFound from '../components/layouts/NotFound'
import type { IUserResponse } from '@/types/user.type';

interface MyRouterContext {
    auth: {
        isAuthenticated: boolean;
        user: IUserResponse | null;
        isLoading: boolean;
    };
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
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