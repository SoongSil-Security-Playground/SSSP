'use client';

import React, { useEffect, useState } from "react";
import { PageTitle } from "@/shared/components/Title";
import { notice_get_all } from "@/shared/hooks/api/useNotice";
import { DefaultNoticeContent } from "@/shared/types/forAPI/NoticeType";
import { NotificationList } from "@/shared/components/List/NotificationList";
import styles from './page.module.css';

export default function NotificationsPage() {
  const [items, setItems] = useState<DefaultNoticeContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    notice_get_all()
    .then((data)=>setItems(data))
    .catch((err: any) => setError(err.message))
    .finally(() => setLoading(false));
  }, [])

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (error)   return <div className={styles.container}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <PageTitle text="NOTIFICATION" />
      </div>
      <div className={styles.mainWrapper}>
        <NotificationList items={items} />
      </div>
    </div>
  );
}
