import type { UsersControllerFindAllRole, UsersControllerFindAllStatus } from "@/api/generated";
import { DataTable } from "@/components/common/DataTable";
import { useUserList } from "@/hooks/users/useUserList";
import type { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "./components/UserColumns";
import { UserDetail } from "./components/UserDetail";
import UserSearch from "./components/UserSearch";
import { useUserBan } from "@/hooks/users/useUserBan";
import { toast } from "sonner";

export default function User() {
    const bannerUser = useUserBan()
    const [isOpenModal, setIsOpenModal] = useState({
        id: "",
        open: false,
    });
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
        pageSize: 5,
    })
    const { users, isLoading } = useUserList({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: searchTerm,
        role: filters.role,
        status: filters.status,
    })
    const handleOpenModal = (userId: string) => {
        setIsOpenModal({
            id: userId,
            open: true,
        });

    }

    const handleBanUser = async (userId: string) => {
        bannerUser.mutate(
            { id: userId },
            {
                onSuccess: () => {
                    toast.success("User banned successfully!");
                },
                onError: (error) => {
                    toast.error(`Failed to ban user: ${error.message}`)
                },
            }
        )
        // Implement ban user logic here
    }
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
                columns={columns({
                    onViewUser: (userId) => handleOpenModal(userId),
                    onBanUser: (userId) => {
                        handleBanUser(userId);
                    }
                })}
                data={users?.data || []}
                pageCount={users?.meta.totalPages || 0}
                pagination={pagination}
                onPaginationChange={setPagination}
                loading={isLoading}
            />
            <UserDetail userId={isOpenModal.id} open={isOpenModal.open} onOpenChange={(open) => setIsOpenModal({ ...isOpenModal, open })} />
        </section>
    )
}
