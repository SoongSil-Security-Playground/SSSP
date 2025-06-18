import styles from "./index.module.css";

import { dummyRows } from "./dummyData";

export default function ChallengeBox() {
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
