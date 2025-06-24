import React, { type FC } from 'react';
import { RankCard, type RankCardProps } from '../../Card/RankCard';
import styles from './index.module.css';

export type RankListProps = {
  items: RankCardProps[];
  onItemClick?: (rank: RankCardProps) => void;
};

export const RankList: FC<RankListProps> = ({ items, onItemClick }) => (
  <div className={styles.list}>
    {items.map(rank => (
      <div
        key={rank.id}
        className={styles.cardWrapper}
        style={{ cursor: onItemClick ? 'pointer' : 'default' }}
      >
        <RankCard {...rank} />
      </div>
    ))}
  </div>
);
