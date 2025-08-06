'use client';

import React, { type FC } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
// import { challenge_get_user_solved } from '@/shared/hooks/api/useChallenge';
import { GetUserSolvedChallengeSuccess } from '@/shared/types/forAPI/ChallengeType';
import { challenge_get_all } from '@/shared/hooks/api/useChallenge';
import { DefaultChallengeContent } from '@/shared/types/forAPI/ChallengeType';
import { fetch_my_submissions } from '@/shared/hooks/api/useSubmission';
import { SubmissionType } from '@/shared/types/forAPI/SubmissionType';
import { icons } from '../../FilterPanel/CategoryFilter';
import { StarRating } from '../../Rating';
import styles from './index.module.css';

export const RecentSection: FC = () => {
  const [challengesQ, submissionsQ] = useQueries({
    queries: [
      { queryKey: ['challenges'], queryFn: challenge_get_all },
      { queryKey: ['mySubmissions'], queryFn: fetch_my_submissions },
    ],
  });

  const isLoading = challengesQ.isLoading || submissionsQ.isLoading;
  const isError = challengesQ.isError || submissionsQ.isError;

  if (isLoading) return <div>Loading recents…</div>;
  if (isError) return <div>Error loading recents</div>;

  const challenges = challengesQ.data ?? [];
  const submissions = submissionsQ.data ?? [];

  // const recentActivities = //challenges에서는 challenge의 id와 name, category, level, points를, submissions에서는 challenge_id와 submit_time을 가져옴(단, status가 0인 경우만)
  const solvedSubmissions = Array.isArray(submissions)
    ? submissions.filter((sub: SubmissionType) => sub.status === 0)
    : [];

  // challenge_id로 challenge 정보 매칭
  const recentActivities = solvedSubmissions
    .map((sub: SubmissionType) => {
      const challenge = Array.isArray(challenges)
        ? challenges.find((ch: DefaultChallengeContent) => ch.id === sub.challenge_id)
        : null;
      if (!challenge) return null;
      return {
        id: challenge.id,
        name: challenge.name,
        category: challenge.category,
        level: challenge.level,
        points: challenge.points,
        submit_time: sub.submit_time,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .sort((a, b) => new Date(b.submit_time).getTime() - new Date(a.submit_time).getTime())
    .slice(0, 5);
  
    return (
    <section className={styles.recentSection}>
      <h3 className={styles.recentTitle}>Recent Activity</h3>
      {recentActivities.length === 0 ? (
        <p className={styles.noActivity}>No recent activity</p>
      ) : (
        <ul className={styles.activityList}>
          {recentActivities.map((act, idx) => {
            if (!act) return null;
            const Icon =
              icons[act.category.toLowerCase() as keyof typeof icons] ||
              icons.misc;

            return (
              <li key={idx} className={styles.activityItem}>
                <div className={styles.activityHeader}>
                  <Icon size={16} className={styles.categoryIcon} />
                  <span className={styles.activityName}>{act.name}</span>
                  <span className={styles.activityDate}>
                    {new Date(act?.submit_time).toLocaleDateString()}
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