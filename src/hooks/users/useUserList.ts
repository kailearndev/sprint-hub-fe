import { getSprintHubAPI, type UsersControllerFindAllParams } from "@/api/generated";
import type { ApiResponse } from "@/types/api-response.type";
import { QUERY_KEYS } from "@/types/query-keys";
import type { IUserListResponse } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";


const { usersControllerFindAll } = getSprintHubAPI()

export const useUserList = (params?: UsersControllerFindAllParams) => {
    const { data, error, isLoading } = useQuery({
        queryKey: QUERY_KEYS.users.list(params),
        queryFn: async () => {
            const res: ApiResponse<IUserListResponse[]> = await usersControllerFindAll(params) as unknown as ApiResponse<IUserListResponse[]>
            return res
        },

    })

    return {
        users: data,
        error,
        isLoading,
    }
}