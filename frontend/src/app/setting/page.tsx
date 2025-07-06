"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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

import { challenge_get_all } from "@/shared/hooks/api/useChallenge";
import { challenge_get_solve_log } from "@/shared/hooks/api/useChallenge";
import { user_list } from "@/shared/hooks/api/useUser";
import { notice_get_all } from "@/shared/hooks/api/useNotice";

const tabs = ["Challenges", "Submissions", "Users", "Notification"];

export default function SettingPage() {
  const [searchMap, setSearchMap] = useState<Record<string, string>>({});
  const [idsMap, setIdsMap] = useState<Record<string, number[]>>({});
  const [active, setActive] = useState(0);

  const searchString = searchMap[active] ?? "";
  const selectedIds = idsMap[active] ?? [];

  const handleSearchChange = (value: string) => {
    setSearchMap((prev) => ({ ...prev, [active]: value }));
  };

  const handleSelectChange = (ids: number[]) => {
    setIdsMap((prev) => ({ ...prev, [active]: ids }));
  };

  // 데이터 받기
  const challengeQuery = useQuery({
    queryKey: ["challenge_get_all"],
    queryFn: () => challenge_get_all(),
    enabled: active === 0,
  });
  const submissionQuery = useQuery({
    queryKey: ["submission_get_all"],
    queryFn: () => challenge_get_solve_log(),
    enabled: active === 1,
  });
  const usersQuery = useQuery({
    queryKey: ["users_get_all"],
    queryFn: () => user_list(),
    enabled: active === 2,
  });
  const notificationQuery = useQuery({
    queryKey: ["notification_get_all"],
    queryFn: () => notice_get_all(),
    enabled: active === 3,
  });

  // 오른쪽 헤더 분기
  const Header = () => {
    switch (active) {
      case 0:
        return (
          <ChallengeHeader
            data={challengeQuery.data ?? []}
            selectedIds={selectedIds}
            searchString={searchString}
            handleSearchChange={handleSearchChange}
          />
        );
      case 1:
        return (
          <SubmissionHeader
            data={submissionQuery.data ?? ""}
            selectedIds={selectedIds}
            searchString={searchString}
            handleSearchChange={handleSearchChange}
          />
        );
      case 2:
        return (
          <UsersHeader
            data={usersQuery.data ?? []}
            searchString={searchString}
            handleSearchChange={handleSearchChange}
          />
        );
      case 3:
        return (
          <NotificationHeader
            data={notificationQuery.data ?? []}
            searchString={searchString}
            handleSearchChange={handleSearchChange}
          />
        );
      default:
        return null;
    }
  };

  // 본문 분기
  const Content = () => {
    switch (active) {
      case 0:
        return (
          <ChallengeBox
            data={challengeQuery.data ?? []}
            searchString={searchString}
            selectedIds={selectedIds}
            handleSelectChange={handleSelectChange}
          />
        );
      case 1:
        return (
          <SubmissionBox
            data={submissionQuery.data ?? ""}
            searchString={searchString}
            selectedIds={selectedIds}
            handleSelectChange={handleSelectChange}
          />
        );
      case 2:
        return (
          <UsersBox data={usersQuery.data ?? []} searchString={searchString} />
        );
      case 3:
        return (
          <NotificationBox
            data={notificationQuery.data ?? []}
            searchString={searchString}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <PageTitle text="Settings" />
      <div className={styles.headerWrapper}>
        <SelectSetting items={tabs} activeIndex={active} onChange={setActive} />
        <Header />
      </div>
      <div className={styles.bodyWrapper}>
        <Content />
      </div>
    </div>
  );
}
