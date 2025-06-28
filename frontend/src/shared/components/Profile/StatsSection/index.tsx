'use client';

import React, { type FC } from 'react';
import { useQueries } from '@tanstack/react-query';
import { challenge_get_user_solved } from '@/shared/hooks/api/useChallenge';
import { get_score, get_my_score } from '@/shared/hooks/api/useScoring';
import styles from './index.module.css'
import { Medal, Trophy, Crown } from 'lucide-react';

const iconMap: Record<string, React.FC<any>> = {
  Rank: Crown,
  Score: Trophy,
  Solved: Medal,
};

type Stat = { label: string; value: string | number };

export const StatsSection: FC = () => {
  const [solvedQ, allScoresQ, myScoreQ] = useQueries({
    queries: [
      { queryKey: ['solvedList'], queryFn: challenge_get_user_solved },
      { queryKey: ['allScores'], queryFn: get_score },
      { queryKey: ['myScore'], queryFn: get_my_score },
    ],
  });

  if (solvedQ.isLoading || allScoresQ.isLoading || myScoreQ.isLoading)
    return <div>Loading stats…</div>;
  if (solvedQ.isError || allScoresQ.isError || myScoreQ.isError)
    return <div>Error loading stats</div>;

  const solvedList = solvedQ.data!;
  const allScores = allScoresQ.data!;
  const myScore = myScoreQ.data!;
  const solvedCount = solvedList.length;
  const sortedScores = [...allScores].sort((a, b) => b.total_score - a.total_score);
  const myRankIdx = sortedScores.findIndex(s => s.username === myScore.username);
  const rankLabel = myRankIdx >= 0 ? `#${myRankIdx + 1}` : '-';

  const stats: Stat[] = [
    { label: 'Rank', value: rankLabel },
    { label: 'Score', value: myScore.total_score },
    { label: 'Solved', value: solvedCount },
  ];

  return (
    <section className={styles.grid}>
      {stats.map(({ label, value }) => {
        const Icon = iconMap[label];
        return (
          <div key={label} className={styles.card}>
            {Icon && <Icon size={24} className={styles.icon} />}
            <span className={styles.value}>{value}</span>
            <span className={styles.label}>{label}</span>
          </div>
        );
      })}
    </section>
  );
}