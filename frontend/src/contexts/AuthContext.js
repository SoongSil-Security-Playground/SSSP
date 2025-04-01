import React, { createContext, useContext, useState, useEffect } from 'react';
import { logoutUser, checkAdmin } from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setIsLoggedIn(true);
    };

    const logout = async () => {
        try {
            const storedToken = localStorage.getItem('token');
            await logoutUser(storedToken);
        } catch (error) {
            console.error('Logout failed:', error.message);
        } finally {
            localStorage.removeItem('token');
            setToken(null);
            setIsLoggedIn(false);
            setIsAdmin(null);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setIsLoggedIn(true);

            (async () => {
                try {
                    const adminStatus = await checkAdmin(storedToken);
                    setIsAdmin(adminStatus);
                } catch (error) {
                    console.error('Failed to verify admin status:', error.message);
                    if (error.message === 'Token expired or invalid. Please login again.') {
                        logout();
                    }
                } finally {
                    setLoading(false);
                }
            })();
        } else {
            setLoading(false);
        }
    }, [isLoggedIn]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};