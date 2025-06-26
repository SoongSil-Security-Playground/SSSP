import React, { type FC } from 'react';
import { ScoreListContent, GetScoreListSuccess } from '@/shared/types/forAPI/ScoringType';
import { RankCard } from '../../Card/RankCard';
import styles from './index.module.css';

export type RankListProps = {
  items: GetScoreListSuccess;
  onItemClick?: (rank: ScoreListContent & { id: number }) => void;
};

export const RankList: FC<RankListProps> = ({ items, onItemClick }) => {
  const sortedItems = [...items].sort((a, b) => b.total_score - a.total_score);

  return (
    <div className={styles.list}>
      {sortedItems.map((rank, index) => {
        const rankWithId = { ...rank, id: index + 1 };

        return (
          <div
            key={index}
            className={styles.cardWrapper}
            style={{ cursor: onItemClick ? 'pointer' : 'default' }}
            onClick={() => onItemClick?.(rankWithId)}
          >
            <RankCard {...rankWithId} />
          </div>
        );
      })}
    </div>
  );
};
