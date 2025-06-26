'use client';

import React, { useState, useEffect } from "react";
import { PageTitle } from "@/shared/components/Title";
import { RankList } from "@/shared/components/List/RankList";
import { get_score } from "@/shared/hooks/api/useScoring";
import type { GetScoreListSuccess } from "@/shared/types/forAPI/ScoringType";
import styles from './page.module.css';

export default function ScoreBoardPage() {
  const [items, setItems] = useState<GetScoreListSuccess>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get_score()
      .then((data) => setItems(data))
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (error)   return <div className={styles.container}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <PageTitle text="SCOREBOARD" />
      <div className={styles.contentWrapper}>
        <RankList items={items} />
      </div>
    </div>
  );
}
