import styles from "./index.module.css";
import { dummyNotices } from "./dummyData";

export default function NotificationBox() {
  return (
    <div className={styles.container}>
      {dummyNotices.map((n) => (
        <div key={n.id} className={styles.noticeRow}>
          <div className={styles.info}>
            <span className={styles.title}>{n.title}</span>
            <span className={styles.date}>{n.date}</span>
          </div>
          <div className={styles.actions}>
            <button className={styles.button}>EDIT</button>
            <button className={`${styles.button} ${styles.delete}`}>
              DELETE
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
