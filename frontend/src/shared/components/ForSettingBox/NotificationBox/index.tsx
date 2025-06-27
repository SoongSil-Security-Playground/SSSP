import styles from "./index.module.css";
import { useQuery } from "@tanstack/react-query";
import { GetAllNoticeSuccess } from "@/shared/types/forAPI/NoticeType";
import {
  AuthError,
  AuthValidateError,
} from "@/shared/types/forAPI/AuthErrorType";
import { notice_get_all } from "@/shared/hooks/api/useNotice";

import { dummyNotices } from "./dummyData";

export default function NotificationBox() {
  const { data: noti } = useQuery<GetAllNoticeSuccess>({
    queryKey: ["notice_get_all"],
    queryFn: () => notice_get_all(),
    staleTime: 5 * 1000,
  });

  return (
    <div className={styles.container}>
      {noti?.map((n) => (
        <div key={n.id} className={styles.noticeRow}>
          <div className={styles.info}>
            <span className={styles.title}>{n.title}</span>
            <span className={styles.date}>{n.created_at}</span>
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
