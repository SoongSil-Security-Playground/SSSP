import React, { type FC } from 'react';
import { Star } from 'lucide-react';
import styles from './index.module.css';
import type { Status } from '../StatusFilter';

export type ActiveFiltersProps = {
    search: string;
    onClearSearch: () => void;

    selectedCategory: string | null;
    onClearCategory: () => void;

    selectedDifficulty: number | null;
    onClearDifficulty: () => void;

    selectedStatus: Status;
    onClearStatus: () => void;
};

export const ActiveFilters: FC<ActiveFiltersProps> = ({
    search,
    onClearSearch,
    selectedCategory,
    onClearCategory,
    selectedDifficulty,
    onClearDifficulty,
    selectedStatus,
    onClearStatus,
}) => {
    const hasAny =
        !!search ||
        selectedCategory !== null ||
        selectedDifficulty !== null ||
        selectedStatus !== 'all';

    if (!hasAny) return null;

    return (
        <div className={styles.container}>
            {search && (
                <span className={styles.tag}>
                    {search}
                    <button onClick={onClearSearch} className={styles.tagRemove}>
                        ×
                    </button>
                </span>
            )}
            {selectedCategory && (
                <span className={styles.tag}>
                    {selectedCategory.toUpperCase()}
                    <button onClick={onClearCategory} className={styles.tagRemove}>
                        ×
                    </button>
                </span>
            )}
            {selectedDifficulty !== null && (
                <span className={styles.tag}>
                    {selectedDifficulty}
                    <Star size={12} />
                    <button onClick={onClearDifficulty} className={styles.tagRemove}>
                        ×
                    </button>
                </span>
            )}
            {selectedStatus !== 'all' && (
                <span className={styles.tag}>
                    {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
                    <button onClick={onClearStatus} className={styles.tagRemove}>
                        ×
                    </button>
                </span>
            )}
        </div>
    );
};
