import { useQuery } from '@tanstack/react-query'
import { getSprintHubAPI } from '../api/generated'

const { usersControllerMe } = getSprintHubAPI()

export function useMe() {
    const pathname = window.location.pathname

    return useQuery({
        queryKey: ['me'],
        queryFn: usersControllerMe,
        retry: false,
        enabled: pathname !== '/login' && pathname !== '/signup',

    })
}
