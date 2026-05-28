import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/kanban')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(protected)/kanban"!</div>
}
