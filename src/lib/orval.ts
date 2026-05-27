import type { AxiosRequestConfig } from 'axios'
import { api } from '../services/api'

export const customInstance = async <T>(
    config: AxiosRequestConfig,
): Promise<T> => {
    const response = await api.request<T>(config)

    return response.data
}