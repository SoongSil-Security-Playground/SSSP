'use client';

import React, { useState, useMemo, useEffect } from "react";
import { FilterPanel } from "@/shared/components/FilterPanel";
import { PageTitle } from "@/shared/components/Title";
import { ChallengeList } from "@/shared/components/List/ChallengeList";
import { ChallengeDetailModal } from "@/shared/components/Modal/ChallengeDetailModal";
import { challenge_get_all } from "@/shared/hooks/api/useChallenge";
import { DefaultChallengeContent } from "@/shared/types/forAPI/ChallengeType";
import styles from "./page.module.css"

export default function ChallengesPage() {
  const [items, setItems] = useState<DefaultChallengeContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [status, setStatus] = useState<"all" | "solved" | "unsolved">("all");
  const [selected, setSelected] = useState<DefaultChallengeContent | null>(null);
  const categories = useMemo<string[]>(() => {
    const cats = new Set(items.map((i) => i.category));
    return Array.from(cats);
  }, [items]);

  useEffect(() => {
    challenge_get_all()
      .then((data) => setItems(data))
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => (
    items.filter(item => {
      if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (category && item.category !== category) return false;
      if (difficulty !== null && parseInt(item.level, 10) !== difficulty) return false;
      if (status !== "all" && (item.is_user_solved === 1 ? 'solved' : 'unsolved' !== status)) return false;
      return true;
    })
  ), [items, search, category, difficulty, status]);

  const handleSolve = (id: number) => {
    setItems(curr =>
      curr.map(item =>
        item.id === id
          ? { ...item, is_user_solved: 1 }
          : item
      )
    );
  };

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (error) return <div className={styles.container}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <PageTitle text="CHALLENGES" />
      </div>

      <div className={styles.sidebarWrapper}>
        <FilterPanel
          search={search}
          onSearchChange={setSearch}
          categories={categories}
          selectedCategory={category}
          onCategoryToggle={c => setCategory(prev => (prev === c ? null : c))}
          selectedDifficulty={difficulty}
          onDifficultySelect={setDifficulty}
          selectedStatus={status}
          onStatusChange={setStatus}
        />
      </div>

      <div className={styles.mainWrapper}>
        <ChallengeList items={filtered} onItemClick={setSelected} />
      </div>

      <ChallengeDetailModal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        onSolve={handleSolve}
        item={selected}
      />
    </div>
  );
}
