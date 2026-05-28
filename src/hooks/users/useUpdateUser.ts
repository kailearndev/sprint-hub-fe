import { getSprintHubAPI, type UpdateUserDto } from "@/api/generated";
import { getApiErrorMessage } from "@/lib/get-api-error-message";
import { QUERY_KEYS } from "@/types/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  const { usersControllerUpdate } = getSprintHubAPI()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
      usersControllerUpdate(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.users.detail(variables.id),
      })
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.users.lists(),
      })

    },
    
  })
}
