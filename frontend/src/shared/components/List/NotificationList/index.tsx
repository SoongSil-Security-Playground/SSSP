'use client';

import React, { type FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { NotificationCard } from "../../Card/NotificationCard";
import { GetNoticeListSuccess } from "@/shared/types/forAPI/NoticeType";
import { notice_get_all } from "@/shared/hooks/api/useNotice";
import styles from './index.module.css'

export const NotificationList = () => {
  const { data: items = [], isLoading, isError, error } =
    useQuery<GetNoticeListSuccess, Error>({
      queryKey: ['notices'],
      queryFn: notice_get_all,
    }
  );

  if (isLoading) {
    return <div className={styles.container}>Loading...</div>;
  }
  if (isError) {
    return <div className={styles.container}>Error: {error?.message}</div>;
  }

  return (
    <div className={styles.gridContainer}>
      {items.map((n) => (
        <div key={n.id} className={styles.cardWrapper}>
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