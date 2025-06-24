import React from "react";
import { NotificationCard, type NotificationCardProps } from "../../Card/NotificationCard";
import styles from './index.module.css'

export interface NotificationListProps {
  items: Array<NotificationCardProps & { id: string | number }>;
}

export const NotificationList: React.FC<NotificationListProps> = ({ items }) => {
  return (
    <div className={styles.list}>
      {items.map((n) => (
        <NotificationCard
          key={n.id}
          title={n.title}
          content={n.content}
          createdAt={n.createdAt}
          className={styles.card}
        />
      ))}
    </div>
  );
}