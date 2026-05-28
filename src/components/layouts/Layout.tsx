import { Link, useMatchRoute } from "@tanstack/react-router"
import { Banana, BarChart2, Calendar, LayoutGrid, Logs, SquareKanban, User } from "lucide-react"
import NavUser from "./NavUser"
import { cn } from "@/lib/utils"
import type { MenuItem, Role } from "@/types/sidebar.config"
import { useAuthStore } from "@/store/useAuthStore"
import { Search } from "./Search"

const menuItems: MenuItem[] = [
    {
        name: 'Home',
        href: '/',
        id: 1,
        icon: <LayoutGrid className="md:size-5 size-4" />,
        role: ['SUPER_ADMIN', 'USER'],
    },
    {
        name: 'Tasks',
        href: '/tasks',
        id: 2,
        icon: <Logs className="md:size-5 size-4" />,
        role: ['SUPER_ADMIN', 'USER'],
    },
    {
        name: 'Kanban',
        href: '/kanban',
        id: 3,
        icon: <SquareKanban className="md:size-5 size-4" />,
        role: ['SUPER_ADMIN', 'USER'],
    },
    {
        name: 'Calendar',
        href: '/calendar',
        id: 4,
        icon: <Calendar className="md:size-5 size-4" />,
        role: ['SUPER_ADMIN', 'USER'],
    },
    {
        name: 'Report',
        href: '/report',
        id: 5,
        icon: <BarChart2 className="md:size-5 size-4" />,
        role: ['SUPER_ADMIN', 'USER'],
    },
    {
        name: 'User',
        href: '/user',
        id: 6,
        icon: <User className="md:size-5 size-4" />,
        role: ['SUPER_ADMIN'],
    },
] as const
export default function Layout({ children }: { children: React.ReactNode }) {
    const { user } = useAuthStore()

    const matchRoute = useMatchRoute()

    const isActive = (href: string) => {
        const match = matchRoute({
            to: href,
        })
        return !!match
    }

    const visibleMenuItems = menuItems.filter((item) =>
        item.role.includes(user?.role as Role),
    )


    return (
        <div className="min-h-dvh bg-background text-text md:flex ">
            <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 px-2 py-2 shadow-lg backdrop-blur md:sticky md:top-0 md:h-dvh md:w-64 md:border-r md:border-t-0 md:p-4 md:shadow-none flex flex-col justify-between">
                <div>
                    <div className="hidden text-2xl font-bold mb-4 items-center gap-2 text-primary md:flex">
                        <Banana className="size-7" />
                        <span className="hidden md:inline">SprintHub</span>
                    </div>
                    <ul className="grid grid-cols-5 gap-1 md:block">
                        {visibleMenuItems.map((item) => (
                            <li className="md:mb-2" key={item.id}>
                                <Link
                                    tabIndex={0}
                                    to={item.href}
                                    className={cn(
                                        "group relative flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1.5 py-2 text-[11px] font-medium",
                                        "md:flex-row md:justify-start md:gap-3 md:px-3 md:py-2.5 md:text-sm",
                                        "transition-all duration-200 ease-out",
                                        "hover:bg-primary/10 md:hover:scale-105",
                                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                                        isActive(item.href)
                                            ? "bg-primary/10 text-primary shadow-sm md:rotate-1"
                                            : "text-text-muted"
                                    )}
                                >
                                    {isActive(item.href) && (
                                        <span className="hidden md:absolute md:left-0 md:top-1/2 md:block md:h-6 md:w-1 md:-translate-y-1/2 md:rounded-r-full md:bg-primary" />
                                    )}

                                    <span
                                        className={cn(
                                            "grid size-8 shrink-0 place-items-center rounded-lg transition-all duration-200",
                                            "group-hover:bg-primary/10 group-hover:scale-105",
                                            isActive(item.href) && "bg-primary text-white"
                                        )}
                                    >
                                        {item.icon}
                                    </span>
                                    <span
                                        className={cn(
                                            "w-full truncate text-center md:text-left",
                                            // isActive(item.href) && "md:flex-1 md:rounded-lg md:bg-primary md:px-2 md:py-1 md:text-white"
                                        )}
                                    >
                                        {item.name}
                                    </span>
                                </Link>

                            </li>

                        ))
                        }
                    </ul>
                </div>
                <NavUser isActive={isActive} />
            </nav>
            <main className="min-w-0 flex-1 p-4 pb-24 md:pb-4 bg-white flex flex-col gap-4 rounded-lg shadow">
                <Search value="" onChange={() => { }} />
                {children}
            </main>
        </div>
    )
}
