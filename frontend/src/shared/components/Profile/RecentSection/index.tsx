import React, { FC } from 'react';
import { icons } from '../../FilterPanel/CategoryFilter';
import { StarRating } from '../../Rating';
import styles from './index.module.css';

export type Activity = {
  name: string;
  date: string;
  stars: number;
  category: string;
  points: number;
};

export type RecentSectionProps = {
  activities: Activity[];
};

export const RecentSection: FC<RecentSectionProps> = ({ activities }) => {
  return (
    <section className={styles.recentSection}>
      <h3 className={styles.recentTitle}>Recent Activity</h3>
      <ul className={styles.activityList}>
        {activities.map((act, idx) => {
          const Icon = icons[act.category.toLowerCase()];
          return (
            <li key={idx} className={styles.activityItem}>
              <div className={styles.activityHeader}>
                <Icon size={16} className={styles.categoryIcon} />
                <span className={styles.activityName}>{act.name}</span>
                <span className={styles.activityDate}>{act.date}</span>
              </div>
              <div className={styles.activityMeta}>
                <StarRating rating={act.stars} />
                <span className={styles.tag}>{act.category.toUpperCase()}</span>
                <span className={styles.points}>{act.points} pts</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};