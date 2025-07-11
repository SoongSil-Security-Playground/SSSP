'use client'

import React, { CSSProperties, type FC, useState } from 'react';
import { SearchBox } from '../SearchBox';
import { ActiveFilters } from './ActiveFilters';
import { FilterSection } from './FilterSection';
import { CategoryFilter } from './CategoryFilter';
import { DifficultyFilter } from './DifficultyFilter';
import { StatusFilter, type Status } from './StatusFilter';
import { useFilters } from './FilterContext';
import { PanelLeftOpen, PanelRightClose } from 'lucide-react';
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

  const [isOpen, setIsOpen] = useState(true);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const toggleSection = (sec: string) =>
    setOpenSection(prev => prev === sec ? null : sec);
  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  const sidebarWidth = 260; // px

  const sidebarStyle: CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: isOpen ? 0 : -sidebarWidth,
    transform: 'translateY(-50%)',
    width: sidebarWidth,
    transition: 'left 0.3s ease',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '0px 16px 16px 0px',
    boxShadow: '2px 4px 6px 0px rgba(0, 0, 0, 0.20)',
  };
  const buttonWidth = 40;
  const buttonHeight = 80;
  const indent = 20; // px, left inward curve depth

  const buttonStyle: CSSProperties = {
    position: 'absolute',
    top: '50%',
    right: -indent,
    transform: 'translateY(-50%)',
    width: buttonWidth,
    height: buttonHeight,
    border: 'none',
    backgroundColor: 'rgb(49, 49, 49)',
    color: 'var(--offwhite)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    borderTopRightRadius: '20px',
    borderBottomRightRadius: '20px',
    zIndex: '1000',
  };

  return (
    <div style={sidebarStyle}>
      <button style={buttonStyle} onClick={toggleSidebar} aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}>
        {isOpen ? '<' : '>'}
      </button>
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
    </div>
  );
};
