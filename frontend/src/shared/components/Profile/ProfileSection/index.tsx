'use client';

import React, { type FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { user_get } from '@/shared/hooks/api/useUser';
import { GetUserSuccess } from '@/shared/types/forAPI/UserType';
import { UserLock, ArrowUpRightFromSquare, User } from 'lucide-react';
import { ChangePasswordModal } from '../../Modal/ChangePasswordModal';
import { DeleteAccountModal } from '../../Modal/DeleteAccountModal';
import styles from './index.module.css'

export const ProfileSection: FC = () => {
  const { data, isLoading, isError, error } = useQuery<GetUserSuccess, Error>({
    queryKey: ['user'],
    queryFn: user_get,
  });

  const [isChangeOpen, setChangeOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  if (isLoading) return <div>Loading profile…</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className={styles.profileForm}>
      <h2 className={styles.title}>PROFILE</h2>
      {/* <img src="/avatar.png" alt="User Avatar" className={styles.avatar} /> */}
      <div className={styles.profile}>
        {/* <img /> */}
        <User size={64} />
      </div>
      <div className={styles.infoLabel}>{data?.email}</div>
      <div className={styles.infoLabel}>{data?.username}</div>

      <nav className={styles.accountNav}>
        <button
          className={styles.navButton}
          onClick={() => setChangeOpen(true)}
        >
          change password <ArrowUpRightFromSquare size={20} />
        </button>
        <button
          className={styles.navButton}
          onClick={() => setDeleteOpen(true)}
        >
          delete account <UserLock size={20} />
        </button>
      </nav>

      <ChangePasswordModal
        isOpen={isChangeOpen}
        onClose={() => setChangeOpen(false)}
      />
      <DeleteAccountModal
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
      />
    </div>
  );
};