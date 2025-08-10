"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

import styles from "@/shared/components/ForSettingBox/UsersBox/index.module.css";
import { user_delete_user } from "@/shared/hooks/api/useUser";
import { GetUserListSuccess } from "@/shared/types/forAPI/UserType";
import { toast } from "react-toastify";

interface UsersBoxProps {
  data: GetUserListSuccess;
  searchString: string;
}

export default function UsersBox({ data: users, searchString }: UsersBoxProps) {
  const [filteredUsers, setFilteredUsers] = useState<GetUserListSuccess>([]);
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);

  useEffect(() => {
    const q = searchString.toLowerCase();
    setFilteredUsers(
      users.filter(
        (u: GetUserListSuccess[number]) =>
          u.username.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      )
    );
  }, [users, searchString]);

  const { mutate: deleteUser } = useMutation({
    mutationFn: (id: number) => user_delete_user(id),
    onSuccess: () => {
      toast.success("삭제가 완료되었습니다!");
      setTimeout(() => {
        window.location.href = "/setting?category=Users";
      }, 1000);
    },
  });

  const toggleExpand = (id: number) => {
    setExpandedUserId((prev) => (prev === id ? null : id));
  };

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    deleteUser(id);
  };

  return (
    <div className={styles.container}>
      {filteredUsers.map((user) => (
        <div key={user.id}>
          <div
            className={`${styles.userRow} ${
              expandedUserId === user.id ? styles.active : ""
            }`}
            onClick={() => toggleExpand(user.id)}
          >
            <div className={styles.userInfo}>
              <span className={styles.username}>{user.username}</span>
              <span className={styles.email}>{user.email}</span>
            </div>
            <div className={styles.actions}>
              <button className={styles.adminBtn}>{user.authority}</button>
              <button
                className={styles.deleteBtn}
                onClick={(e) => handleDelete(e, user.id)}
              >
                DELETE
              </button>
            </div>
          </div>

          {expandedUserId === user.id && (
            <div className={styles.userContent}>
              <p className={styles.contentText}>
                {user.contents || "No additional info."}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
