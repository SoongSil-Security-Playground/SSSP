'use client'

import React, { type FC, useState } from 'react';
import { SearchBox } from '../SearchBox';
import { ActiveFilters } from './ActiveFilters';
import { FilterSection } from './FilterSection';
import { CategoryFilter } from './CategoryFilter';
import { DifficultyFilter } from './DifficultyFilter';
import { StatusFilter, type Status } from './StatusFilter';
import { useFilters } from './FilterContext';
import styles from './index.module.css';

export const FilterPanel: React.FC = () => {
    const {
        search, setSearch,
        status, setStatus,

        categories,
        selectedCategories,
        toggleCategory,

        difficulties,
        selectedDifficulties,
        toggleDifficulty,

        removeCategory,
        removeDifficulty,

        clearAllCategories,
        clearAllDifficulties,
    } = useFilters();

    const [openSection, setOpenSection] = useState<string | null>(null);
    const toggleSection = (sec: string) =>
        setOpenSection(prev => prev === sec ? null : sec);

    return (
        <aside className={styles.sidebar}>
            <SearchBox value={search} onChange={setSearch} />

            <ActiveFilters
                search={search}
                onClearSearch={() => setSearch('')}
                selectedCategories={selectedCategories}
                onRemoveCategory={removeCategory}
                selectedDifficulties={selectedDifficulties}
                onRemoveDifficulty={removeDifficulty}
                selectedStatus={status}
                onClearStatus={() => setStatus('all')}
            />

            <FilterSection
                title="CATEGORY"
                isOpen={openSection === 'CATEGORY'}
                onToggle={() => toggleSection('CATEGORY')}
            >
                <CategoryFilter
                    categories={categories}
                    selected={selectedCategories}
                    onToggle={toggleCategory}
                    onClearAll={clearAllCategories}
                />
            </FilterSection>

            <FilterSection
                title="DIFFICULTY"
                isOpen={openSection === 'DIFFICULTY'}
                onToggle={() => toggleSection('DIFFICULTY')}
            >
                <DifficultyFilter
                    selected={selectedDifficulties}
                    onToggle={toggleDifficulty}
                    onClearAll={clearAllDifficulties}
                />
            </FilterSection>

            <FilterSection
                title="STATUS"
                isOpen={openSection === 'STATUS'}
                onToggle={() => toggleSection('STATUS')}
            >
                <StatusFilter
                    selected={status}
                    onChange={setStatus}
                />
            </FilterSection>
        </aside>
    );
};