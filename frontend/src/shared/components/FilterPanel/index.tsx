'use client'

import React, { type FC, useState } from 'react';
import { SearchBox } from '../SearchBox';
import { ActiveFilters } from './ActiveFilters';
import { FilterSection } from './FilterSection';
import { CategoryFilter } from './CategoryFilter';
import { DifficultyFilter } from './DifficultyFilter';
import { StatusFilter, type Status } from './StatusFilter';
import styles from './index.module.css';

type FilterProps = {
    search: string;
    onSearchChange: (q: string) => void;

    categories: string[];

    selectedCategory: string | null;
    onCategoryToggle: (cat: string | null) => void;

    selectedDifficulty: number | null;
    onDifficultySelect: (stars: number | null) => void;

    selectedStatus: Status;
    onStatusChange: (status: Status) => void;
};

export const FilterPanel: FC<FilterProps> = ({
    search,
    onSearchChange,
    categories,
    selectedCategory,
    onCategoryToggle,
    selectedDifficulty,
    onDifficultySelect,
    selectedStatus,
    onStatusChange,
}) => {

    const [openSection, setOpenSection] = useState<string | null>(null);
    const toggleSection = (sec: string) =>
        setOpenSection(prev => (prev === sec ? null : sec));

    return (
        <aside className={styles.sidebar}>
            <SearchBox value={search} onChange={onSearchChange} />
            <ActiveFilters
                search={search}
                onClearSearch={() => onSearchChange('')}
                selectedCategory={selectedCategory}
                onClearCategory={() => onCategoryToggle(null)}
                selectedDifficulty={selectedDifficulty}
                onClearDifficulty={() => onDifficultySelect(null)}
                selectedStatus={selectedStatus}
                onClearStatus={() => onStatusChange('all')}
            />
            <FilterSection
                title="CATEGORY"
                isOpen={openSection === 'CATEGORY'}
                onToggle={() => toggleSection('CATEGORY')}
            >
                <CategoryFilter
                    categories={categories}
                    selected={selectedCategory}
                    onToggle={onCategoryToggle}
                />
            </FilterSection>
            <FilterSection
                title="DIFFICULTY"
                isOpen={openSection === 'DIFFICULTY'}
                onToggle={() => toggleSection('DIFFICULTY')}
            >
                <DifficultyFilter
                    selected={selectedDifficulty}
                    onSelect={onDifficultySelect}
                />
            </FilterSection>
            <FilterSection
                title="STATUS"
                isOpen={openSection === 'STATUS'}
                onToggle={() => toggleSection('STATUS')}
            >
                <StatusFilter
                    selected={selectedStatus}
                    onChange={onStatusChange}
                />
            </FilterSection>
        </aside>
    );
};