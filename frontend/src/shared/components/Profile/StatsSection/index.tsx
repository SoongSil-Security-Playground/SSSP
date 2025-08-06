'use client';

import React, { type FC } from 'react';
import { useQueries } from '@tanstack/react-query';
// import { challenge_get_user_solved } from '@/shared/hooks/api/useChallenge';
import { fetch_my_submissions } from '@/shared/hooks/api/useSubmission';
import { get_score, get_my_score } from '@/shared/hooks/api/useScoring';
import styles from './index.module.css'
import { Medal, Trophy, Crown } from 'lucide-react';
import { toast } from 'react-toastify';

const iconMap: Record<string, React.FC<any>> = {
  Rank: Crown,
  Score: Trophy,
  Solved: Medal,
};

type Stat = { label: string; value: string | number };

export const StatsSection: FC = () => {
  const [submissionQ, allScoresQ, myScoreQ] = useQueries({
    queries: [
      { queryKey: ['submissionList'], queryFn: fetch_my_submissions },
      { queryKey: ['allScores'], queryFn: get_score },
      { queryKey: ['myScore'], queryFn: get_my_score },
    ],
  });

  if (submissionQ.isLoading || allScoresQ.isLoading || myScoreQ.isLoading)
    return <div>Loading stats…</div>;
  if (submissionQ.isError || allScoresQ.isError || myScoreQ.isError)
    return <div>Error loading stats</div>;

  const submissionList = submissionQ.data!;
  const allScores = allScoresQ.data!;
  const myScore = myScoreQ.data!;
  const solvedCount = Array.isArray(submissionList) ? submissionList.filter(sub => sub.status === 0).length : 0;
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