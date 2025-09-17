"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authJwtLoginAuthJwtLoginPost } from "../api/auth/auth.ts";
import type { BodyAuthJwtLoginAuthJwtLoginPost } from "../api/generated.schemas.ts";
import { ArrowRight, Eye, EyeOff, Rocket } from "lucide-react";
import {useNavigate} from "react-router";

export function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    let naviate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: (payload: BodyAuthJwtLoginAuthJwtLoginPost) =>
            authJwtLoginAuthJwtLoginPost(payload),
        onSuccess: (res) => {
            // @ts-ignore
            localStorage.setItem("access_token", res.data.access_token);
            setIsLoading(false);
            naviate("/dashboard");
        },
        onError: (err: any) => {
            console.error(err.response?.data || "Login error");
        },
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        loginMutation.mutate({
            username,
            password,
            grant_type: "password",
        });

    };

    return (
        <form
            className="flex-1 flex items-center justify-center p-6 lg:p-12"
            onSubmit={handleLogin}
        >
            <div className="w-full max-w-sm">
                <div className="text-center mb-8 lg:hidden">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-900 rounded-lg mb-4">
                        <Rocket className="h-6 w-6 text-white" />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="text-center">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                            Connexion
                        </h3>
                        <p className="text-gray-600">Accédez à votre espace MyRocket-OPS</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                placeholder="votre.email@entreprise.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent pr-10"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                            </label>
                               <p className="text-sm text-gray-800"> Mot de passe oublié ?</p>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gray-900 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Se connecter</span>
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>

                        {loginMutation.isError && (
                            <p className="text-red-600 mt-2">
                                {(loginMutation.error as any)?.response?.data?.detail || "Login error"}
                            </p>
                        )}
                    </div>

                    <div className="text-center pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                            Besoin d'aide ? Contactez l'équipe IT
                        </p>
                    </div>
                </div>
            </div>
        </form>
    );
}
