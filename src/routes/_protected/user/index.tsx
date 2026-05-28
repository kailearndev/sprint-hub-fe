import User from '@/pages/User'
import { useAuthStore } from '@/store/useAuthStore'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/user/')({
  component: RouteComponent,
  beforeLoad: async () => {
    const authStore = useAuthStore.getState()
    if (authStore.user?.role !== 'SUPER_ADMIN') {
      // You can throw an error or redirect to another page if the user is not a SUPER_ADMIN
      return redirect({
        to: "/unauthored", // Redirect to a "Not Authorized" page or any other page you prefer
      }) // Redirect to a "Not Authorized" page or any other page you prefer
    }
  }
  // You can perform any checks here before the route loads.
  // For example, you might check if the user is authenticated or has the right permissions.
  // If the check fails, you can throw an error or redirect to another page.
})

function RouteComponent() {
  return <User />
}
