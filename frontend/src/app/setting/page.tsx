"use client";

import { useState } from "react";
import styles from "@/app/setting/page.module.css";

import SettingBox from "@/shared/components/SettingBox";
import SelectSetting from "@/shared/components/SelectSetting";

export default function SettingPage() {
  const tabs = ["Challenges", "Users", "Notification", "Submissions"];
  const [active, setActive] = useState(1);

  return (
    <div style={{ backgroundColor: "#242424" }}>
      <h1>Here is Setting Page</h1>
      <div className={styles.wrapper}>
        <div className={styles.bodyWrapper}>
          <div className={styles.headerWrapper}>
            <SelectSetting
              items={tabs}
              activeIndex={active}
              onChange={setActive}
            />
          </div>
          <SettingBox />
        </div>
      </div>
    </div>
  );
}
