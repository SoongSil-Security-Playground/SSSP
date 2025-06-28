import React, { type FC } from 'react';
import { StarRating } from '../../Rating';
import styles from './index.module.css';

interface LevelOption {
    label: string;
    stars: number;
}

export type DifficultyFilterProps = {
    selected: number[];
    onToggle: (stars: number) => void;
    onClearAll: () => void;
};

const levels: readonly LevelOption[] = [
    { label: 'Very Easy', stars: 1 },
    { label: 'Easy', stars: 2 },
    { label: 'Medium', stars: 3 },
    { label: 'Hard', stars: 4 },
    { label: 'Very Hard', stars: 5 },
];

export const DifficultyFilter: FC<DifficultyFilterProps> = ({
    selected,
    onToggle,
    onClearAll
}) => (
    <ul className={styles.list}>
        <li key="all">
            <button
                className={[
                    styles.button,
                    selected.length === 0 && styles.selected,
                ].filter(Boolean).join(' ')}
                onClick={onClearAll}
            >
                All
            </button>
        </li>

        {levels.map(({ label, stars }) => {
            const isSel = selected.includes(stars);
            return (
                <li key={stars}>
                    <button
                        className={[
                            styles.button,
                            isSel && styles.selected,
                        ].filter(Boolean).join(' ')}
                        onClick={() => onToggle(stars)}
                    >
                        <span className={styles.label}>{label}</span>
                        <StarRating rating={stars} />
                    </button>
                </li>
            );
        })}
    </ul>
);