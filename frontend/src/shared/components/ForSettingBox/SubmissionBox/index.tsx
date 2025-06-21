"use client";

import { useState } from "react";
import styles from "./index.module.css";
import { dummySubmissions, Submission } from "./dummyData";

export default function SubmissionBox() {
  // 선택된 row들의 id를 저장
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

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
            <th className={`${styles.headerCell} ${styles.userNameCell}`}>
              User Name
            </th>
            <th className={`${styles.headerCell} ${styles.challengeCell}`}>
              Challenge Name
            </th>
            <th className={`${styles.headerCell} ${styles.submitCell}`}>
              Submit
            </th>
            <th className={`${styles.headerCell} ${styles.solvedCell}`}>
              Solved At
            </th>
            <th className={`${styles.headerCell} ${styles.correctCell}`}>
              Correct/Incorrect
            </th>
            <th className={`${styles.headerCell} ${styles.actionsCell}`}></th>
          </tr>
        </thead>
        <tbody>
          {dummySubmissions.map((s: Submission) => {
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
