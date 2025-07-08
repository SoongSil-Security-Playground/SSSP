'use client';

import React,
{
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
    ReactNode,
} from "react";
import { toast } from "react-toastify";
import { auth_logout, auth_check } from "../hooks/api/useAuth";
import { useRouter } from "next/navigation";

export interface AuthContextType {
    isLoggedIn: boolean;
    isAdmin: boolean;
    login: (token: string) => Promise<void>;
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
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const login = useCallback(async (newToken: string) => {
        try {
            localStorage.setItem('token', newToken);
            setIsLoggedIn(true);
            const authority = await auth_check();
            setIsAdmin(authority === 'ADMIN');
            router.replace('/');
        } catch (err: any) {
            const msg = err instanceof Error
                ? err.message
                : err.detail || 'Login error';
            toast.error(msg);
        }
    }, [router]);

    const logout = useCallback(async () => {
        try {
            await auth_logout();
        } catch (err: any) {
            const msg = err instanceof Error
                ? err.message
                : err.detail || 'Logout failed';
            toast.error(msg);
        } finally {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            setIsAdmin(false);
            router.replace('/');
            toast.success('Logged out successfully!');
        }
    }, [router]);

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
                const msg = err instanceof Error
                    ? err.message
                    : JSON.stringify(err) || 'Unknown admin-check error';
                toast.error(msg);
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
    }, [logout]);

    const value = useMemo(() => ({ isLoggedIn, isAdmin, login, logout }), [isLoggedIn, isAdmin, login, logout]);

    if (loading) return <div>Loading...</div>;

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
