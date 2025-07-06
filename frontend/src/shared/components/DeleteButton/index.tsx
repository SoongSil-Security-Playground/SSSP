import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import styles from "./index.module.css";
import { challenge_delete } from "@/shared/hooks/api/useChallenge";
import { admin_notice_delete } from "@/shared/hooks/api/useNotice";

interface DeleteButtonProps {
  selectedIds: number[];
  caseName: string;
}

export const DeleteButton = ({ selectedIds, caseName }: DeleteButtonProps) => {
  const router = useRouter();

  const { mutate: deleteChallenge } = useMutation({
    mutationFn: (selectIds: number) => challenge_delete(selectIds),
  });

  const { mutate: deleteNotification } = useMutation({
    mutationFn: (selectedIds: number) => admin_notice_delete(selectedIds),
  });

  const handleDeleteClick = () => {
    if (selectedIds.length === 0) return;

    if (caseName === "Challenge") {
      selectedIds.forEach((id) => {
        deleteChallenge(id);
      });
    } else if (caseName === "Notification") {
      selectedIds.forEach((id) => {
        deleteNotification(id);
      });
    } else if (caseName === "Submission") {
      alert("아직 없음");
    } else alert("잘못된 접근입니다.");

    router.refresh();
  };

  return (
    <>
      <button
        className={`${styles.button} ${styles.deleteButton}`}
        onClick={handleDeleteClick}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-2 14H7L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M9 6V4h6v2" />
        </svg>
        Delete
      </button>
    </>
  );
};
