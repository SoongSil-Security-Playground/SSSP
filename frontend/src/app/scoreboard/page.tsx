import React from "react";
import { PageTitle } from "@/shared/components/Title";
import { RankList } from "@/shared/components/List/RankList";
import styles from './page.module.css';

export default function ScoreBoardPage() {
  return (
    <div className={styles.container}>
      <PageTitle text="SCOREBOARD" />
      <div className={styles.contentWrapper}>
        <RankList />
      </div>
    </div>
  );
}
