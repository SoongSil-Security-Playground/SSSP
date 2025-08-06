import React, { FC } from 'react';
import { Star } from 'lucide-react';
import styles from './index.module.css';
import type { Status } from '../StatusFilter';

export type ActiveFiltersProps = {
    search: string;
    onClearSearch: () => void;

    selectedCategories: string[];
    onRemoveCategory: (c: string) => void;

    selectedDifficulties: number[];
    onRemoveDifficulty: (d: number) => void;

    selectedStatus: Status;
    onClearStatus: () => void;
};

export const ActiveFilters: FC<ActiveFiltersProps> = ({
    search,
    onClearSearch,

    selectedCategories,
    onRemoveCategory,

    selectedDifficulties,
    onRemoveDifficulty,

    selectedStatus,
    onClearStatus,
}) => {
    const hasAny =
        !!search ||
        selectedCategories.length > 0 ||
        selectedDifficulties.length > 0 ||
        selectedStatus !== 'all';

    if (!hasAny) return null;

    return (
        <div className={styles.container}>
            {search && (
                <span className={styles.tag}>
                    {search}
                    <button
                        onClick={onClearSearch}
                        className={styles.tagRemove}
                        aria-label="Clear search"
                    >
                        ×
                    </button>
                </span>
            )}

            {selectedCategories.map(cat => (
                <span key={cat} className={styles.tag}>
                    {cat.toUpperCase()}
                    <button
                        onClick={() => onRemoveCategory(cat)}
                        className={styles.tagRemove}
                        aria-label={`Remove category ${cat}`}
                    >
                        ×
                    </button>
                </span>
            ))}

            {selectedDifficulties.map(d => (
                <span key={d} className={styles.tag}>
                    {d}
                    <Star size={12} className={styles.tagIcon} />
                    <button
                        onClick={() => onRemoveDifficulty(d)}
                        className={styles.tagRemove}
                        aria-label={`Remove difficulty ${d}`}
                    >
                        ×
                    </button>
                </span>
            ))}

            {selectedStatus !== 'all' && (
                <span className={styles.tag}>
                    {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
                    <button
                        onClick={onClearStatus}
                        className={styles.tagRemove}
                        aria-label="Clear status"
                    >
                        ×
                    </button>
                </span>
            )}
        </div>
    );
};
