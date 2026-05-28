import { getSprintHubAPI, type UpdateUserDto } from "@/api/generated";
import { QUERY_KEYS } from "@/types/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const { usersControllerUpdate } = getSprintHubAPI()
export const useUpdateUser = () => {
  const queryClient = useQueryClient()


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
