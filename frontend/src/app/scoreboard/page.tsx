import { PageTitle } from "@/shared/components/Title";
import { RankList } from "@/shared/components/List/RankList";
import { type RankCardProps } from "@/shared/components/Card/RankCard"
import styles from './page.module.css';

export default function ScoreBoardPage() {
  const ranks: RankCardProps[] = [
    { id: 'alice', rank: 1, score: 1000 },
    { id: 'bob', rank: 2, score: 999 },
    { id: 'charlie', rank: 3, score: 800 },
    { id: 'dave', rank: 4, score: 750 },
    { id: 'eve', rank: 5, score: 600 },
  ]

  return (
    <div className={styles.container}>
      <PageTitle text="SCOREBOARD" />
      <div className={styles.contentWrapper}>
        <RankList items={ranks} />
      </div>
    </div>
  );
}
