import { useAuthStore } from '@/store/useAuthStore';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_guest')({
  beforeLoad: async () => {
    const authStore = useAuthStore.getState()

    if (authStore.isAuthenticated) {
      throw redirect({
        to: '/',
      })
    }


  },
  component: () => <Outlet />,
})
