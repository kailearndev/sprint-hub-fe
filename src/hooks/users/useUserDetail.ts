import { getSprintHubAPI, type CreateUserDto } from "@/api/generated";
import type { ApiResponse } from "@/types/api-response.type";
import { QUERY_KEYS } from "@/types/query-keys";
import { useQuery } from "@tanstack/react-query";


const { usersControllerFindOne } = getSprintHubAPI()

export const useUserDetail = (userId: string) => {
    const { data, error, isLoading } = useQuery({
        queryKey: QUERY_KEYS.users.detail(userId),
        queryFn: async () => {
            const res: ApiResponse<CreateUserDto> = await usersControllerFindOne(userId) as unknown as ApiResponse<CreateUserDto>
            return res
        },
        enabled: !!userId,
    })

    return {
        users: data,
        error,
        isLoading,
    }
}