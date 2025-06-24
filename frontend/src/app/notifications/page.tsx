import React from "react";
import { PageTitle } from "@/shared/components/Title";
import { NotificationList, type NotificationListProps } from "@/shared/components/List/NotificationList";
import styles from './page.module.css';

export default function NotificationsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <PageTitle text="NOTIFICATION" />
      </div>

      <div className={styles.listWrapper}>
        <NotificationList items={dummyNotifications} />
      </div>
    </div>
  );
}

const dummyNotifications: NotificationListProps["items"] = [
  {
    id: 1,
    title: "WELCOME",
    content: "Welcome to the world of SSSP! 여기는 알림 페이지입니다.",
    createdAt: "2025.06.20 20:07",
  },
  {
    id: 2,
    title: "UPDATE",
    content:
      "시스템이 업데이트되었습니다. 페이지를 새로고침 해주세요.",
    createdAt: "2025.06.21 09:30",
  },
  {
    id: 3,
    title: "REMINDER",
    content:
      "구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! ",
    createdAt: "2025.06.22 14:45",
  },
  {
    id: 4,
    title: "REMINDER",
    content:
      "구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! ",
    createdAt: "2025.06.22 14:45",
  },
  {
    id: 5,
    title: "UPDATE",
    content:
      "시스템이 업데이트되었습니다. 페이지를 새로고침 해주세요.시스템이 업데이트되었습니다. 페이지를 새로고침 해주세요.",
    createdAt: "2025.06.21 09:30",
  },
  {
    id: 6,
    title: "WELCOME",
    content: "Welcome to the world of SSSP! 여기는 알림 페이지입니다.",
    createdAt: "2025.06.20 20:07",
  },
  {
    id: 7,
    title: "UPDATE",
    content:
      "시스템이 업데이트되었습니다. 페이지를 새로고침 해주세요.",
    createdAt: "2025.06.21 09:30",
  },
  {
    id: 8,
    title: "REMINDER",
    content:
      "구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! ",
    createdAt: "2025.06.22 14:45",
  },
  {
    id: 9,
    title: "REMINDER",
    content:
      "구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! 구독 기간이 곧 만료됩니다. 갱신을 잊지 마세요! ",
    createdAt: "2025.06.22 14:45",
  },
  {
    id: 10,
    title: "UPDATE",
    content:
      "시스템이 업데이트되었습니다. 페이지를 새로고침 해주세요.시스템이 업데이트되었습니다. 페이지를 새로고침 해주세요.",
    createdAt: "2025.06.21 09:30",
  },
];