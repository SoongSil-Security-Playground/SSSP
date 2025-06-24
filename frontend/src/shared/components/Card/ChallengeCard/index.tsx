import React, { type FC } from 'react';
import { StarRating } from '../../Rating';
import styles from './index.module.css';

export type ChallengeCardProps = {
  title: string;
  stars: number;
  points: number;
  category: string;
  description: string;
  status: 'solved' | 'unsolved';
};

export const ChallengeCard: FC<ChallengeCardProps> = ({
  title,
  stars,
  points,
  category,
  description,
  status,
}) => {
  const statusClass = status === 'solved' ? styles.solved : styles.unsolved;

  return (
    <div className={`${styles.card} ${statusClass}`}>
      <div className={styles.title}>{title}</div>
      <div className={styles.meta}>
        <StarRating rating={stars}/>
        <span className={styles.points}>{points} pts</span>
        <span className={styles.categoryPill}>{category.toUpperCase()}</span>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.status}>{status.toUpperCase()}</div>
    </div>
  );
};