import React from "react";
import { FilterPanel } from "@/shared/components/FilterPanel";
import { PageTitle } from "@/shared/components/Title";
import { ChallengeList } from "@/shared/components/List/ChallengeList";
import { ChallengeDetailModal } from "@/shared/components/Modal/ChallengeDetailModal";
import { FilterProvider } from "@/shared/components/FilterPanel/FilterContext";
import styles from "./page.module.css"

export default function ChallengesPage() {
  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <PageTitle text="CHALLENGES" />
      </div>
      <FilterProvider>
        <div className={styles.sidebarWrapper}>
          <FilterPanel />
        </div>
        <div className={styles.mainWrapper}>
          <ChallengeList />
        </div>
        <ChallengeDetailModal />
      </FilterProvider>
    </div>
  );
}
