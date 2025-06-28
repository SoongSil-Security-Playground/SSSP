'use client';

import React, { type FC } from 'react';
import { useFilters } from '../../FilterPanel/FilterContext';
import { ChallengeCard } from '../../Card/ChallengeCard';
import styles from './index.module.css';

export const ChallengeList: FC = () => {
  const {
    filteredItems,
    isLoading,
    isError,
    error,
    setSelectedId,
  } = useFilters();

  if (isLoading) return <div>Loading…</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className={styles.gridContainer}>
      {filteredItems.map(item => (
        <div
          key={item.id}
          className={styles.cardWrapper}
          onClick={() => setSelectedId(item.id)}
          style={{ cursor: 'pointer' }}
        >
          <ChallengeCard {...item} />
        </div>
      ))}
    </div>
  );
};