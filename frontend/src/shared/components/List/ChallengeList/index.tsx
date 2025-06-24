import React, { type FC } from 'react';
import { ChallengeCard, type ChallengeCardProps } from '../../Card/ChallengeCard';
import styles from './index.module.css';

export type ChallengeListProps = {
  items: ChallengeCardProps[];
  onItemClick?: (item: ChallengeCardProps) => void;
};

export const ChallengeList: FC<ChallengeListProps> = ({ items, onItemClick }) => {
  return (
    <div className={styles.gridContainer}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className={styles.cardWrapper}
          onClick={() => onItemClick?.(item)}
          style={{ cursor: onItemClick ? 'pointer' : 'default' }}
        >
          <ChallengeCard {...item} />
        </div>
      ))}
    </div>
  );
};