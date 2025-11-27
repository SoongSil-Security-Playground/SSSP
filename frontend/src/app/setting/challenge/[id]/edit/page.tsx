import { EditChall } from "@/shared/components/Edit/EditChall";
import styles from "./page.module.css";

export default function EditPage({ params }: { params: { id: string } }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Challenge</h1>
      <p className={styles.subtitle}>
        The flag’s format is <span className={styles.code}>SSSP()</span>!
      </p>

      <EditChall />
    </div>
  );
}
