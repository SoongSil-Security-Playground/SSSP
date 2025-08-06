import React, { type FC, ReactNode } from 'react';
import styles from './index.module.css';

type FilterSectionProps = {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: ReactNode;
};

export const FilterSection: FC<FilterSectionProps> = ({
    title,
    isOpen,
    onToggle,
    children,
}) => {
    return (
        <div className={styles.section}>
            <button
                type="button"
                className={styles.header}
                onClick={onToggle}
            >
                <span>{title}</span>
                <span className={styles.icon}>{isOpen ? '–' : '+'}</span>
            </button>
            <div
                className={`${styles.content} ${isOpen ? styles.contentOpen : ''}`}
            >
                {children}
            </div>
        </div>
    );
};
