"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "@/shared/components/ForSettingHeader/SubmissionHeader/index.module.css";
import { SolveLogSuccess } from "@/shared/types/forAPI/ChallengeType";
import { DeleteButton } from "../../DeleteButton";

type ActionBarProps = {
  data: SolveLogSuccess;
  selectedIds: number[];
  searchString: string;
  handleSearchChange: (value: string) => void;
};

export default function SubmissionHeader({
  data: submission,
  selectedIds,
  searchString,
  handleSearchChange,
}: ActionBarProps) {
  const [localSearch, setLocalSearch] = useState(searchString);
  const inputRef = useRef<HTMLInputElement>(null);

  const triggerSearch = () => {
    handleSearchChange(localSearch);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = searchString;
    }
  }, [searchString]);

  return (
    <div className={styles.toolbar}>
      <div className={styles.searchContainer}>
        <input
          ref={inputRef}
          type="text"
          value={localSearch}
          className={styles.searchInput}
          onChange={(e) => setLocalSearch(e.target.value)}
          onBlur={triggerSearch}
          placeholder="Search submission..."
          onKeyDown={(e) => {
            if (e.key === "Enter") triggerSearch();
          }}
        />
        <button onClick={triggerSearch} className={styles.searchButton}>
          <svg
            className={styles.searchIcon}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#888"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
      <DeleteButton selectedIds={selectedIds} caseName={"Submission"} />
    </div>
  );
}
