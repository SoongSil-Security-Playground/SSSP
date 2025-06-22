"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import styles from "./index.module.css";
import { dummySubmissions, Submission } from "./dummyData";
import arrowDown from "/public/Table/Tags/arrow-down.svg";

type SortKey = keyof Pick<
  Submission,
  "userName" | "challengeName" | "submitTime" | "solvedAt" | "correct"
>;

const columnLabels: Record<SortKey, string> = {
  userName: "User Name",
  challengeName: "Challenge Name",
  submitTime: "Submit Time",
  solvedAt: "Solved At",
  correct: "Corerct/Incorrect",
};

const cellClassMap: Record<SortKey, string> = {
  userName: styles.userNameCell,
  challengeName: styles.challengeCell,
  submitTime: styles.submitCell,
  solvedAt: styles.solvedCell,
  correct: styles.correctCell,
};

export default function SubmissionBox() {
  // 선택된 row들의 id를 저장
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [sortKey, setSortKey] = useState<SortKey>("userName");
  const [ascending, setAscending] = useState(true);

  const allSelected =
    dummySubmissions.length > 0 &&
    selectedIds.length === dummySubmissions.length;

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(dummySubmissions.map((r) => r.id));
    }
  };

  const toggleOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const sortedRows = useMemo(() => {
    return [...dummySubmissions].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

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
            {(
              [
                "userName",
                "challengeName",
                "submitTime",
                "solvedAt",
                "correct",
              ] as SortKey[]
            ).map((key) => (
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
            ))}

            <th className={`${styles.headerCell} ${styles.actionsCell}`}></th>
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((s: Submission) => {
            const isChecked = selectedIds.includes(s.id);

            return (
              <tr key={s.id} className={styles.row}>
                <td
                  className={`${styles.cell} ${styles.checkboxBodyCell} ${styles.checkboxCell}`}
                >
                  <input
                    type="checkbox"
                    className={styles.customCheckbox}
                    checked={isChecked}
                    onChange={() => toggleOne(s.id)}
                  />
                </td>
                <td
                  className={`${styles.cell} ${styles.userNameBodyCell} ${styles.userNameCell}`}
                >
                  {s.userName}
                </td>
                <td
                  className={`${styles.cell} ${styles.challengeBodyCell} ${styles.challengeCell}`}
                >
                  {s.challengeName}
                </td>
                <td
                  className={`${styles.cell} ${styles.submitBodyCell} ${styles.submitCell}`}
                >
                  {s.submitTime}
                </td>
                <td
                  className={`${styles.cell} ${styles.solvedBodyCell} ${styles.solvedCell}`}
                >
                  {s.solvedAt}
                </td>
                <td
                  className={`${styles.cell} ${styles.correctBodyCell} ${styles.correctCell}`}
                >
                  <span
                    className={
                      s.correct ? styles.badgeCorrect : styles.badgeIncorrect
                    }
                  >
                    {s.correct ? "correct" : "incorrect"}
                  </span>
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
