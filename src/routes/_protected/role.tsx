import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/role')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(protected)/role"!</div>
}
