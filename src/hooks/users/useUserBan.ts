import { getSprintHubAPI } from "@/api/generated";
import { QUERY_KEYS } from "@/types/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const { usersControllerRemove } = getSprintHubAPI()


export const useUserBan = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, }: { id: string }) =>
      usersControllerRemove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.users.lists(),
      })

    },

  })
}
