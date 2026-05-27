import axios, { type AxiosResponse } from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3333',
    withCredentials: true,
});

let refreshPromise: Promise<any> | null = null;

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config

        if (!originalRequest) {
            return Promise.reject(error)
        }

        const isAuthRequest =
            originalRequest.url?.includes('/auth/login') ||
            originalRequest.url?.includes('/auth/refresh')

        if (error.response?.status === 401 && !isAuthRequest) {
            originalRequest._retryCount = originalRequest._retryCount || 0

            if (originalRequest._retryCount >= 3) {
                return Promise.reject(error)
            }

            originalRequest._retryCount++

            try {
                if (!refreshPromise) {
                    refreshPromise = api.post('/auth/refresh').finally(() => {
                        refreshPromise = null
                    })
                }

                await refreshPromise
                return api(originalRequest)
            } catch {
                refreshPromise = null

                // Không redirect ở đây
                return Promise.reject(error)
            }
        }

        return Promise.reject(error)
    },
)