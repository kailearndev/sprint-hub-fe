import { Filter } from "@/components/common/Filter";
import { Input } from "@/components/ui/input";
import { RoleOptions, StatusOptions, type RoleOption, type StatusOption } from "@/types/master";
import { StatusIcon } from "@hugeicons/core-free-icons";
import { Citrus, Search, User } from "lucide-react";
import { useState } from "react";

interface UserSearchProps {
    onSearch?: (value: string) => void;
    onRoleFilterChange?: (value: RoleOption | null) => void;
    onStatusFilterChange?: (value: StatusOption | null) => void;
}

export default function UserSearch({ onSearch, onRoleFilterChange, onStatusFilterChange }: UserSearchProps) {
    const [value, setValue] = useState("");

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (onSearch) {
                onSearch(value);
            }
        }
    }
    return (
        <div className="flex  items-center border rounded-md  px-4 py-2 gap-4">
            <div className="relative ">
                <Input
                    id="form-rhf-demo-title"
                    placeholder="Search users..."
                    autoComplete="off"
                    className="rounded-md  px-8 h-8  w-full bg-white"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => handleSearch(e)}

                />
                <Search className="absolute  left-2 top-2 text-muted-foreground" size={16} />
            </div>
            <Filter options={RoleOptions} onValueChange={onRoleFilterChange} icon={<User />} />
            <Filter options={StatusOptions} onValueChange={onStatusFilterChange} icon={<Citrus />} />
        </div >
    )
}
