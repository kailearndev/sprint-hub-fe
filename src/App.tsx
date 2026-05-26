import { RouterProvider } from '@tanstack/react-router'
import { useAuth } from './hooks/auth-context.tsx'
import { router } from './router'

function App() {
  const auth = useAuth()

  return (
    <RouterProvider
      router={router}
      context={{
        auth: {
          isAuthenticated: auth.isAuthenticated,
        },
      }}
    />
  )
}

export default App