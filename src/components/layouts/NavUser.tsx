import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"
import { DoorOpen, HelpCircle, Settings } from "lucide-react"
import { Button } from "../ui/button"
import { useAuth } from "@/hooks/useAuth"

const sidebarLinks = [
    {
        name: 'Settings',
        href: '/settings',
        icon: <Settings />
    },
    {
        name: 'Help',
        href: '/help',
        icon: <HelpCircle />
    },


]

export default function NavUser({ isActive }: { isActive: (href: string) => boolean }) {
    const { logout } = useAuth()
    return (
        <div className="hidden md:flex gap-2  border-t flex-col border-gray-300 border-dashed pt-4">
            {sidebarLinks.map((item) => (

                <Link
                    tabIndex={0}
                    key={item.href}
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


            ))}
            <Button
                onClick={logout} className="group w-full h-10 bg-red-500 text-white font-semibold shadow-lg hover:shadow-red-500/30 transition-all hover:bg-red-600
            cursor-pointer
            ">
                <DoorOpen className="size-4 group-hover:scale-105 duration-100 transition-all" />
                <span className="hidden md:inline group-hover:translate-x-1 duration-100 transition-transform">Logout</span>
            </Button>
        </div>
    )
}
