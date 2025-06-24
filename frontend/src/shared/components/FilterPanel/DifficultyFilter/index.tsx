import React, { type FC } from 'react';
import { StarRating } from '../../Rating';
import styles from './index.module.css';

type DifficultyFilterProps = {
    selected: number | null;
    onSelect: (stars: number | null) => void;
};

const levels = [
    { label: 'Very Easy', stars: 1 },
    { label: 'Easy', stars: 2 },
    { label: 'Medium', stars: 3 },
    { label: 'Hard', stars: 4 },
    { label: 'Very Hard', stars: 5 },
];

export const DifficultyFilter: FC<DifficultyFilterProps> = ({
    selected,
    onSelect,
}) => (
    <ul className={styles.list}>
        <li>
            <button
                className={`${styles.button} ${selected === null ? styles.selected : ''}`}
                onClick={() => onSelect(null)}
            >
                All
            </button>
        </li>
        {levels.map((lvl) => (
            <li key={lvl.stars}>
                <button
                    className={`${styles.button} ${selected === lvl.stars ? styles.selected : ''
                        }`}
                    onClick={() => onSelect(lvl.stars)}
                >
                    <span>{lvl.label}</span>
                    <StarRating rating={lvl.stars} />
                </button>
            </li>
        ))}
    </ul>
);
