import { UsersControllerFindAllRole, UsersControllerFindAllStatus } from "@/api/generated";

export const RoleOptions = [
    { value: UsersControllerFindAllRole.USER, label: "User" },
    { value: UsersControllerFindAllRole.SUPER_ADMIN, label: "Super Admin" },

] as const

export const StatusOptions = [
    { value: UsersControllerFindAllStatus.ACTIVE, label: "Active" },
    { value: UsersControllerFindAllStatus.INACTIVE, label: "Inactive" },
    { value: UsersControllerFindAllStatus.BANNED, label: "Banned" }
] as const

export type RoleOption = (typeof RoleOptions)[number]
export type StatusOption = (typeof StatusOptions)[number]
