"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import styles from "./index.module.css";
import { GetNoticeListSuccess } from "@/shared/types/forAPI/NoticeType";
import {
  admin_notice_update,
  admin_notice_delete,
} from "@/shared/hooks/api/useNotice";

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
  const [showEditModal, setShowEditModal] = useState(false);

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
    setShowEditModal(true);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
    setShowEditModal(false);
  };

  const handleSave = () => {
    if (editingId !== null) {
      updateNotification({
        selectId: editingId,
        title: editTitle,
        content: editContent,
      });
      setShowEditModal(false);
      setEditingId(null);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedUserId((prev) => (prev === id ? null : id));
  };

  // 수정 중일 때는 collapse도 바로 막고 모달 띄움
  const handleRowClick = (id: number) => {
    if (editingId !== null) {
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
              <span className={styles.title}>{n.title}</span>
              <span className={styles.date}>{n.created_at}</span>
            </div>
            <div
              className={styles.actions}
              onClick={(e) => e.stopPropagation()}
            >
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
            </div>
          </div>
          {expandedUserId === n.id && (
            <div
              className={styles.userContent}
              onClick={(e) => e.stopPropagation()}
            >
              <p className={styles.contentText}>
                {n.content || "No additional info."}
              </p>
            </div>
          )}
        </div>
      ))}
      {showEditModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <h3 className={styles.modalTitle}>Edit Notice</h3>

            <label className={styles.modalLabel}>Title</label>
            <input
              className={styles.modalInput}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <label className={styles.modalLabel}>Content</label>
            <textarea
              className={styles.modalTextarea}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />

            <div className={styles.modalActions}>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingId(null);
                }}
                className={styles.cancelButton}
              >
                취소
              </button>
              <button onClick={handleSave} className={styles.confirmButton}>
                수정
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
