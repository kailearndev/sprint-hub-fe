import { getSprintHubAPI } from "@/api/generated"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { getApiErrorMessage } from "@/lib/get-api-error-message"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@tanstack/react-router"
import { Eye, EyeClosed, MoveRight } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

const formSchema = z.object({
    email: z.email("Please enter a valid email address."),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters.")
        .max(100, "Password must be at most 100 characters."),
})
export default function LoginForm() {
    const navigate = useNavigate()
    const { authControllerLogin } = getSprintHubAPI()
    const [isShowingPassword, setIsShowingPassword] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "example@example.com",
            password: "password123",
        },
    })


    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            await authControllerLogin(data)
            toast.success('Login successful')
            navigate({ to: '/' })
        } catch (error) {
            toast.error(getApiErrorMessage(error))
        }
    }
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Sign in to your account</h2>

            <p className="text-sm text-text-muted">
                Enter your credentials to access your dashboard.
            </p>

            <form id="form-login" onSubmit={form.handleSubmit(onSubmit)} >
                <FieldGroup className="flex flex-col gap-2">
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-title">
                                    Email
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-title"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Login button not working on mobile"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-password">
                                    Password
                                </FieldLabel>

                                <div className="relative">
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-description"
                                        placeholder={isShowingPassword ? "password123" : "••••••••"}
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="off"
                                        type={isShowingPassword ? "text" : "password"}
                                    />
                                    {isShowingPassword ? (
                                        <EyeClosed
                                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-text-muted"
                                            onClick={() => setIsShowingPassword(false)}
                                        />
                                    ) : (
                                        <Eye
                                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-text-muted"
                                            onClick={() => setIsShowingPassword(true)}
                                        />
                                    )}
                                </div>


                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>

                {form.formState.errors.root && (
                    <FieldError
                        className="mt-3"
                        errors={[form.formState.errors.root]}
                    />
                )}
            </form>

            <Button
                type="submit"
                form="form-login"
                disabled={form.formState.isSubmitting}
                className="w-full h-12 bg-primary font-semibold group shadow-lg hover:shadow-primary/30 transition-all"
            >
                {form.formState.isSubmitting ? "Signing In..." : "Sign In"}
                <MoveRight className="ml-2 group-hover:translate-x-1 transition-transform duration-150" />
            </Button>
        </div>
    )
}
