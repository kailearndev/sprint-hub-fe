import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import Layout from '../../components/layouts/Layout'


export const Route = createFileRoute('/(protected)')({
    beforeLoad: ({ context }) => {
        if (!context.auth.isLoading && !context.auth.isAuthenticated) {
            throw redirect({
                to: '/login'
            })
        }
    },
    component: HomeLayout,
})

function HomeLayout() {
    return (
        <Layout>
            <Outlet />
        </Layout>
    )
}
