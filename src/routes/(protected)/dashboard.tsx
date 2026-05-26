import { createFileRoute } from '@tanstack/react-router'
import Layout from '../../pages/Layout'

export const Route = createFileRoute('/(protected)/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <h1>Dashboard</h1>
}
