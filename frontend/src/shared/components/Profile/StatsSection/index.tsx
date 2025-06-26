import React, { FC } from 'react';
import styles from './index.module.css'
import { Medal, Trophy, Crown } from 'lucide-react';

export type Stat = { label: string; value: string | number };

// label 별로 매핑할 아이콘
const iconMap: Record<string, React.FC<any>> = {
  Rank: Crown,
  Score: Trophy,
  Solved: Medal,
};

export type StatsSectionProps = {
  stats: Stat[];
};

export const StatsSection: FC<StatsSectionProps> = ({ stats }) => (
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