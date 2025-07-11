import React from "react";
import { PageTitle } from "@/shared/components/Title";
import { NotificationList } from "@/shared/components/List/NotificationList";
import styles from './page.module.css';

export default function NotificationsPage() {
  return (
    <div className={styles.container}>
      <PageTitle text="NOTIFICATION" />
      <div className={styles.mainWrapper}>
        <NotificationList />
      </div>
    </div>
  );
}
