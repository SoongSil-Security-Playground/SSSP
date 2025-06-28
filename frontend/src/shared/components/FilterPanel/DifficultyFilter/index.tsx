import React, { type FC } from 'react';
import { StarRating } from '../../Rating';
import styles from './index.module.css';

type DifficultyFilterProps = {
    selected: number[];
    difficulties: number[];
    onToggle: (stars: number) => void;
    onClearAll: () => void
};

const levels = [
    { label: 'Very Easy', stars: 1 },
    { label: 'Easy', stars: 2 },
    { label: 'Medium', stars: 3 },
    { label: 'Hard', stars: 4 },
    { label: 'Very Hard', stars: 5 },
];

export const DifficultyFilter: FC<DifficultyFilterProps> = ({
    difficulties,
    selected,
    onToggle,
    onClearAll
}) => (
    <ul className={styles.list}>
        {onClearAll && (
            <li key="all">
                <button
                    className={[
                        styles.button,
                        selected.length === 0 && styles.selected,
                    ]
                        .filter(Boolean)
                        .join(' ')}
                    onClick={onClearAll}
                >
                    All
                </button>
            </li>
        )}
        {difficulties.map((stars) => {
            const lvl = levels.find((l) => l.stars === stars);
            const label = lvl ? lvl.label : `${stars} stars`;
            const isSel = selected.includes(stars);

            return (
                <li key={stars}>
                    <button
                        className={[
                            styles.button,
                            isSel && styles.selected,
                        ]
                            .filter(Boolean)
                            .join(' ')}
                        onClick={() => onToggle(stars)}
                    >
                        <StarRating rating={stars} />
                        <span className={styles.label}>{label}</span>
                    </button>
                </li>
            );
        })}
    </ul>
);
