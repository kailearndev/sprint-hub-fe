import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './hooks/auth-context.tsx'
import './index.css'
import { Toaster } from 'sonner'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Toaster position="top-right" />
    <AuthProvider>
      <App />
    </AuthProvider>
  </QueryClientProvider>

)
