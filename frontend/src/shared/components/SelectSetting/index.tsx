import styles from "@/shared/components/SelectSetting/index.module.css";

type TabsProps = {
  items: string[];
  activeIndex: number;
  onChange: (newIndex: number) => void;
};

export default function Tabs({ items, activeIndex, onChange }: TabsProps) {
  return (
    <div className={styles.container}>
      {items.map((label, i) => (
        <button
          key={label}
          className={`${styles.tab} ${i === activeIndex ? styles.active : ""}`}
          onClick={() => onChange(i)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
