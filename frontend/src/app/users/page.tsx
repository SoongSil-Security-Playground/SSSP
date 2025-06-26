'use client';

import React, { useState, useEffect } from 'react';
import { PageTitle } from '@/shared/components/Title';
import { UserList } from '@/shared/components/List/UserList';
import { UserListSuccess } from '@/shared/types/forAPI/UserType';
import { user_list } from '@/shared/hooks/api/useUser';
import styles from './page.module.css';

export default function UserPage() {
  const [items, setItems] = useState<UserListSuccess>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user_list()
      .then((data) => setItems(data))
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (error)   return <div className={styles.container}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <PageTitle text="USERS" />
      <div className={styles.contentWrapper}>
        <UserList items={items} />
      </div>
    </div>
  );
}