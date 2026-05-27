import User from '@/pages/User'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/user/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <User />
}
