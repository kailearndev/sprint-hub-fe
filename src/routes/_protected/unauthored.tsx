import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/unauthored')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="flex items-center justify-center h-screen">
    <h1 className="text-2xl font-bold">You are not authorized to view this page.</h1>
  </div>
}
