"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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
  const [sortedRows, setSortedRows] = useState<GetNoticeListSuccess>([]);
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [pendingExpandId, setPendingExpandId] = useState<number | null>(null);

  const { mutate: deleteNotification } = useMutation({
    mutationFn: (selectedId: number) => admin_notice_delete(selectedId),
    onSuccess: () => {
      alert("삭제 성공!");
      window.location.href = "/setting?category=Notification";
    },
  });

  const { mutate: updateNotification } = useMutation({
    mutationFn: ({
      selectId,
      title,
      content,
    }: {
      selectId: number;
      title: string;
      content: string;
    }) => admin_notice_update(selectId, title, content),
    onSuccess: () => {
      alert("수정 성공!");
      window.location.href = "/setting?category=Notification";
    },
  });

  useEffect(() => {
    const filtered = noti.filter((item) =>
      item.title.toLowerCase().includes(searchString.toLowerCase())
    );
    setSortedRows(filtered);
  }, [noti, searchString]);

  const handleDeleteClick = (id: number) => {
    deleteNotification(id);
  };

  const startEdit = (id: number, title: string, content: string) => {
    setEditingId(id);
    setEditTitle(title);
    setEditContent(content || "");
    setExpandedUserId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  const handleSave = () => {
    if (editingId !== null) {
      updateNotification({
        selectId: editingId,
        title: editTitle,
        content: editContent,
      });
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedUserId((prev) => (prev === id ? null : id));
  };

  const handleRowClick = (id: number) => {
    if (editingId !== null && editingId !== id) {
      setPendingExpandId(id);
      setShowUnsavedModal(true);
      return;
    }
    toggleExpand(id);
  };

  const confirmUnsaved = () => {
    setShowUnsavedModal(false);
    if (pendingExpandId !== null) {
      toggleExpand(pendingExpandId);
      setPendingExpandId(null);
    }
  };

  return (
    <div className={styles.container}>
      {sortedRows.map((n) => (
        <div key={n.id}>
          <div
            onClick={() => handleRowClick(n.id)}
            className={`${styles.noticeRow} ${
              expandedUserId === n.id ? styles.active : ""
            }`}
          >
            <div className={styles.info}>
              {editingId === n.id ? (
                <input
                  className={styles.editTitle}
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              ) : (
                <span className={styles.title}>{n.title}</span>
              )}
              <span className={styles.date}>{n.created_at}</span>
            </div>
            <div
              className={styles.actions}
              onClick={(e) => e.stopPropagation()}
            >
              {editingId === n.id ? (
                <>
                  <button onClick={handleSave} className={styles.button}>
                    SAVE
                  </button>
                  <button onClick={handleCancelEdit} className={styles.button}>
                    CANCEL
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(n.id, n.title, n.content)}
                    className={styles.button}
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => handleDeleteClick(n.id)}
                    className={`${styles.button} ${styles.delete}`}
                  >
                    DELETE
                  </button>
                </>
              )}
            </div>
          </div>
          {expandedUserId === n.id && (
            <div
              className={styles.userContent}
              onClick={(e) => e.stopPropagation()}
            >
              {editingId === n.id ? (
                <textarea
                  className={styles.editContent}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
              ) : (
                <p className={styles.contentText}>
                  {n.content || "No additional info."}
                </p>
              )}
            </div>
          )}
        </div>
      ))}

      {showUnsavedModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <p className={styles.modalMessage}>
              수정한 사항이 저장되지 않습니다.
            </p>
            <div className={styles.modalActions}>
              <button
                onClick={() => setShowUnsavedModal(false)}
                className={styles.cancelButton}
              >
                취소
              </button>
              <button onClick={confirmUnsaved} className={styles.confirmButton}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
