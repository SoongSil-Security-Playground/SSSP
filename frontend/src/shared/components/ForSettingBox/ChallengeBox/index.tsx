"use client";

import { useQuery } from "@tanstack/react-query";

import styles from "./index.module.css";
import { dummyRows } from "./dummyData";
import { GetAllChallengeSuccess } from "@/shared/types/forAPI/ChallengeType";
import {
  AuthError,
  AuthValidateError,
} from "@/shared/types/forAPI/AuthErrorType";
import { challenge_get_all } from "@/shared/hooks/api/useChallenge";

export default function ChallengeBox() {
  // const { data } = useQuery<
  //   GetAllChallengeSuccess | AuthError | AuthValidateError
  // >({
  //   queryKey: ["Challenge_Get_All"],
  //   queryFn: () => challenge_get_all(),
  //   staleTime: 5 * 1000,
  // });

  // console.log(data);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            <th className={`${styles.headerCell} ${styles.checkboxCell}`}>
              <input type="checkbox" className={styles.headerCheckbox} />
            </th>
            <th className={`${styles.headerCell} ${styles.titleCell}`}>
              Title
            </th>
            <th className={`${styles.headerCell} ${styles.scoreCell}`}>
              Score
            </th>
            <th className={`${styles.headerCell} ${styles.updatedCell}`}>
              Updated At
            </th>
            <th className={`${styles.headerCell} ${styles.categoryCell}`}>
              Category
            </th>
            <th className={`${styles.headerCell} ${styles.actionsCell}`}></th>
          </tr>
        </thead>
        <tbody>
          {dummyRows.map((row) => {
            return (
              <tr key={row.id} className={`${styles.row}`}>
                <td
                  className={`${styles.checkboxBodycell} ${styles.checkboxCell}`}
                >
                  <input type="checkbox" className={styles.customCheckbox} />
                </td>
                <td className={`${styles.titleBodyCell} ${styles.title}`}>
                  {row.title}
                </td>
                <td className={styles.scoreBodyCell}>{row.score}</td>
                <td className={styles.updatedBodyCell}>{row.updatedAt}</td>
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
