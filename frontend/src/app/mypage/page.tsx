'use client';

import React, { useState, useEffect } from "react";
import { PageTitle } from "@/shared/components/Title";
import { ProfileSection, type ProfileSectionProps } from "@/shared/components/Profile/ProfileSection";
import { RecentSection, type Activity } from "@/shared/components/Profile/RecentSection";
import { StatsSection, type Stat } from "@/shared/components/Profile/StatsSection";
import { challenge_get_user_solved } from "@/shared/hooks/api/useChallenge";
import { get_score, get_my_score } from "@/shared/hooks/api/useScoring";
import { user_get } from "@/shared/hooks/api/useUser";
import type { GetUserSolvedChallengeSuccess } from "@/shared/types/forAPI/ChallengeType";
import type { GetScoreListSuccess } from "@/shared/types/forAPI/ScoringType";
import type { GetMyScoreSuccess } from "@/shared/types/forAPI/ScoringType";
import type { GetUserSuccess } from "@/shared/types/forAPI/UserType";
import styles from "./page.module.css"

export function buildProfileData(
  solvedList: GetUserSolvedChallengeSuccess,
  allScores: GetScoreListSuccess,
  myScore: GetMyScoreSuccess,
  userProfile: GetUserSuccess
): {
  stats: { label: string; value: string | number }[];
  activities: Activity[];
  info: { email: string; username: string };
} {
  const solvedCount = solvedList.length;
  const sortedScores = [...allScores].sort((a, b) => b.total_score - a.total_score);
  const myRankIndex = sortedScores.findIndex((s) => s.username === myScore.username);
  const rank = myRankIndex >= 0 ? myRankIndex + 1 : null;

  const stats = [
    { label: 'Rank', value: rank !== null ? `#${rank}` : '-' },
    { label: 'Score', value: myScore.total_score },
    { label: 'Solved', value: solvedCount },
  ];

  const activities: Activity[] = solvedList.map((ch) => ({
    name: ch.name,
    date: new Date(ch.created_at).toLocaleDateString(),
    stars: parseInt(ch.level, 10),
    category: ch.category as any,
    points: ch.points,
  }));

  const info = {
    email: userProfile.email,
    username: userProfile.username,
  };

  return { stats, activities, info };
}

export default function MyPage() {
  const [info, setInfo] = useState<ProfileSectionProps | null>(null);
  const [stats, setStats] = useState<Stat[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      challenge_get_user_solved(),
      get_score(),
      get_my_score(),
      user_get(),
    ])
      .then(([solvedList, allScores, myScore, userProfile]) => {
        const { stats, activities, info } = buildProfileData(
          solvedList,
          allScores,
          myScore,
          userProfile
        );
        setStats(stats);
        setActivities(activities);
        setInfo(info);
      })
      .catch((err: any) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className={styles.mainContainer}>Loading...</div>;
  if (error) return <div className={styles.mainContainer}>Error: {error}</div>;
  
  return (
    <div className={styles.mainContainer}
    >
      <PageTitle text="My Page" />
      <div className={styles.contentWrapper}>
        <aside className={styles.sidebar}>
          <ProfileSection email={info?.email} username={info?.username} />
        </aside>

        <main className={styles.mainContent}>
          <StatsSection stats={stats} />
          <RecentSection activities={activities} />
        </main>
      </div>
    </div>
  );
};