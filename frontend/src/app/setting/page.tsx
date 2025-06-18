"use client";

import { useState } from "react";
import styles from "@/app/setting/page.module.css";

import ChallengeBox from "@/shared/components/ForSettingBox/ChallengeBox";
import UsersBox from "@/shared/components/ForSettingBox/UsersBox";
import NotificationBox from "@/shared/components/ForSettingBox/NotificationBox";
import SubmissionBox from "@/shared/components/ForSettingBox/SubmissionBox";

import SelectSetting from "@/shared/components/SelectSetting";

import ChallengeHeader from "@/shared/components/ForSettingHeader/ChallengeHeader";
import UsersHeader from "@/shared/components/ForSettingHeader/UsersHeader";
import NotificationHeader from "@/shared/components/ForSettingHeader/NotificationHeader";
import SubmissionHeader from "@/shared/components/ForSettingHeader/SubmissionHeader";

export default function SettingPage() {
  const tabs = ["Challenges", "Users", "Notification", "Submissions"];
  const [active, setActive] = useState(0);

  // 오른쪽 헤더 분기
  const Header = () => {
    switch (active) {
      case 0:
        return <ChallengeHeader />;
      case 1:
        return <UsersHeader />;
      case 2:
        return <NotificationHeader />;
      case 3:
        return <SubmissionHeader />;
      default:
        return null;
    }
  };

  // 본문 분기
  const Content = () => {
    switch (active) {
      case 0:
        return <ChallengeBox />;
      case 1:
        return <UsersBox />;
      case 2:
        return <NotificationBox />;
      case 3:
        return <SubmissionBox />;
      default:
        return null;
    }
  };

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
            <Header />
          </div>
          <Content />
        </div>
      </div>
    </div>
  );
}
