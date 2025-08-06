'use client';

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { challenge_get_all } from '@/shared/hooks/api/useChallenge';
import type { GetAllChallengeSuccess } from '@/shared/types/forAPI/ChallengeType';

interface FilterState {
  items: GetAllChallengeSuccess;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;

  search: string;
  setSearch: (s: string) => void;
  status: 'all' | 'solved' | 'unsolved';
  setStatus: (s: 'all' | 'solved' | 'unsolved') => void;

  selectedCategories: string[];
  toggleCategory: (c: string) => void;

  selectedDifficulties: number[];
  toggleDifficulty: (d: number) => void;

  categories: string[];
  difficulties: number[];
  filteredItems: GetAllChallengeSuccess;

  selectedId: number | null;
  setSelectedId: (id: number | null) => void;

  removeCategory: (c: string) => void;
  removeDifficulty: (d: number) => void;

  clearAllCategories: () => void;
  clearAllDifficulties: () => void;
}

const FilterContext = createContext<FilterState | null>(null);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const { data: items = [], isLoading, isError, error } =
    useQuery<GetAllChallengeSuccess, Error>({
      queryKey: ['challenges'],
      queryFn: challenge_get_all,
    });

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | 'solved' | 'unsolved'>('all');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<number[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat)
        ? prev.filter(x => x !== cat)
        : [...prev, cat]
    );
  };

  const toggleDifficulty = (stars: number) => {
    setSelectedDifficulties(prev =>
      prev.includes(stars)
        ? prev.filter(x => x !== stars)
        : [...prev, stars]
    );
  };

  const removeCategory = (cat: string) => {
    setSelectedCategories(prev => prev.filter(c => c !== cat));
  };

  const removeDifficulty = (d: number) => {
    setSelectedDifficulties(prev => prev.filter(x => x !== d));
  };

  const clearAllCategories = () => setSelectedCategories([]);
  const clearAllDifficulties = () => setSelectedDifficulties([]);

  const categories = useMemo(() => Array.from(new Set(items.map(i => i.category))), [items]);
  const difficulties = useMemo(
    () => Array.from(new Set(items.map(i => parseInt(i.level, 10)))).sort((a, b) => a - b),
    [items]
  );

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (search && !item.name.toLowerCase().includes(search.toLowerCase()))
        return false;

      const curr = item.is_user_solved === 1 ? 'solved' : 'unsolved';
      if (status !== 'all' && curr !== status) return false;

      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(item.category)
      ) return false;

      const lvl = parseInt(item.level, 10);
      if (
        selectedDifficulties.length > 0 &&
        !selectedDifficulties.includes(lvl)
      ) return false;

      return true;
    });
  }, [
    items,
    search,
    status,
    selectedCategories,
    selectedDifficulties,
  ]);

  const value = useMemo<FilterState>(
    () => ({
      items,
      isLoading,
      isError,
      error,

      search,
      setSearch,
      status,
      setStatus,

      selectedCategories,
      toggleCategory,
      selectedDifficulties,
      toggleDifficulty,

      categories,
      difficulties,
      filteredItems,

      selectedId,
      setSelectedId,

      removeCategory,
      removeDifficulty,

      clearAllCategories,
      clearAllDifficulties,
    }),
    [
      items,
      isLoading,
      isError,
      error,
      search,
      status,
      selectedCategories,
      selectedDifficulties,
      categories,
      difficulties,
      filteredItems,
      selectedId,
      setSelectedId,
    ]
  );

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters(): FilterState {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilters must be used inside <FilterProvider>');
  return ctx;
}
