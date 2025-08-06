import React from "react";
import { PageTitle } from "@/shared/components/Title";
import { ProfileSection } from "@/shared/components/Profile/ProfileSection";
import { RecentSection } from "@/shared/components/Profile/RecentSection";
import { StatsSection } from "@/shared/components/Profile/StatsSection";
import styles from "./page.module.css"

export default function MyPage() {
  return (
    <div className={styles.mainContainer}
    >
      <PageTitle text="My Page" />
      <div className={styles.contentWrapper}>
        <aside className={styles.sidebar}>
          <ProfileSection />
        </aside>

        <main className={styles.mainContent}>
          <StatsSection />
          <RecentSection />
        </main>
      </div>
    </div>
  );
};