"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./index.module.css";
import { GetNoticeListSuccess } from "@/shared/types/forAPI/NoticeType";
import {
  admin_notice_update,
  admin_notice_delete,
} from "@/shared/hooks/api/useNotice";
import {
  UpdateNoticeSuccess,
  DeleteNoticeSuccess,
} from "@/shared/types/forAPI/NoticeType";

interface NotificationBoxProps {
  data: GetNoticeListSuccess;
  searchString: string;
}

export default function NotificationBox({
  data: noti,
  searchString,
}: NotificationBoxProps) {
  const router = useRouter();

  const [sortedRows, setSortedRows] = useState<GetNoticeListSuccess>([]);
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const { mutate: deleteNotification } = useMutation({
    mutationFn: (selectedIds: number) => admin_notice_delete(selectedIds),
    onSuccess: () => router.refresh(),
  });

  const { mutate: updateNotification } = useMutation({
    mutationFn: ({
      selectIds,
      title,
      content,
    }: {
      selectIds: number;
      title: string;
      content: string;
    }) => admin_notice_update(selectIds, title, content),
    onSuccess: () => router.refresh(),
  });

  useEffect(() => {
    const filtered = noti.filter((item: GetNoticeListSuccess[number]) => {
      const q = searchString.toLowerCase();
      return item.title.toLowerCase().includes(q);
    });

    setSortedRows(filtered);
  }, []);

  const handleDeleteClick = (selectedIds: number) => {
    deleteNotification(selectedIds);
  };

  const toggleExpand = (id: number) => {
    setExpandedUserId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.container}>
      {sortedRows?.map((n) => (
        <div key={n.id}>
          <div
            onClick={() => toggleExpand(n.id)}
            className={`${styles.noticeRow} ${
              expandedUserId === n.id ? styles.active : ""
            }`}
          >
            <div className={styles.info}>
              <span className={styles.title}>{n.title}</span>
              <span className={styles.date}>{n.created_at}</span>
            </div>
            <div className={styles.actions}>
              <button className={styles.button}>EDIT</button>
              <button
                onClick={() => handleDeleteClick(n.id)}
                className={`${styles.button} ${styles.delete}`}
              >
                DELETE
              </button>
            </div>
          </div>
          {expandedUserId === n.id && (
            <div className={styles.userContent}>
              <p className={styles.contentText}>
                {n.content || "No additional info."}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
