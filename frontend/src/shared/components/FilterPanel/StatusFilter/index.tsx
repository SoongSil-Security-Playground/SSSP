import React, { type FC } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import styles from './index.module.css';

export type Status = 'all' | 'solved' | 'unsolved';

type StatusFilterProps = {
    selected: Status;
    onChange: (status: Status) => void;
};

const statuses = [
    { label: 'All', value: 'all' as const },
    { label: 'Solved', value: 'solved' as const },
    { label: 'Unsolved', value: 'unsolved' as const },
];

export const StatusFilter: FC<StatusFilterProps> = ({
    selected,
    onChange,
}) => (
    <ul className={styles.list}>
        {statuses.map(({ label, value }) => (
            <li key={value}>
                <button
                    className={`${styles.button} ${selected === value ? styles.selected : ''}`}
                    onClick={() => onChange(value)}
                >
                    {value !== 'all' &&
                        (value === 'solved' ? (
                            <CheckCircle size={14} color="white" />
                        ) : (
                            <Circle size={14} color="white" />
                        ))}
                    <span>{label}</span>
                </button>
            </li>
        ))}
    </ul>
);
