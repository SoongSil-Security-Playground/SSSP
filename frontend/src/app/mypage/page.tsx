import { PageTitle } from "@/shared/components/Title";
import { ProfileSection } from "@/shared/components/Profile/ProfileSection";
import { RecentSection, type Activity } from "@/shared/components/Profile/RecentSection";
import { StatsSection } from "@/shared/components/Profile/StatsSection";
import styles from "./page.module.css"

export default async function MyPage() {

  const stats = [
    { label: "Rank", value: "#1234" },
    { label: "Score", value: "123456" },
    { label: "Solved", value: 165 },
  ];

  const activities: Activity[] = [
    { name: "Challenge Name", date: "2025.06.17", stars: 3, category: "pwn", points: 1000 },
    { name: "Challenge Name", date: "2025.06.17", stars: 1, category: "rev", points: 1000 },
    { name: "Challenge Name", date: "2025.06.17", stars: 2, category: "misc", points: 1000 },
    { name: "Challenge Name", date: "2025.06.17", stars: 5, category: "web", points: 1000 },
  ];

  return (
    <div className={styles.mainContainer}
    >
      <PageTitle text="My Page" />
      <div className={styles.contentWrapper}>
        <aside className={styles.sidebar}>
          <ProfileSection email="email" nickname="nickname" />
        </aside>

        <main className={styles.mainContent}>
          <StatsSection stats={stats} />
          <RecentSection activities={activities} />
        </main>
      </div>
    </div>
  );
};