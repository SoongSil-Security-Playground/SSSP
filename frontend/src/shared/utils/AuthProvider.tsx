'use client';

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { toast } from "react-toastify";
import { auth_logout, auth_check } from "../hooks/api/useAuth";
import { useRouter } from "next/navigation";

export interface AuthContextType {
    isLoggedIn: boolean;
    isAdmin: boolean | null;
    login: (token: string) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
    return ctx;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const login = (newToken: string) => {
        try {
            localStorage.setItem('token', newToken);
            setIsLoggedIn(true);
            router.push('/');
        } catch (err: any) {
            toast.error(`Login error: ${err.detail}`)
        }
    };

    const logout = async () => {
        try {
            await auth_logout();
        } catch (err: any) {
            toast.error(`Logout failed: ${err.detail}`);
        } finally {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            setIsAdmin(false);
            router.push('/');
            toast.success(`Logedout in successfully!`);
        }
    };

    useEffect(() => {
        const stored = localStorage.getItem('token');
        if (!stored) {
            setLoading(false);
            return;
        }

        setIsLoggedIn(true);

        const checkAuthority = async () => {
            try {
                const authority = await auth_check();
                setIsAdmin(authority === 'ADMIN');
            } catch (err: any) {
                const msg =
                    err instanceof Error
                        ? err.message
                        : JSON.stringify(err) || 'Unknown admin-check error';
                toast.error(err);
                if (msg.includes('expired') || msg.includes('invalid')) {
                    await logout();
                    return;
                }
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuthority();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, isAdmin, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
