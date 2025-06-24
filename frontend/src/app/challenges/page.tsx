'use client';

import React, { useState, useMemo } from "react";
import { FilterPanel } from "@/shared/components/FilterPanel";
import { type ChallengeCardProps } from "@/shared/components/Card/ChallengeCard";
import { PageTitle } from "@/shared/components/Title";
import { ChallengeList } from "@/shared/components/List/ChallengeList";
import { ChallengeDetailModal } from "@/shared/components/Modal/ChallengeDetailModal";
import { type Category } from "@/shared/components/FilterPanel/CategoryFilter";
import styles from "./page.module.css"

export default function ChallengesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category | null>(null);
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [status, setStatus] = useState<'all' | 'solved' | 'unsolved'>('all');
  const [selected, setSelected] = useState<ChallengeCardProps | null>(null);

  const filtered = useMemo(() => {
    return dummyChallenges.filter(item => {
      if (search && !item.title.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (category && item.category !== category) return false;
      if (difficulty !== null && item.stars !== difficulty) return false;
      if (status !== 'all' && item.status !== status) return false;
      return true;
    });
  }, [search, category, difficulty, status]);

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <PageTitle text="CHALLENGES" />
      </div>

      <div className={styles.sidebarWrapper}>
        <FilterPanel
          search={search}
          onSearchChange={setSearch}
          selectedCategory={category}
          onCategoryToggle={c => setCategory((prev: any) => (prev === c ? null : c))}
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
        item={selected}
      />
    </div>
  );
}

const dummyChallenges: ChallengeCardProps[] = [
  {
    title: 'ShortDesc',
    stars: 1,
    points: 100,
    category: 'misc',
    description: '짧은 설명',
    status: 'unsolved',
  },
  {
    title: 'MediumDesc',
    stars: 3,
    points: 250,
    category: 'rev',
    description: '이것은 두 줄 정도로 감싸지는 중간 길이의 설명입니다.',
    status: 'solved',
  },
  {
    title: 'LongDesc',
    stars: 5,
    points: 500,
    category: 'crypto',
    description: '여기는 매우 긴 설명입니다. 카드 높이를 테스트하기 위해 여러 줄로 길게 작성됩니다. 텍스트가 고정된 높이를 넘을 때 어떻게 줄임표나 클램프 처리가 되는지 확인해 보세요.',
    status: 'unsolved',
  },
  {
    title: 'VeryLongDesc',
    stars: 2,
    points: 180,
    category: 'web',
    description: '이 설명은 훨씬 더 길어서, 카드 컴포넌트 내에서 최대 줄 수를 넘어서는 경우를 시뮬레이션합니다. 여러 문장으로 구성되어 있으며, 줄 바꿈과 텍스트 클램프가 정상 동작하는지 반드시 확인해야 합니다.',
    status: 'solved',
  },
  {
    title: 'SingleWord',
    stars: 4,
    points: 300,
    category: 'pwn',
    description: 'Supercalifragilisticexpialidocious',
    status: 'unsolved',
  },
];