import React, { type FC } from 'react';
import { StarRating } from '../../Rating';
import { DefaultChallengeContent } from '@/shared/types/forAPI/ChallengeType';
import styles from './index.module.css';

export const ChallengeCard: FC<DefaultChallengeContent> = ({
  name,
  level,
  points,
  category,
  description,
  is_user_solved,
}) => {
  const status = is_user_solved === 1 ? 'solved' : 'unsolved';
  const statusClass = status === 'solved' ? styles.solved : styles.unsolved;

  return (
    <div className={`${styles.card} ${statusClass}`}>
      <div className={styles.title}>{name}</div>
      <div className={styles.meta}>
        <StarRating rating={parseInt(level, 10)} />
        <span className={styles.points}>{points} pts</span>
        <span className={styles.categoryPill}>{category.toUpperCase()}</span>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.status}>{status.toUpperCase()}</div>
    </div>
  );
};