'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
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
    if (ctx === undefined) {
        throw new Error('useAuth must be used within <AuthProvider>');
    }
    return ctx;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const login = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setIsLoggedIn(true);
        router.push('/');
    };

    const logout = async () => {
        try {
            await auth_logout();
        } catch (error: any) {
            console.error('Logout failed:', error.message);
        } finally {
            localStorage.removeItem('token');
            setToken(null);
            setIsLoggedIn(false);
            setIsAdmin(false);
            router.push('/');
        }
    };

    useEffect(() => {
        const stored = localStorage.getItem('token');
        if (!stored) {
            setLoading(false);
            return;
        }
        setToken(stored);
        setIsLoggedIn(true);

        const checkAuthority = async () => {
            try {
                const authority = await auth_check();
                setIsAdmin(authority === 'ADMIN');
            } catch (err: unknown) {
                const msg =
                    err instanceof Error && err.message
                        ? err.message
                        : 'Unknown error during admin check';
                console.error('Failed to verify admin status:', msg);

                if (msg.includes('Token expired or invalid')) {
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};