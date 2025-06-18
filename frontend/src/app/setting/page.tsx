import styles from "@/app/setting/page.module.css";

import SettingBox from "@/shared/components/SettingBox";

export default function SettingPage() {
  return (
    <div>
      <h1>Here is Setting Page</h1>
      <div className={styles.wrapper}>
        <div className={styles.bodyWrapper}>
          <SettingBox />
        </div>
      </div>
    </div>
  );
}
