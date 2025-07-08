'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetScoreListSuccess } from '@/shared/types/forAPI/ScoringType';
import { get_score } from '@/shared/hooks/api/useScoring';
import { RankCard } from '../../Card/RankCard';
import { Loading } from '../../Loading';
import { toast } from 'react-toastify';
import styles from './index.module.css';

export const RankList = () => {
  const { data: items = [], isLoading, isError, error } =
    useQuery<GetScoreListSuccess, Error>({
      queryKey: ['scores'],
      queryFn: get_score,
    });

  if (isLoading) return <Loading />
  if (isError) {
    toast.error(error.message);
  }

  const sortedItems = [...items].sort((a, b) => b.total_score - a.total_score);

  return (
    <div className={styles.list}>
      {sortedItems.map((rank, index) => {
        const rankWithId = { ...rank, id: index + 1 };
        return (
          <div key={index} className={styles.cardWrapper}>
            <RankCard {...rankWithId} />
          </div>
        );
      })}
    </div>
  );
};
