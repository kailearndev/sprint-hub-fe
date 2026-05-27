export type Role = 'SUPER_ADMIN' | 'USER'

export type MenuItem = {
    name: string
    href: string
    id: number
    icon: React.ReactNode
    role: Role[]
}

