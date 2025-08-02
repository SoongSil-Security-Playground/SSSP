"use client";

import { useState, useEffect, Fragment } from "react";
import Image from "next/image";

import styles from "./index.module.css";
import arrowDown from "/public/Table/Tags/arrow-down.svg";
import { GetAllChallengeSuccess } from "@/shared/types/forAPI/ChallengeType";

export interface Challenge {
  name: string;
  description: string;
  points: number;
  category: string;
  id: number;
  created_at: string;
  file_path: string;
  is_user_solved: number;
  solve_count: number;
  level: string;
  flag: string;
}

type SortKey = keyof Pick<
  Challenge,
  "name" | "points" | "created_at" | "category"
>;

interface ChallengeBoxProps {
  data: GetAllChallengeSuccess;
  searchString: string;
  selectedIds: number[];
  handleSelectChange: (ids: number[]) => void;
}

const columnLabels: Record<SortKey, string> = {
  name: "Name",
  points: "Points",
  created_at: "Created At",
  category: "Category",
};

const cellClassMap: Record<SortKey, string> = {
  name: styles.titleCell,
  points: styles.scoreCell,
  created_at: styles.updatedCell,
  category: styles.categoryCell,
};

const sortedRow = (
  chall: GetAllChallengeSuccess,
  ascending: boolean,
  sortKey: SortKey
) => {
  if (!Array.isArray(chall)) {
    return [];
  }

  return [...chall!].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === "number" && typeof bVal === "number") {
      return ascending ? aVal - bVal : bVal - aVal;
    }
    const aStr = String(aVal).toLowerCase();
    const bStr = String(bVal).toLowerCase();
    return ascending ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
  });
};

export default function ChallengeBox({
  data: chall,
  searchString,
  selectedIds,
  handleSelectChange,
}: ChallengeBoxProps) {
  const [sortedRows, setSortedRows] = useState<GetAllChallengeSuccess>(chall);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [ascending, setAscending] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredData = chall.filter((item: Challenge) =>
    item.name.toLowerCase().includes(searchString.toLowerCase())
  );

  const allSelected =
    chall && chall!.length > 0 && selectedIds.length === chall.length;

  useEffect(() => {
    const filtered = sortedRows.filter((item: Challenge) =>
      item.name.toLowerCase().includes(searchString.toLowerCase())
    );
    setSortedRows(sortedRow(filtered, ascending, sortKey));
  }, [chall, searchString, sortKey, ascending]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setAscending((p) => !p);
    } else {
      setSortKey(key);
      setAscending(true);
    }
  };

  const handleRowClick = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const toggleAll = () => {
    if (allSelected) {
      handleSelectChange([]);
    } else {
      handleSelectChange(sortedRows.map((item: Challenge) => item.id));
    }
  };

  const toggleOne = (id: number) => {
    const newSelected = selectedIds.includes(id)
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id];
    handleSelectChange(newSelected);
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            <th className={`${styles.headerCell} ${styles.checkboxCell}`}>
              <input
                type="checkbox"
                className={styles.headerCheckbox}
                checked={allSelected}
                onChange={toggleAll}
              />
            </th>

            {(["name", "points", "created_at", "category"] as SortKey[]).map(
              (key) => (
                <th
                  key={key}
                  className={`${styles.headerCell} ${cellClassMap[key]}`}
                  onClick={() => handleSort(key)}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  <span className="flex items-center">
                    {columnLabels[key]}
                    <Image
                      src={arrowDown}
                      alt=""
                      width={12}
                      height={12}
                      className={[
                        styles.arrowIcon,
                        sortKey === key && !ascending
                          ? styles.arrowIconRotated
                          : "",
                        sortKey !== key
                          ? styles.arrowIconDimmed
                          : styles.arrowIconVisible,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    />
                  </span>
                </th>
              )
            )}

            <th className={`${styles.headerCell} ${styles.actionsCell}`}></th>
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row: Challenge) => {
            const isChecked = selectedIds.includes(row.id);
            const isExpanded = expandedId === row.id;
            return (
              <Fragment key={row.id}>
                <tr
                  className={`${styles.row} ${
                    isExpanded ? styles.selected : ""
                  }`}
                  onClick={() => handleRowClick(row.id)}
                >
                  <td
                    className={`${styles.checkboxBodyCell} ${styles.checkboxCell}`}
                  >
                    <input
                      type="checkbox"
                      className={styles.customCheckbox}
                      checked={isChecked}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleOne(row.id);
                      }}
                    />
                  </td>
                  <td className={`${styles.titleBodyCell} ${styles.title}`}>
                    {row.name}
                  </td>
                  <td className={styles.scoreBodyCell}>{row.points}</td>
                  <td className={styles.updatedBodyCell}>{row.created_at}</td>
                  <td className={styles.categoryBodyCell}>
                    <div className={styles.categoryArrange}>
                      <span className={styles.badge}>{row.category}</span>
                    </div>
                  </td>
                  <td className={`${styles.actionsCell}`}>⋮</td>
                </tr>

                {isExpanded && (
                  <tr className={styles.expandedRow}>
                    <td colSpan={6} className={styles.detailCell}>
                      <div className={styles.detailGrid}>
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Solved?</span>
                          <span className={styles.detailValue}>
                            {row.is_user_solved ? "✅" : "❌"}
                          </span>
                        </div>
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>
                            Solve Count
                          </span>
                          <span className={styles.detailValue}>
                            {row.solve_count}
                          </span>
                        </div>
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Level</span>
                          <span className={styles.detailValue}>
                            {row.level}
                          </span>
                        </div>
                        <div className={styles.detailItemFull}>
                          <span className={styles.detailLabel}>Flag</span>
                          <code className={styles.detailFlag}>{row.flag}</code>
                        </div>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Description</span>
                        <span className={styles.detailValue}>
                          {row.description}
                        </span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>File:</span>
                        {row.file_path ? (
                          <a
                            href={row.file_path}
                            download
                            className={styles.downloadLink}
                          >
                            {row.file_path.split("/").pop()}
                          </a>
                        ) : (
                          "No file provided"
                        )}
                      </div>{" "}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
