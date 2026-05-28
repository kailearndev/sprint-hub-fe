import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useLocation } from '@tanstack/react-router';

export function Search({ value, onChange }: { value: string, onChange: (value: string) => void }) {
    const location = useLocation();
    return (
        <section className="w-full border-b p-2 flex justify-between">
            <Field orientation="horizontal" className="w-full max-w-sm ">
                <Input
                    type="search"
                    placeholder={`Search something ${location.pathname.split('/').pop()?.toUpperCase()}`}
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                />
                <Button>Search</Button>
            </Field>
        </section>
    )
}
