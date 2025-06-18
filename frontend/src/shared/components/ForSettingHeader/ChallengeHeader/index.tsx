import styles from "@/shared/components/ForSettingHeader/ChallengeHeader/index.module.css";

type ActionBarProps = {
  onSearchChange?: (value: string) => void;
  onDelete?: () => void;
  onAddChallenge?: () => void;
};

export default function ChallengeHeader({
  onSearchChange,
  onDelete,
  onAddChallenge,
}: ActionBarProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.searchContainer}>
        <svg
          className={styles.searchIcon}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#888"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className={styles.searchInput}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>

      <button
        className={`${styles.button} ${styles.deleteButton}`}
        onClick={onDelete}
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

      <button
        className={`${styles.button} ${styles.addButton}`}
        onClick={onAddChallenge}
      >
        + Add Challenge
      </button>
    </div>
  );
}
