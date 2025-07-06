"use client";

import { useEffect, useState } from "react";
import { SolveLogSuccess } from "@/shared/types/forAPI/ChallengeType";
import Image from "next/image";
import styles from "./index.module.css";
import arrowDown from "/public/Table/Tags/arrow-down.svg";

export interface Submission {
  id: number;
  userName: string;
  challengeName: string;
  submitTime: string;
  solvedAt: string;
  correct: boolean;
}

type SortKey = keyof Pick<
  Submission,
  "userName" | "challengeName" | "submitTime" | "solvedAt" | "correct"
>;

interface SubmissionProps {
  data: SolveLogSuccess;
  searchString: string;
  selectedIds: number[];
  handleSelectChange: (ids: number[]) => void;
}

const columnLabels: Record<SortKey, string> = {
  userName: "User Name",
  challengeName: "Challenge Name",
  submitTime: "Submit Time",
  solvedAt: "Solved At",
  correct: "Correct/Incorrect",
};

const cellClassMap: Record<SortKey, string> = {
  userName: styles.userNameCell,
  challengeName: styles.challengeCell,
  submitTime: styles.submitCell,
  solvedAt: styles.solvedCell,
  correct: styles.correctCell,
};

// 데이터에 solvedat, submitTime이 없어서 일단 강제로 생성
const mapLogToSubmissions = (log: SolveLogSuccess): Submission[] => {
  const now = Date.now();

  const randomDate = () => {
    const past = now - Math.random() * 7 * 24 * 60 * 60 * 1000;
    const d = new Date(past);
    return d.toISOString().slice(0, 19).replace("T", " ");
  };

  if (!Array.isArray(log)) return [];

  return log.map((entry, idx) => {
    const submitTime = randomDate();
    const solvedAt =
      entry.comment !== "Wrong Flag!"
        ? new Date(
            new Date(submitTime).getTime() + Math.random() * 60 * 60 * 1000
          )
            .toISOString()
            .slice(0, 19)
            .replace("T", " ")
        : "";

    return {
      id: idx,
      userName: entry.username,
      challengeName: entry.chall,
      submitTime,
      solvedAt,
      correct: entry.comment !== "Wrong Flag!",
    };
  });
};

const sortedRow = (
  chall: Submission[],
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

export default function SubmissionBox({
  data: log,
  searchString,
  selectedIds,
  handleSelectChange,
}: SubmissionProps) {
  const [sortedRows, setSortedRows] = useState<Submission[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("userName");
  const [ascending, setAscending] = useState(true);

  const [submissions] = useState<Submission[]>(() => mapLogToSubmissions(log));

  useEffect(() => {
    const filtered = submissions.filter((item) => {
      const q = searchString.toLowerCase();
      return (
        item.userName.toLowerCase().includes(q) ||
        item.challengeName.toLowerCase().includes(q)
      );
    });

    setSortedRows(sortedRow(filtered, ascending, sortKey));
  }, []);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) setAscending((p) => !p);
    else {
      setSortKey(key);
      setAscending(true);
    }
  };

  const allSelected =
    submissions &&
    submissions!.length > 0 &&
    selectedIds.length === submissions.length;

  const toggleAll = () => {
    if (allSelected) {
      handleSelectChange([]);
    } else {
      handleSelectChange(submissions.map((item) => item.id));
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
