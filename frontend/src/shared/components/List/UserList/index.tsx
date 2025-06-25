import React, { type FC } from 'react';
import { GetUserSuccess, UserListContent, UserListSuccess } from '@/shared/types/forAPI/UserType';
import { UserCard } from '../../Card/UserCard';
import styles from './index.module.css';

export type UserListProps = {
  items: UserListSuccess;
  onItemClick?: (user: UserListContent) => void;
};

export const UserList: FC<UserListProps> = ({ items, onItemClick }) => (
  <div className={styles.list}>
    {items.map((user: UserListContent) => (
      <div
        key={user.id}
        className={styles.cardWrapper}
        style={{ cursor: onItemClick ? 'pointer' : 'default' }}
      >
        <UserCard {...user} />
      </div>
    ))}
  </div>
);
