"use client"

import { hash } from "@/lib/security"
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { useSnackbar } from "./SnackbarContext";

interface User {
    username: string,
    email: string
}

interface ProviderProps {
    user?: User,
    token?: string,
    login(email: string, password: string): void,
    logout(): void
}

const AuthContext = createContext<ProviderProps>(
    {
        user: undefined,
        token: '',
        login: async (email: string, password: string) => { },
        logout: async () => { }
    }
);

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [user, setUser] = useState<User>()
    const [token, setToken] = useState<string>()

    const { pingNotification } = useSnackbar();
    const router = useRouter();

    const login = async (email: string, password: string) => {
        const hashedPassword = await hash(password)

        const response = await fetch('api/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, hashedPassword })
        })

        if (response.ok) {
            const result = await response.json();

            setUser({ username: result.name, email: result.email })
            setToken(result.token)
            localStorage.setItem("token", result.token)
            pingNotification("Logged in, welcome " + result.name)
            router.push("/")
            
            return
        }

        throw new Error(await response.text())
    }
    const logout = () => {
        setUser(undefined);
        setToken("")
        localStorage.removeItem("token")
    }

    return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);