"use client";

import React, {
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
import { Loading } from "../components/Loading";
import { useRouter } from "next/navigation";

export interface AuthContextType {
    isLoggedIn: boolean;
    isAdmin: boolean;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps { children: ReactNode; }

export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
    return ctx;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // AuthProvider.tsx (핵심 부분만)
    const login = useCallback(async (newToken: string) => {
        try {
            setIsLoading(true);
            localStorage.setItem("token", newToken);
            setIsLoggedIn(true);
            const authority = await auth_check();
            setIsAdmin(authority === "ADMIN");

            toast.success("로그인 성공!");
            await new Promise(r => setTimeout(r, 0)); // 다음 이벤트 루프
            router.replace("/");
        } catch (err: any) {
            const msg = err instanceof Error ? err.message : err?.detail || "Login error";
            toast.error(`로그인 실패: ${msg}`);
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    const logout = useCallback(async () => {
        try {
            setIsLoading(true);
            await auth_logout();
            toast.success("로그아웃 되었습니다.");
            await new Promise(r => setTimeout(r, 0));
            router.replace("/");
        } catch (err: any) {
            const msg = err instanceof Error ? err.message : err?.detail || "Logout failed";
            toast.error(`로그아웃 실패: ${msg}`);
        } finally {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            setIsAdmin(false);
            setIsLoading(false);
        }
    }, [router]);


    useEffect(() => {
        const stored = localStorage.getItem("token");
        if (!stored) { setIsLoading(false); return; }

        setIsLoggedIn(true);

        const checkAuthority = async () => {
            try {
                setIsLoading(true);
                const authority = await auth_check();
                setIsAdmin(authority === "ADMIN");
            } catch (err: any) {
                const msg = err instanceof Error ? err.message : JSON.stringify(err) || "Unknown admin-check error";
                toast.error(msg);
                if (msg.includes("expired") || msg.includes("invalid")) {
                    await logout();
                    return;
                }
                setIsAdmin(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthority();
    }, [logout]);

    const value = useMemo(() => ({ isLoggedIn, isAdmin, login, logout }),
        [isLoggedIn, isAdmin, login, logout]);

    return isLoading
        ? <Loading />
        : <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

type AuthMode = "login" | "signup";

type AuthUI = {
    isAuthOpen: boolean;
    authMode: AuthMode;
    openLogin: () => void;
    openSignup: () => void;
    closeAuth: () => void;
};

const AuthUIContext = createContext<AuthUI | null>(null);

export const useAuthUI = () => {
    const ctx = useContext(AuthUIContext);
    if (!ctx) throw new Error("useAuthUI must be used within <AuthUIProvider>");
    return ctx;
};

export const AuthUIProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthOpen, setAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState<AuthMode>("login");

    const openLogin = useCallback(() => { setAuthMode("login"); setAuthOpen(true); }, []);
    const openSignup = useCallback(() => { setAuthMode("signup"); setAuthOpen(true); }, []);
    const closeAuth = useCallback(() => setAuthOpen(false), []);

    const value = useMemo(() => ({
        isAuthOpen, authMode, openLogin, openSignup, closeAuth
    }), [isAuthOpen, authMode, openLogin, openSignup, closeAuth]);

    return <AuthUIContext.Provider value={value}>{children}</AuthUIContext.Provider>;
};

export const AuthRootProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <AuthUIProvider>
                {children}
            </AuthUIProvider>
        </AuthProvider>
    );
};
