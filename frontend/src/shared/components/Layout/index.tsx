"use client";

import React, { useState, type ReactNode, type FC, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Drawer } from "../Drawer";
import { Button } from "../Button";
import { LoginForm } from "../Form/LoginForm";
import { SignupForm } from "../Form/SignupForm";
import { useAuth } from "@/shared/utils/AuthProvider";
import { useRouter } from "next/navigation";
import styles from "./index.module.css";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { isLoggedIn, isAdmin, login, logout } = useAuth();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [isAuthOpen, setAuthOpen] = useState(false);
  const router = useRouter();

  const openLogin = () => {
    setAuthMode("login");
    setAuthOpen(true);
  };
  const openSignup = () => {
    setAuthMode("signup");
    setAuthOpen(true);
  };
  const closeAuth = () => setAuthOpen(false);

  const handleLogout = async () => {
    await logout();
    closeAuth();
  };

  const handleLoginSuccess = (token: string) => {
    login(token);
    closeAuth();
  };

  const handleSignupSuccess = () => {
    setAuthMode("login");
  };

  useEffect(() => {
    if (!isLoggedIn) router.replace("/");
  }, [isLoggedIn]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      <Header
        isLoggedIn={isLoggedIn}
        isAdmin={!!isAdmin}
        onLoginClick={openLogin}
        onSignupClick={openSignup}
        onLogoutClick={handleLogout}
      />
      <div className={styles.layoutContainer}>
        <main className={styles.mainContent}>{children}</main>
        <Drawer isOpen={isAuthOpen} onClose={closeAuth}>
          <h2 className={styles.authTitle}>
            {authMode === "login" ? "로그인" : "회원가입"}
          </h2>

          {authMode === "login" ? (
            <>
              <LoginForm onSuccess={handleLoginSuccess} />
              <p className={styles.authPrompt}>
                아직 계정이 없으신가요?{" "}
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
                이미 계정이 있으신가요?{" "}
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
      </div>
      <Footer />
    </>
  );
};
