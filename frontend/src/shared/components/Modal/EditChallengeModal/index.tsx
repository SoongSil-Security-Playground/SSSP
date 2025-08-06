"use client";

import { useState } from "react";
import styles from "./index.module.css";
import { useMutation } from "@tanstack/react-query";
import { challenge_update } from "@/shared/hooks/api/useChallenge";
import { Challenge } from "../../ForSettingBox/ChallengeBox";

type EditModalProps = {
  handleModal: (id?: number) => void;
  editingChallenge: Challenge;
};

export const EditChallengeModal = ({
  handleModal,
  editingChallenge: item,
}: EditModalProps) => {
  const [editTitle, setEditTitle] = useState(item.name);
  const [editFlag, setEditFlag] = useState(item.flag);
  const [editDesc, setEditDesc] = useState(item.description);
  const [editPoint, setEditPoint] = useState<number>(item.points);
  const [editLevel, setEditLevel] = useState(item.level);
  const [editCategory, setEditCategory] = useState(item.category);
  const [editFile, setEditFile] = useState<File>();

  const { mutate: updateChallenge } = useMutation({
    mutationFn: ({
      id,
      title,
      desc,
      point,
      level,
      category,
      file,
      flag,
    }: {
      id: number;
      title: string;
      desc: string;
      point: number;
      level: string;
      category: string;
      file: File | null;
      flag: string;
    }) => challenge_update(id, title, desc, point, level, category, file, flag),
    onSuccess: () => {
      alert("수정 성공!");
      window.location.href = "/setting?category=Challenge";
    },
  });

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <h3 className={styles.modalTitle}>Edit Challenge</h3>

        <label className={styles.modalLabel}>Title</label>
        <input
          className={styles.modalInput}
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />

        <label className={styles.modalLabel}>Description</label>
        <textarea
          className={styles.modalTextarea}
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
        />

        <label className={styles.modalLabel}>Flag</label>
        <input
          className={styles.modalInput}
          value={editFlag}
          onChange={(e) => setEditFlag(e.target.value)}
        />

        <label className={styles.modalLabel}>Level</label>
        <input
          className={styles.modalInput}
          value={editLevel}
          onChange={(e) => setEditLevel(e.target.value)}
        />

        <label className={styles.modalLabel}>Points</label>
        <input
          className={styles.modalInput}
          value={editPoint}
          onChange={(e) => setEditPoint(parseInt(e.target.value))}
        />

        <label className={styles.modalLabel}>Category</label>
        <input
          className={styles.modalInput}
          value={editCategory}
          onChange={(e) => setEditCategory(e.target.value)}
        />

        <div className={styles.modalActions}>
          <button onClick={() => handleModal()} className={styles.cancelButton}>
            취소
          </button>
          <button
            onClick={() =>
              updateChallenge({
                id: item.id,
                title: editTitle,
                desc: editDesc,
                point: editPoint,
                level: editLevel,
                category: editCategory,
                file: null,
                flag: editFlag,
              })
            }
            className={styles.confirmButton}
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
};
