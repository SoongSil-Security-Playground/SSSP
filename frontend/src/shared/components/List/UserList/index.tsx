'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { user_list } from '@/shared/hooks/api/useUser';
import { GetUserListSuccess } from '@/shared/types/forAPI/UserType';
import { UserCard } from '../../Card/UserCard';
import { toast } from 'react-toastify';
import { Loading } from '../../Loading';
import styles from './index.module.css';

export const UserList = () => {
  const { data: items = [], isLoading, isError, error } =
    useQuery<GetUserListSuccess, Error>({
      queryKey: ['users'],
      queryFn: user_list,
    }
    );

  if (isLoading) return <Loading />

  if (isError) {
    toast.error(error.message);
  }

  return (
    <div className={styles.list}>
      {items.map(user => (
        <UserCard key={user.id} username={user.username} />
      ))}
    </div>
  );
};