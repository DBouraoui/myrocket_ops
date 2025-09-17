import { useQuery } from "@tanstack/react-query"
import {usersCurrentUserUsersMeGet} from "@/api/users/users.ts";
import type {UserRead} from "@/api/generated.schemas.ts";
import {AppSidebar} from "@/components/app-sidebar.tsx";
import {SiteHeader} from "@/components/site-header.tsx";
import React from "react";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {User, Mail, Shield, CheckCircle, XCircle, Calendar, Settings, Lock} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import {UserUpdatePopin} from "@/components/user-update-popin.tsx";
import {UserUpdatePassword} from "@/components/user-update-password.tsx";

export default function UserProfile() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["currentUser"],
        queryFn: (): Promise<UserRead> => usersCurrentUserUsersMeGet().then(res => res.data),
    })

    if (isLoading) {
        return (
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }
            >
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse"></div>
                            <div className="space-y-2">
                                <div className="h-6 bg-gray-200 rounded animate-pulse w-48"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        )
    }

    if (error) {
        return (
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }
            >
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    <div className="flex flex-1 flex-col p-6">
                        <Card className="border-red-200">
                            <CardContent className="flex items-center space-x-2 p-6">
                                <XCircle className="h-5 w-5 text-red-500" />
                                <span className="text-red-700">Erreur: {(error as Error).message}</span>
                            </CardContent>
                        </Card>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        )
    }

    if (!data) {
        return (
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }
            >
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    <div className="flex flex-1 flex-col p-6">
                        <Card>
                            <CardContent className="flex items-center space-x-2 p-6">
                                <User className="h-5 w-5 text-gray-500" />
                                <span className="text-gray-700">Aucun utilisateur trouvé</span>
                            </CardContent>
                        </Card>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        )
    }

    // Génération des initiales pour l'avatar
    const getInitials = (email: string) => {
        return email.substring(0, 2).toUpperCase();
    }

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-6 p-6">
                        {/* Header avec avatar et informations principales */}
                        <div className="flex flex-col space-y-6">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-6">
                                    <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                                        <AvatarFallback className="text-xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                            {getInitials(data.name||"Anonymous")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-3">
                                            <h1 className="text-3xl font-bold text-gray-900">Profil utilisateur</h1>
                                            <div className="flex space-x-2">
                                                {data.is_superuser && (
                                                    <Badge variant="destructive" className="flex items-center space-x-1">
                                                        <Shield className="h-3 w-3" />
                                                        <span>Super Admin</span>
                                                    </Badge>
                                                )}
                                                {data.is_verified ? (
                                                    <Badge variant="default" className="flex items-center space-x-1 bg-green-500">
                                                        <CheckCircle className="h-3 w-3" />
                                                        <span>Vérifié</span>
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary" className="flex items-center space-x-1">
                                                        <XCircle className="h-3 w-3" />
                                                        <span>Non vérifié</span>
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 flex items-center space-x-2">
                                            <Mail className="h-4 w-4" />
                                            <span>{data.email}</span>
                                        </p>
                                    </div>
                                </div>
                                <Dialog>
                                    <DialogTrigger>
                                        <Button variant="outline" className="flex items-center space-x-2">
                                            <Settings className="h-4 w-4" />
                                            <span>Modifier le profil</span>
                                        </Button>
                                    </DialogTrigger>
                                    <UserUpdatePopin user={data} />
                                </Dialog>
                            </div>

                            <Separator />
                        </div>

                        {/* Grille des informations détaillées */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {/* Informations de base */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-center space-x-2">
                                        <User className="h-5 w-5" />
                                        <span>Informations générales</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-gray-500">ID utilisateur</span>
                                        <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{data.id}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-gray-500">Adresse email</span>
                                        <span className="text-sm">{data.email}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-gray-500">Pseudo</span>
                                        <span className="text-sm">{data.name}</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Statut du compte */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-center space-x-2">
                                        <CheckCircle className="h-5 w-5" />
                                        <span>Statut du compte</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-gray-500">Compte vérifié</span>
                                        <div className="flex items-center space-x-2">
                                            {data.is_verified ? (
                                                <>
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                    <span className="text-sm text-green-700 font-medium">Oui</span>
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle className="h-4 w-4 text-red-500" />
                                                    <span className="text-sm text-red-700 font-medium">Non</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-gray-500">Super utilisateur</span>
                                        <div className="flex items-center space-x-2">
                                            {data.is_superuser ? (
                                                <>
                                                    <Shield className="h-4 w-4 text-red-500" />
                                                    <span className="text-sm text-red-700 font-medium">Oui</span>
                                                </>
                                            ) : (
                                                <>
                                                    <User className="h-4 w-4 text-gray-500" />
                                                    <span className="text-sm text-gray-700 font-medium">Non</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Activité récente */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-center space-x-2">
                                        <Calendar className="h-5 w-5" />
                                        <span>Activité</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="text-sm text-gray-500">
                                        <p>Dernière connexion</p>
                                        <p className="text-gray-700 font-medium mt-1">Aujourd'hui à 14:32</p>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        <p>Compte créé</p>
                                        <p className="text-gray-700 font-medium mt-1">Il y a 3 mois</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Section d'actions rapides */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Actions rapides</CardTitle>
                                <CardDescription>
                                    Gérez votre compte et vos préférences
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-3">
                                <Dialog>
                                    <DialogTrigger>
                                        <Button variant="outline" size="sm">
                                            <Lock />
                                            Changer le mot de passe
                                        </Button>
                                    </DialogTrigger>
                                    <UserUpdatePassword  />
                                </Dialog>
                                <Button variant="outline" size="sm">
                                    Préférences de notification
                                </Button>
                                <Button variant="outline" size="sm">
                                    Historique des connexions
                                </Button>
                                {!data.is_verified && (
                                    <Button variant="default" size="sm">
                                        Vérifier mon compte
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}