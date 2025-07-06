"use client";

import { useRouter } from "next/navigation";
import styles from "./index.module.css";

interface AddButtonProps {
  caseName: string;
}

export const AddButton = ({ caseName }: AddButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    const path = caseName.toLowerCase();
    router.push(`/setting/add/${path}`);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`${styles.button} ${styles.addButton}`}
      >
        + Add {caseName}
      </button>
    </>
  );
};
