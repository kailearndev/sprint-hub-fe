import type { UsersControllerFindAllRole, UsersControllerFindAllStatus } from "@/api/generated";
import { DataTable } from "@/components/common/DataTable";
import { useUserList } from "@/hooks/users/useUserList";
import type { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "./components/UserColumns";
import UserSearch from "./components/UserSearch";

export default function User() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState<{
        role?: UsersControllerFindAllRole
        status?: UsersControllerFindAllStatus
    }>({
        role: undefined,
        status: undefined,
    })
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const { users, isLoading } = useUserList({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: searchTerm,
        role: filters.role,
        status: filters.status,
    })

    return (
        <section className="flex flex-col gap-4">
            <UserSearch
                onSearch={(value) => {
                    setSearchTerm(value);
                }}
                onRoleFilterChange={(value) => {
                    setFilters((prev) => ({ ...prev, role: value?.value }))
                }}
                onStatusFilterChange={(value) => {
                    setFilters((prev) => ({ ...prev, status: value?.value }))
                }}
            />

            <DataTable
                columns={columns}
                data={users?.data || []}
                pageCount={users?.meta.totalPages || 0}
                pagination={pagination}
                onPaginationChange={setPagination}
                loading={isLoading}
            />
        </section>
    )
}
