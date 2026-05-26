import { cn } from "@heroui/styles"
import { Link, useMatchRoute } from "@tanstack/react-router"
import { Calendar, LayoutGrid, Logs, SquareKanban } from "lucide-react"

const menuItems = [
    { name: 'Dashboard', href: '/dashboard', id: 1, icon: <LayoutGrid /> },
    { name: 'Tasks', href: '/tasks', id: 2, icon: <Logs /> },
    {
        name: 'Kanban', href: '/kanban', id: 3, icon: <SquareKanban />
    },
    { name: 'Calendar', href: '/calendar', id: 4, icon: <Calendar /> },
    {
        name: 'Report ', href: '/report', id: 5, icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
        </svg>
    }


] as const

export default function Layout({ children }: { children: React.ReactNode }) {
    const matchRoute = useMatchRoute()

    const isActive = (href: string) => {
        const match = matchRoute({
            to: href,
        })
        return !!match
    }
    return (
        <div className="flex ">
            <nav className="w-64 h-screen bg-neutral-50 text-black p-4">
                <h1 className="text-2xl font-bold mb-4">My App</h1>
                <ul >
                    {menuItems.map((item) => (
                        <li className="mb-2" key={item.id}>
                            <Link
                                tabIndex={0}
                                to={item.href}
                                className={cn(
                                    "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
                                    "transition-all duration-200 ease-out",
                                    "hover:bg-primary-soft/60 hover:text-primary",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                                    isActive(item.href)
                                        ? "bg-primary-soft text-primary shadow-sm"
                                        : "text-text-muted"
                                )}
                            >
                                {isActive(item.href) && (
                                    <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                                )}

                                <span
                                    className={cn(
                                        "grid size-8 place-items-center rounded-lg transition-all duration-200",
                                        "group-hover:bg-primary/10 group-hover:scale-105",
                                        isActive(item.href) && "bg-primary text-white"
                                    )}
                                >
                                    {item.icon}
                                </span>

                                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                                    {item.name}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <main className="flex-1 p-4">
                {children}
            </main>
        </div>
    )
}