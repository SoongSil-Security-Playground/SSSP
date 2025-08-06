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
    selected: string[];
    onToggle: (cat: string) => void;
    onClearAll?: () => void;
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
    onClearAll
}) => {
    return (
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
            {categories.map((cat) => {
                const Icon = icons[cat.toLowerCase()];
                const isSel = selected.includes(cat);
                return (
                    <li key={cat}>
                        <button
                            className={[
                                styles.button,
                                isSel && styles.selected,
                            ]
                                .filter(Boolean)
                                .join(' ')}
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
