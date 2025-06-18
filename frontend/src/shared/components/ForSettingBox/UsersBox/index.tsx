import styles from "@/shared/components/ForSettingBox/UsersBox/index.module.css";

import { dummyUsers } from "./dummyData";

export default function UsersBox() {
  return (
    <div className={styles.container}>
      {dummyUsers.map((user) => (
        <div key={user.id} className={styles.userRow}>
          <div className={styles.userInfo}>
            <span className={styles.username}>{user.name}</span>
            <span className={styles.email}>{user.email}</span>
          </div>
          <div className={styles.actions}>
            <button className={styles.adminBtn}>ADMIN</button>
            <button className={styles.deleteBtn}>DELETE</button>
          </div>
        </div>
      ))}
    </div>
  );
}
