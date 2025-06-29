"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/utils/AuthProvider";
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
import { PageTitle } from "@/shared/components/Title";

export default function SettingPage() {
  const { isLoggedIn, isAdmin } = useAuth();
  const router = useRouter();
  const tabs = ["Challenges", "Submissions", "Users", "Notification"];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!isLoggedIn || isAdmin === false) {
      router.replace('/');
    }
  }, [isLoggedIn, isAdmin, router]);

  if (!isLoggedIn || isAdmin !== true) {
    return <div>Loading...</div>;
  }

  // 오른쪽 헤더 분기
  const Header = () => {
    switch (active) {
      case 0:
        return <ChallengeHeader />;
      case 1:
        return <SubmissionHeader />;
      case 2:
        return <UsersHeader />;
      case 3:
        return <NotificationHeader />;
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
        return <SubmissionBox />;
      case 2:
        return <UsersBox />;
      case 3:
        return <NotificationBox />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <PageTitle text="Settings" />
      <div className={styles.headerWrapper}>
        <SelectSetting
          items={tabs}
          activeIndex={active}
          onChange={setActive}
        />
        <Header />
      </div>
      <div className={styles.bodyWrapper}>
        <Content />
      </div>
    </div>
  );
}
