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

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = searchString;
    }
  }, [searchString]);

  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <svg
          className={styles.searchIcon}
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={localSearch}
          className={styles.searchInput}
          onChange={(e) => setLocalSearch(e.target.value)}
          onBlur={() => handleSearchChange(localSearch)}
          placeholder="Search users..."
        />
      </div>
    </div>
  );
}
