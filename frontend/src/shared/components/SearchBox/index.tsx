import React, { type FC } from 'react';
import { Search } from 'lucide-react';
import styles from './index.module.css';

type SearchBoxProps = {
    value: string;
    onChange: (q: string) => void;
};

export const SearchBox: FC<SearchBoxProps> = ({ value, onChange }) => (
    <div className={styles.wrapper}>
        <Search size={16} className={styles.icon} />
        <input
            type="text"
            placeholder="Search..."
            className={styles.input}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);
