import React, { type FC } from "react";
import { NotificationCard } from "../../Card/NotificationCard";
import { DefaultNoticeContent } from "@/shared/types/forAPI/NoticeType";
import styles from './index.module.css'

export interface NotificationListProps {
  items: DefaultNoticeContent[];
}

export const NotificationList: FC<NotificationListProps> = ({ items }) => {
  return (
    <div className={styles.gridContainer}>
      {items.map((n) => (
        <div className={styles.cardWrapper}>
          <NotificationCard
            key={n.id}
            title={n.title}
            content={n.content}
            createdAt={n.created_at}
          />
        </div>
      ))}
    </div>
  );
}