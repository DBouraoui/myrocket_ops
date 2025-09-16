import { Rocket} from "lucide-react";
import {LoginForm} from "../components/LoginForm.tsx";

export function AnonymousPage() {

            return (
            <div className="min-h-screen bg-white flex flex-col">
                {/* Header */}
                <header className="border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center space-x-3">
                        <Rocket className="h-7 w-7 text-gray-900" />
                        <h1 className="text-xl font-semibold text-gray-900">MyRocket-OPS</h1>
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded border">
                    Interne
                  </span>
                    </div>
                </header>

                {/* Contenu principal */}
                <div className="flex-1 flex">
                    {/* Section gauche */}
                    <div className="hidden lg:flex lg:w-1/2 bg-gray-900 items-center justify-center p-12">
                        <div className="max-w-md text-center space-y-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-lg mb-6">
                                <Rocket className="h-8 w-8 text-gray-900" />
                            </div>
                            <h2 className="text-3xl font-bold text-white">
                                Plateforme DevOps
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Automatisez vos déploiements et gérez votre infrastructure avec MyRocket-OPS.
                            </p>
                        </div>
                    </div>

                    {/* Section droite - Formulaire */}
                    <LoginForm />
                </div>

                {/* Footer */}
                <footer className="border-t border-gray-200 px-6 py-4 text-center">
                    <p className="text-sm text-gray-500">
                        © 2025 MyRocket-OPS - Plateforme DevOps Interne
                    </p>
                </footer>
            </div>
    )
}