'use client';

import React, { type FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { challenge_get_user_solved } from '@/shared/hooks/api/useChallenge';
import { GetUserSolvedChallengeSuccess } from '@/shared/types/forAPI/ChallengeType';
import { icons } from '../../FilterPanel/CategoryFilter';
import { StarRating } from '../../Rating';
import styles from './index.module.css';

export const RecentSection: FC = () => {
  const { data=[], isLoading, isError, error } = useQuery<GetUserSolvedChallengeSuccess, Error>({
    queryKey: ['userSolvedChallenges'],
    queryFn: challenge_get_user_solved,
  });

  if (isLoading) return <div>Loading recents…</div>;
  if (isError) return <div>Error loading recents</div>;

  const activities = Array.isArray(data) ? data : [];

  return (
    <section className={styles.recentSection}>
      <h3 className={styles.recentTitle}>Recent Activity</h3>
      { activities.length === 0 ? (
        <p className={styles.noActivity}>No recent activity</p>
      ) : (
        <ul className={styles.activityList}>
          {data.map((act, idx) => {
            const Icon =
              icons[act.category.toLowerCase() as keyof typeof icons] ||
              icons.misc;

            return (
              <li key={idx} className={styles.activityItem}>
                <div className={styles.activityHeader}>
                  <Icon size={16} className={styles.categoryIcon} />
                  <span className={styles.activityName}>{act.name}</span>
                  <span className={styles.activityDate}>
                    {new Date(act.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className={styles.activityMeta}>
                  <StarRating rating={parseInt(act.level, 10)} />
                  <span className={styles.tag}>
                    {act.category.toUpperCase()}
                  </span>
                  <span className={styles.points}>{act.points} pts</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};