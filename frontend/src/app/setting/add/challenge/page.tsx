import styles from "./page.module.css";
import { AddChall } from "@/shared/components/Add/Challenge";

export default function AddChallenge() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Challenge</h1>
      <p className={styles.subtitle}>
        The flag’s format is <span className={styles.code}>SSSP()</span>!
      </p>

      <AddChall />
    </div>
  );
}
