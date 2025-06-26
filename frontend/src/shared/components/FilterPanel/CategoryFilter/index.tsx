import React, { type FC } from 'react';
import {
    Settings,
    Wrench,
    Lock,
    Globe2,
    MoreHorizontal,
} from 'lucide-react';
import styles from './index.module.css';

type CategoryFilterProps = {
    categories: string[];
    selected: string | null;
    onToggle: (cat: string | null) => void;
};

export const icons: Record<string, React.FC<any>> = {
    pwn: Settings,
    rev: Wrench,
    crypto: Lock,
    web: Globe2,
    misc: MoreHorizontal,
};

export const CategoryFilter: FC<CategoryFilterProps> = ({
    categories,
    selected,
    onToggle,
}) => {
    return (
        <ul className={styles.list}>
            <li>
                <button
                    className={`${styles.button} ${selected === null ? styles.selected : ''}`}
                    onClick={() => onToggle(null)}
                >
                    All
                </button>
            </li>
            {categories.map((cat) => {
                const Icon = icons[cat.toLowerCase()];
                return (
                    <li key={cat}>
                        <button
                            className={`${styles.button} ${selected === cat ? styles.selected : ''}`}
                            onClick={() => onToggle(cat)}
                        >
                            {Icon && <Icon size={16} className={styles.icon} />}
                            <span className={styles.label}>{cat.toUpperCase()}</span>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};
