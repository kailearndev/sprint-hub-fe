"use client"

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"
import { GlobeIcon } from "lucide-react"
import type { ReactNode } from "react"
import { InputGroupAddon } from "../ui/input-group"

export interface FilterOption<TValue extends string = string> {
    value: TValue
    label: string
}

interface FilterProps<TOption extends FilterOption> {
    options: readonly TOption[]
    onValueChange?: (value: TOption | null) => void
    placeholder?: string
    icon?: ReactNode
}

export function Filter<TOption extends FilterOption>({
    options,
    onValueChange,
    placeholder,
    icon,
}: FilterProps<TOption>) {
    return (
        <Combobox<TOption>
            items={options}
            onValueChange={(option) => onValueChange?.(option)}
            itemToStringLabel={(option) => option.label}
            itemToStringValue={(option) => option.value}
        >
            <ComboboxInput placeholder={placeholder || "Select an option"} showClear className={"rounded-xl bg-white border-primary"} >
                <InputGroupAddon>
                    {icon || <GlobeIcon />}
                </InputGroupAddon>
            </ComboboxInput>
            <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList<TOption>>
                    {(option) => (
                        <ComboboxItem key={option.value} value={option}>
                            {option.label}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}
