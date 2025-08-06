import { PageTitle } from '@/shared/components/Title';
import { UserList } from '@/shared/components/List/UserList';
import styles from './page.module.css';

export default function UserPage() {
  return (
    <div className={styles.container}>
      <PageTitle text="USERS" />
      <div className={styles.contentWrapper}>
        <UserList />
      </div>
    </div>
  );
}
