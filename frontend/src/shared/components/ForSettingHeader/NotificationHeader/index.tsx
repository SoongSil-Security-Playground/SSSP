"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "@/shared/components/ForSettingHeader/ChallengeHeader/index.module.css";
import { AddButton } from "../../Add/Button";
import { GetNoticeListSuccess } from "@/shared/types/forAPI/NoticeType";

type ActionBarProps = {
  data: GetNoticeListSuccess;
  searchString: string;
  handleSearchChange: (value: string) => void;
};

export default function NotificationHeader({
  data: noti,
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
          onKeyDown={(e) => {
            if (e.key === "Enter") triggerSearch();
          }}
          placeholder="Search notification..."
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
          </svg>{" "}
        </button>
      </div>
      <AddButton caseName="Notification" />
    </div>
  );
}
