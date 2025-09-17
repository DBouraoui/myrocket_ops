import type {UserUpdate} from "@/api/generated.schemas"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import {usersPatchCurrentUserUsersMePatch} from "@/api/users/users.ts"

const schema = z
    .object({
        email: z.string().email("Email invalide").optional(),
        name: z.string().min(2, "Nom trop court").optional(),
    })

export type UserUpdateForm = z.infer<typeof schema>

export const UserUpdatePopin = ({user}: { user: UserUpdate }) => {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<UserUpdateForm>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: user.email ?? "",
            name: user.name ?? "",
        },
    })
    const queryClient = useQueryClient()

    const updateMutation = useMutation({
        mutationFn: (data: UserUpdate) =>
            usersPatchCurrentUserUsersMePatch(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["currentUser"]})
        },
        onError: (err) => {
            console.error("❌ Update failed:", err)
        },
    })

    const onSubmit = async (values: UserUpdateForm) => {
        const payload: UserUpdate = Object.fromEntries(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            Object.entries(values).filter(([_, v]) => v !== "" && v !== undefined)
        ) as UserUpdate

        console.log("Update user with:", payload)
        updateMutation.mutate(payload)
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Mettre à jour ton profil</DialogTitle>
                <DialogDescription>
                    Modifie ton email, nom ou mot de passe ci-dessous.
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Input type="email" placeholder="Email" {...register("email")} />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <Input type="text" placeholder="Nom" {...register("name")} />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                </div>

                <DialogFooter>
                    <Button type="submit" disabled={isSubmitting || updateMutation.isPending}>
                        Sauvegarder
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}
