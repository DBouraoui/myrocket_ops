import type { UserUpdate } from "@/api/generated.schemas"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { usersPatchCurrentUserUsersMePatch } from "@/api/users/users.ts"
import { Eye, EyeOff } from "lucide-react" // shadcn compatible

// -------------------------
//  Validation Schema
// -------------------------
const schema = z
    .object({
        password: z.string().optional(),
        passwordConfirmed: z.string().optional(),
    })
    .refine(
        (data) => !data.password || data.password.length >= 6,
        { message: "Mot de passe trop court", path: ["password"] }
    )
    .refine(
        (data) => !data.password || data.password === data.passwordConfirmed,
        { message: "Les mots de passe ne correspondent pas", path: ["passwordConfirmed"] }
    )

export type UserUpdatePasswordForm = z.infer<typeof schema>

// -------------------------
//  Component
// -------------------------
export const UserUpdatePassword = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<UserUpdatePasswordForm>({
        resolver: zodResolver(schema),
        defaultValues: {
            password: "",
            passwordConfirmed: "",
        },
    })

    const passwordValue = watch("password")

    const updateMutation = useMutation({
        mutationFn: (data: UserUpdate) => usersPatchCurrentUserUsersMePatch(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["currentUser"] })
            alert("Mot de passe mis à jour avec succès ✅")
        },
        onError: () => {
            alert("Erreur lors de la mise à jour ❌")
        },
    })

    const onSubmit = (values: UserUpdatePasswordForm) => {
        const payload: UserUpdate = Object.fromEntries(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            Object.entries(values).filter(([_, v]) => v !== "" && v !== undefined)
        ) as UserUpdate

        updateMutation.mutate(payload)
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Mettre à jour ton mot de passe</DialogTitle>
                <DialogDescription>
                    Modifie ton mot de passe ci-dessous. Laissez vide si vous ne voulez pas
                    le changer.
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Mot de passe"
                        {...register("password")}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>

                <div className="relative">
                    <Input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirmation du mot de passe"
                        {...register("passwordConfirmed")}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {errors.passwordConfirmed && (
                        <p className="text-red-500 text-sm">{errors.passwordConfirmed.message}</p>
                    )}
                </div>

                <DialogFooter>
                    <Button
                        type="submit"
                        disabled={
                            isSubmitting ||
                            updateMutation.isPending ||
                            !passwordValue // disable si champ vide
                        }
                    >
                        Sauvegarder
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}
