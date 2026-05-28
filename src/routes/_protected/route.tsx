// routes/_protected.tsx
import Layout from '@/components/layouts/Layout';
import { api } from '@/services/api';
import { useAuthStore } from '@/store/useAuthStore';
import type { IUserResponse } from '@/types/user.type';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { toast } from 'sonner';


type Data = {
    data: IUserResponse
}

export const Route = createFileRoute('/_protected')({
    beforeLoad: async () => {
        const authStore = useAuthStore.getState()

        if (authStore.isAuthenticated) {
            return
        }

        try {
            const res = await api.get<Data>("/users/me")
            authStore.setAuth(res.data.data)
        } catch (error) {

            authStore.clearAuth() // Dù có lỗi gì đi nữa thì cũng xóa sạch sẽ auth state, tránh trường hợp dính lỗi cũ rồi vẫn để user ở trạng thái "đã đăng nhập" trong
            throw redirect({
                to: '/login',
            })
        }
    },
    component: () => (
        <Layout>
            <Outlet />
        </Layout>
    )
})