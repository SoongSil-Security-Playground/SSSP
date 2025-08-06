"use client";

import { useEffect, useState, Fragment } from "react";
import Image from "next/image";
import styles from "./index.module.css";
import arrowDown from "/public/Table/Tags/arrow-down.svg";
import type { SubmissionType } from "@/shared/types/forAPI/SubmissionType";

type SortKey =
  | "username"
  | "challenge_name"
  | "submit_time"
  | "solvedAt"
  | "status";

interface SubmissionProps {
  data: SubmissionType[];
  searchString: string;
  selectedIds: number[];
  handleSelectChange: (ids: number[]) => void;
}

const columnLabels: Record<SortKey, string> = {
  username: "User Name",
  challenge_name: "Challenge Name",
  submit_time: "Submit Time",
  solvedAt: "Solved At",
  status: "Correct/Incorrect",
};

const cellClassMap: Record<SortKey, string> = {
  username: styles.userNameCell,
  challenge_name: styles.challengeCell,
  submit_time: styles.submitCell,
  solvedAt: styles.solvedCell,
  status: styles.correctCell,
};

const sortedRow = (
  chall: SubmissionType[],
  ascending: boolean,
  sortKey: SortKey
) => {
  return [...chall].sort((a, b) => {
    const aVal =
      sortKey === "solvedAt"
        ? a.status === 0
          ? a.submit_time
          : ""
        : a[sortKey];
    const bVal =
      sortKey === "solvedAt"
        ? b.status === 0
          ? b.submit_time
          : ""
        : b[sortKey];

    const aStr = String(aVal).toLowerCase();
    const bStr = String(bVal).toLowerCase();
    return ascending ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
  });
};

export default function SubmissionBox({
  data,
  searchString,
  selectedIds,
  handleSelectChange,
}: SubmissionProps) {
  const [sortedRows, setSortedRows] = useState<SubmissionType[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("username");
  const [ascending, setAscending] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const allSelected = data.length > 0 && selectedIds.length === data.length;

  useEffect(() => {
    const q = searchString.toLowerCase().trim();
    const filtered = q
      ? data.filter(
          (item) =>
            String(item.user_id).includes(q) ||
            String(item.challenge_id).includes(q)
        )
      : data;

    setSortedRows(sortedRow(filtered, ascending, sortKey));
  }, [searchString, data, ascending, sortKey]);

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
      handleSelectChange(data.map((item) => item.id));
    }
  };

  const toggleOne = (id: number) => {
    const newSelected = selectedIds.includes(id)
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id];
    handleSelectChange(newSelected);
  };

  const getCorrectStatus = (status: number) =>
    status === 0 ? "correct" : status === 1 ? "incorrect" : "unknown";

  const getCorrectClass = (status: number) =>
    status === 0
      ? styles.badgeCorrect
      : status === 1
      ? styles.badgeIncorrect
      : styles.badgeUnknown;

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
                "username",
                "challenge_name",
                "submit_time",
                "solvedAt",
                "status",
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
          {sortedRows.map((s) => {
            const isChecked = selectedIds.includes(s.id);
            const isExpanded = expandedId === s.id;
            const submitTime = s.submit_time.replace("T", " ").slice(0, 19);
            const solvedAt = s.status === 0 ? submitTime : "";

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
                  <td className={styles.userNameCell}>{s.username}</td>
                  <td className={styles.challengeCell}>{s.challenge_name}</td>
                  <td className={styles.submitCell}>{submitTime}</td>
                  <td className={styles.solvedCell}>{solvedAt}</td>
                  <td className={styles.correctCell}>
                    <span className={getCorrectClass(s.status)}>
                      {getCorrectStatus(s.status)}
                    </span>
                  </td>
                  <td className={`${styles.cell} ${styles.actionsCell}`}>⋮</td>
                </tr>

                {isExpanded && (
                  <tr className={styles.expandedRow}>
                    <td colSpan={7} className={styles.detailCell}>
                      <div className={styles.userFlag}>
                        User Flag: {s.submitted_flag}
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
