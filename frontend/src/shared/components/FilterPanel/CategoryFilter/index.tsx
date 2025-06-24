import React, { type FC } from 'react';
import {
    Settings,
    Wrench,
    Lock,
    Globe2,
    MoreHorizontal,
} from 'lucide-react';
import styles from './index.module.css';

export type Category = 'pwn' | 'rev' | 'crypto' | 'web' | 'misc';

type CategoryFilterProps = {
    selected: Category | null;
    onToggle: (cat: Category | null) => void;
};

export const icons: Record<Category, React.FC<any>> = {
    pwn: Settings,
    rev: Wrench,
    crypto: Lock,
    web: Globe2,
    misc: MoreHorizontal,
};

export const CategoryFilter: FC<CategoryFilterProps> = ({
    selected,
    onToggle,
}) => {
    const cats: Category[] = ['pwn', 'rev', 'crypto', 'web', 'misc'];
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
            {cats.map((cat) => {
                const Icon = icons[cat];
                return (
                    <li key={cat}>
                        <button
                            className={`${styles.button} ${selected === cat ? styles.selected : ''}`}
                            onClick={() => onToggle(cat)}
                        >
                            <Icon size={16} className={styles.icon} />
                            <span className={styles.label}>{cat.toUpperCase()}</span>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};
