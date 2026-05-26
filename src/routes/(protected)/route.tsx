import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import Layout from '../../pages/Layout'


export const Route = createFileRoute('/(protected)')({
    beforeLoad: ({ context }) => {
        if (context.auth.isAuthenticated) {
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