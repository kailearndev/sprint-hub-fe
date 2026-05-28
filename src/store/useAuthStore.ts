import type { IUserResponse } from '@/types/user.type';
import { create } from 'zustand';

interface AuthState {
    isAuthenticated: boolean;
    user: IUserResponse | null;
    isLoading: boolean; // Dùng để đợi App check Cookie khi người dùng F5 trang
    setAuth: (user: IUserResponse) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true, // Mặc định ban đầu là true để App đi verify với Backend

    setAuth: (user) => set({ isAuthenticated: true, user, isLoading: false }),
    clearAuth: () => set({ isAuthenticated: false, user: null, isLoading: false }),
}));