import React, { type FC } from 'react';
import { UserCard, type UserCardProps } from '../../Card/UserCard';
import styles from './index.module.css';

export type UserListProps = {
  items: UserCardProps[];
  onItemClick?: (user: UserCardProps) => void;
};

export const UserList: FC<UserListProps> = ({ items, onItemClick }) => (
  <div className={styles.list}>
    {items.map(user => (
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
