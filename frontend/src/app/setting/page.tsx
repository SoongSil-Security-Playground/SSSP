"use client";

import { useState } from "react";
import styles from "@/app/setting/page.module.css";

import SettingBox from "@/shared/components/SettingBox";
import SelectSetting from "@/shared/components/SelectSetting";

import ChallengeHeader from "@/shared/components/ForSettingHeader/ChallengeHeader";

export default function SettingPage() {
  const tabs = ["Challenges", "Users", "Notification", "Submissions"];
  const [active, setActive] = useState(1);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>SETTING</h1>
      <div className={styles.wrapper}>
        <div className={styles.bodyWrapper}>
          <div className={styles.headerWrapper}>
            <SelectSetting
              items={tabs}
              activeIndex={active}
              onChange={setActive}
            />
            <ChallengeHeader />
          </div>
          <SettingBox />
        </div>
      </div>
    </div>
  );
}
