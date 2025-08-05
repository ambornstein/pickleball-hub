"use client"

import { createContext, useContext } from "react";

interface User {
    username: string,
    email: string
}

interface ProviderProps {
    user: User | null,
    token: string,
    login(email: string, password: string): void,
    logout(): void
}

const UserContext = createContext<ProviderProps>(
    {
        user: null,
        token: '',
        login: () => {},
        logout: () => {}
    }
);

export function UserProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const login = () => {

    }
    const logout = () => {

    }

    return <UserContext.Provider value={{user, token, login, logout}}>{children}</UserContext.Provider>
}

export default UserProvider;

export const useAuth = () => useContext(UserContext);