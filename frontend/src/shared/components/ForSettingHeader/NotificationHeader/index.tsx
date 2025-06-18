import styles from "@/shared/components/ForSettingHeader/ChallengeHeader/index.module.css";

type ActionBarProps = {
  onSearchChange?: (value: string) => void;
  onAddChallenge?: () => void;
};

export default function NotificationHeader({
  onSearchChange,
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
        className={`${styles.button} ${styles.addButton}`}
        onClick={onAddChallenge}
      >
        + Add Notification
      </button>
    </div>
  );
}
