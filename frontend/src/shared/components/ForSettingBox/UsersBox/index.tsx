import styles from "@/shared/components/ForSettingBox/UsersBox/index.module.css";

import { useQuery } from "@tanstack/react-query";
import { UserListSuccess } from "@/shared/types/forAPI/UserType";
import { user_list } from "@/shared/hooks/api/useUser";

export default function UsersBox() {
  const { data: users } = useQuery<UserListSuccess>({
    queryKey: ["user_get_all"],
    queryFn: () => user_list(),
    staleTime: 5 * 1000,
  });

  return (
    <div className={styles.container}>
      {users?.map((user) => (
        <div key={user.id} className={styles.userRow}>
          <div className={styles.userInfo}>
            <span className={styles.username}>{user.username}</span>
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
