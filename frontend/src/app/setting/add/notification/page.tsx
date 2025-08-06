import styles from "./page.module.css";
import { AddNotice } from "@/shared/components/Add/Notification";

export default function AddNotification() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>NOTIFICATION</h1>
      <p className={styles.subtitle}>
        The flag’s format is <span className={styles.code}>SSSP()</span>!
      </p>

      <AddNotice />
    </div>
  );
}
