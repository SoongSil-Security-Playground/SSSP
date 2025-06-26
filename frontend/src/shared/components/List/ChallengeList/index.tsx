import React, { type FC } from 'react';
import { ChallengeCard } from '../../Card/ChallengeCard';
import type { DefaultChallengeContent } from '@/shared/types/forAPI/ChallengeType';
import styles from './index.module.css';

export type ChallengeListProps = {
  items: DefaultChallengeContent[];
  onItemClick?: (item: DefaultChallengeContent) => void;
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