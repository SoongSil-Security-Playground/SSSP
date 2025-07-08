'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { user_list } from '@/shared/hooks/api/useUser';
import { UserListContent, GetUserListSuccess } from '@/shared/types/forAPI/UserType';
import { UserCard } from '../../Card/UserCard';
import styles from './index.module.css';

export const UserList = () => {
  const { data: items = [], isLoading, isError, error } =
    useQuery<GetUserListSuccess, Error>({
      queryKey: ['users'],
      queryFn: user_list,
    }
  );

  if (isLoading) {
    return <div className={styles.container}>Loading...</div>;
  }
  if (isError) {
    return <div className={styles.container}>Error: {error?.message}</div>;
  }

  return (
    <div className={styles.list}>
      {items.map((user: UserListContent) => (
        <div
          key={user.id}
          className={styles.cardWrapper}
        >
          <UserCard {...user} />
        </div>
      ))}
    </div>
  );
};