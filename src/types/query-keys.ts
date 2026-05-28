import type { UsersControllerFindAllParams } from "@/api/generated";

export const QUERY_KEYS = {
    me: ['me'],

    users: {
        all: ['users'],
        list: (params?: UsersControllerFindAllParams) => ['users', 'list', params] as const,
        detail: (id: string | number) => ['users', 'detail', id] as const,
    },
} as const