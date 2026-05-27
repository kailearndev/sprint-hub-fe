import { RouterProvider } from '@tanstack/react-router'
import { useAuth } from './hooks/useAuth'
import { router } from './router'

function App() {
  const auth = useAuth()

  return (
    <RouterProvider
      router={router}
      context={{
        auth: {
          isLoading: auth.isLoading,
          isAuthenticated: auth.isAuthenticated,
        },
      }}
    />
  )
}

export default App
