import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/user/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(protected)/user/$id"!</div>
}
