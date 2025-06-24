'use client';

import React, { useState, type ReactNode, type FC } from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Drawer } from '../Drawer';
import { Button } from '../Button';
import { LoginForm } from '../Form/LoginForm';
import { SignupForm } from '../Form/SignupForm';
import styles from './index.module.css'

interface LayoutProps {
    children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAuthOpen, setAuthOpen] = useState(false);

    const openLogin = () => {
        setAuthMode('login');
        setAuthOpen(true);
    };

    const openSignup = () => {
        setAuthMode('signup');
        setAuthOpen(true);
    };

    const closeAuth = () => {
        setAuthOpen(false);
    };

    const handleLogout = () => {
        // TODO: 실제 로그아웃 로직
        setIsLoggedIn(false);
    };

    const handleLoginSuccess = () => {
        // TODO: 실제 로그인 성공 처리
        setIsLoggedIn(true);
        closeAuth();
    };

    const handleSignupSuccess = () => {
        // TODO: 실제 회원가입 성공 처리
        setAuthMode('login');
    };

    return (
        <div className={styles.layoutContainer}>
            <Header
                isLoggedIn={isLoggedIn}
                onLoginClick={openLogin}
                onSignupClick={openSignup}
                onLogoutClick={handleLogout}
            />
            <main className={styles.mainContent}>{children}</main>
            <Drawer isOpen={isAuthOpen} onClose={closeAuth}>
                <h2 className={styles.authTitle}>
                    {authMode === 'login' ? '로그인' : '회원가입'}
                </h2>

                {authMode === 'login' ? (
                    <>
                        <LoginForm onSuccess={handleLoginSuccess} />
                        <p className={styles.authPrompt}>
                            아직 계정이 없으신가요?{' '}
                            <Button
                                type="button"
                                onClick={openSignup}
                                variant="text"
                                className={styles.button}
                            >
                                회원가입
                            </Button>
                        </p>
                    </>
                ) : (
                    <>
                        <SignupForm onSuccess={handleSignupSuccess} />
                        <p className={styles.authPrompt}>
                            이미 계정이 있으신가요?{' '}
                            <Button
                                type="button"
                                onClick={openLogin}
                                variant="text"
                                className={styles.button}
                            >
                                로그인
                            </Button>
                        </p>
                    </>
                )}
            </Drawer>
            <Footer />
        </div>
    );
};