"use client";

import { useEffect, useState, Fragment } from "react";
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
  user_flag: string;
  real_flag: string;
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
      user_flag: entry.user_flag,
      real_flag: entry.real_flag,
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
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [submissions] = useState<Submission[]>(() => mapLogToSubmissions(log));

  const allSelected =
    submissions &&
    submissions!.length > 0 &&
    selectedIds.length === submissions.length;

  useEffect(() => {
    const q = searchString.toLowerCase().trim();

    const filtered = q
      ? submissions.filter(
          (item) =>
            item.userName.toLowerCase().includes(q) ||
            item.challengeName.toLowerCase().includes(q)
        )
      : submissions;

    setSortedRows(sortedRow(filtered, ascending, sortKey));
  }, [searchString, submissions, ascending, sortKey]);

  const handleRowClick = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleSort = (key: SortKey) => {
    if (key === sortKey) setAscending((p) => !p);
    else {
      setSortKey(key);
      setAscending(true);
    }
  };

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
            const isExpanded = expandedId === s.id;

            return (
              <Fragment key={s.id}>
                <tr
                  className={`${styles.row} ${
                    isExpanded ? styles.selected : ""
                  }`}
                  onClick={() => handleRowClick(s.id)}
                >
                  <td
                    className={`${styles.cell} ${styles.checkboxBodyCell} ${styles.checkboxCell}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      className={styles.customCheckbox}
                      checked={isChecked}
                      onChange={() => toggleOne(s.id)}
                    />
                  </td>
                  <td className={`${styles.cell} ${styles.userNameCell}`}>
                    {s.userName}
                  </td>
                  <td className={`${styles.cell} ${styles.challengeCell}`}>
                    {s.challengeName}
                  </td>
                  <td className={`${styles.cell} ${styles.submitCell}`}>
                    {s.submitTime}
                  </td>
                  <td className={`${styles.cell} ${styles.solvedCell}`}>
                    {s.solvedAt}
                  </td>
                  <td className={`${styles.cell} ${styles.correctCell}`}>
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

                {isExpanded && (
                  <tr className={styles.expandedRow}>
                    <td colSpan={7} className={styles.detailCell}>
                      <div className={styles.userFlag}>
                        User Flag: {s.user_flag}
                      </div>
                      <div className={styles.realFlag}>
                        Real Flag: {s.real_flag}
                      </div>
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
