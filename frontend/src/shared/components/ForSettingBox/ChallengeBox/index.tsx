"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import styles from "./index.module.css";
import { dummyChallenges, Challenge } from "./dummyData";
import arrowDown from "/public/Table/Tags/arrow-down.svg";

type SortKey = keyof Pick<
  Challenge,
  "name" | "points" | "created_at" | "category"
>;

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

export default function ChallengeBox() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [ascending, setAscending] = useState(true);

  const sortedRows = useMemo(() => {
    return [...dummyChallenges].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return ascending ? aVal - bVal : bVal - aVal;
      }
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      return ascending ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
  }, [sortKey, ascending]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setAscending((p) => !p);
    } else {
      setSortKey(key);
      setAscending(true);
    }
  };

  const allSelected =
    dummyChallenges.length > 0 && selectedIds.length === dummyChallenges.length;

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(dummyChallenges.map((r) => r.id));
    }
  };

  const toggleOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
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
          {sortedRows.map((row) => {
            const isChecked = selectedIds.includes(row.id);
            return (
              <tr key={row.id} className={styles.row}>
                <td
                  className={`${styles.checkboxBodycell} ${styles.checkboxCell}`}
                >
                  <input
                    type="checkbox"
                    className={styles.customCheckbox}
                    checked={isChecked}
                    onChange={() => toggleOne(row.id)}
                  />
                </td>
                <td className={`${styles.titleBodyCell} ${styles.title}`}>
                  {row.name}
                </td>
                <td className={styles.scoreBodyCell}>{row.points}</td>
                <td className={styles.updatedBodyCell}>{row.created_at}</td>
                <td className={styles.categoryBodyCell}>
                  <span className={styles.badge}>{row.category}</span>
                </td>
                <td className={`${styles.cell} ${styles.actionsCell}`}>⋮</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
