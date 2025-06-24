import React from 'react';
import { PageTitle } from '@/shared/components/Title';
import { UserList } from '@/shared/components/List/UserList';
import { type UserCardProps } from '@/shared/components/Card/UserCard';
import styles from './page.module.css';

export default function UserPage() {
  const users: UserCardProps[] = [
    { id: 'alice', rank: 1 },
    { id: 'bob', rank: 2 },
    { id: 'charlie', rank: 3 },
    { id: 'dave', rank: 4 },
    { id: 'eve', rank: 5 },
  ];

  return (
    <div className={styles.container}>
      <PageTitle text="USERS" />
      <div className={styles.contentWrapper}>
        <UserList items={users} />
      </div>
    </div>
  );
}