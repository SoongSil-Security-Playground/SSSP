import styles from './page.module.css';

export default function HomePage({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContent}>
        <div className={styles.mainTitle}>
          SOONGSIL<br />
          SECURITY<br />
          PLAYGROUND
        </div>
      </div>
    </div>
  );
}