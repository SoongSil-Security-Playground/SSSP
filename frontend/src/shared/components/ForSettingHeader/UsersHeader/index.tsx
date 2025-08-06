"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";
import { GetUserListSuccess } from "@/shared/types/forAPI/UserType";

type UsersHeaderProps = {
  data: GetUserListSuccess;
  searchString: string;
  handleSearchChange: (value: string) => void;
};

export default function UsersHeader({
  data: users,
  searchString,
  handleSearchChange,
}: UsersHeaderProps) {
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
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <input
          ref={inputRef}
          type="text"
          value={localSearch}
          className={styles.searchInput}
          onChange={(e) => setLocalSearch(e.target.value)}
          onBlur={triggerSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter") triggerSearch();
          }}
          placeholder="Search users..."
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
    </div>
  );
}
