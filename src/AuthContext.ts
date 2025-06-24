import { createContext, useContext } from 'react'

interface  AuthData {
    user: string | null;
    token: string | null;
    login: (credentials: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthData>(null!)

export const useAuth = () => useContext(AuthContext)