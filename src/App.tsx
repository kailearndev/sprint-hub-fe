// App.tsx
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';

function App() {
  // Lấy trạng thái từ Zustand để biết khi nào user bấm login/logout thành công
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Đồng bộ Router: Mỗi khi trạng thái Auth đổi, ép Router check lại quyền
  useEffect(() => {
    router.invalidate();
  }, [isAuthenticated]);

  // RENDER THẲNG LUÔN, không bọc loading nhấp nháy gì ở đây nữa cả!
  return (
    <RouterProvider router={router} />
  );
}

export default App;