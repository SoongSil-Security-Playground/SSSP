'use client';

import React, { type FC } from 'react';
import { Star, Star as StarOutline } from 'lucide-react';
import styles from './index.module.css';

type StarRatingProps = {
  rating: number; // 1 to 5
  maxRating?: number; // 기본 5
  onRate?: (newRating: number) => void;
};

export const StarRating: FC<StarRatingProps> = ({ rating, maxRating = 5, onRate }) => {
  return (
    <div className={styles.starContainer}>
      {Array.from({ length: maxRating }, (_, i) => (
        <div
          key={i}
          className={styles.star}
          onClick={() => onRate && onRate(i + 1)}
        >
          {i < rating ? (
            <Star className={styles.starFilled} size={16} />
          ) : (
            <StarOutline className={styles.starOutline} size={16} />
          )}
        </div>
      ))}
    </div>
  );
};