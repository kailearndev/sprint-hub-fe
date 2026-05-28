import { getSprintHubAPI } from "@/api/generated"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useUpdateUser } from "@/hooks/users/useUpdateUser"
import { useUserDetail } from "@/hooks/users/useUserDetail"
import { getApiErrorMessage } from "@/lib/get-api-error-message"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
type UserDetailProps = {
    userId: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
}
const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters.").max(100, "Name must be at most 100 characters."),
    avatarUrl: z.union([z.url("Invalid URL format."), z.literal("")]),
    role: z.enum(["SUPER_ADMIN", "USER"]),

})
type UserDetailFormValues = z.infer<typeof formSchema>

export function UserDetail({ userId, open, onOpenChange }: UserDetailProps) {
    const { users } = useUserDetail(userId)
    const updateUser = useUpdateUser()
    const form = useForm<UserDetailFormValues>({
        resolver: zodResolver(formSchema),

        values: {
            name: users?.data.name || "",

            avatarUrl: users?.data.avatarUrl || "",
            role: users?.data.role || "USER",
        }
    })

    const onSubmit = (data: UserDetailFormValues) => {
        updateUser.mutate(
            { id: userId, data },
            {
                onSuccess: () => {
                    toast.success("User updated successfully!");
                    if (onOpenChange) {
                        onOpenChange(false);
                    }
                },
                onError: (error) => {
                    toast.error(`Failed to update user: ${getApiErrorMessage(error)}`)
                },
            }
        )

    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogContent >
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re
                        done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <FieldGroup className="flex flex-col gap-2">
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your name"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="role"
                            disabled={users?.data.role === "SUPER_ADMIN"}
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Role
                                    </FieldLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="SUPER_ADMIN">SUPER_ADMIN</SelectItem>
                                                <SelectItem value="USER">USER</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />


                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" >Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>



        </Dialog >
    )
}
