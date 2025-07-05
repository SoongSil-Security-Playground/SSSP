// src/shared/components/Header/index.tsx
import React, { type FC } from "react";
import { Button } from "../Button";
import { ArrowRight } from "lucide-react";
import styles from "./index.module.css";

export type HeaderProps = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogoutClick: () => void;
};

export const Header: FC<HeaderProps> = ({
  isLoggedIn,
  isAdmin,
  onLoginClick,
  onSignupClick,
  onLogoutClick,
}) => {
  return (
    <header className={styles.headerContainer}>
      <a href="/" className={styles.logo}>
        SSSP
      </a>

      <nav className={styles.navList}>
        <a href="/users" className={styles.navItem}>
          USERS
        </a>
        <a href="/scoreboard" className={styles.navItem}>
          SCOREBOARD
        </a>
        <a href="/challenges" className={styles.navItem}>
          CHALLENGES
        </a>
        <a href="/notifications" className={styles.navItem}>
          NOTIFICATION
        </a>
        {isAdmin && (
          <a href="/setting" className={styles.navItem}>
            SETTING
          </a>
        )}
      </nav>

      <div className={styles.actions}>
        {isLoggedIn ? (
          <>
            <a href="/mypage" className={styles._navItem}>
              MY PAGE
            </a>
            <Button
              variant="primary"
              onClick={onLogoutClick}
              style={{ padding: "0.5rem 0.75rem" }}
              icon={<ArrowRight size={14} />}
              iconPosition="right"
            >
              LOGOUT
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="text"
              onClick={onSignupClick}
              className={styles.textButton}
              style={{ padding: "0.5rem 0.75rem", color: "white" }}
            >
              REGISTER
            </Button>
            <Button
              variant="primary"
              onClick={onLoginClick}
              style={{ padding: "0.5rem 0.75rem" }}
              icon={<ArrowRight size={14} />}
              iconPosition="right"
            >
              LOGIN
            </Button>
          </>
        )}
      </div>
    </header>
  );
};
