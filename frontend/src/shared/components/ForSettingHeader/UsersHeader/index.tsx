import styles from "@/shared/components/ForSettingHeader/UsersHeader/index.module.css";

type UsersHeaderProps = {
  placeholder?: string;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
};

export default function UsersHeader({
  placeholder = "Search...",
  searchValue = "",
  onSearchChange = () => {},
}: UsersHeaderProps) {
  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <svg
          className={styles.searchIcon}
          viewBox="0 0 24 24"
          fill="none"
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
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}
