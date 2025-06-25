import { type FC } from "react";
import styles from './index.module.css'
import { Trophy, User } from "lucide-react";
import { UserListContent } from "@/shared/types/forAPI/UserType";

export type UserCardProps = Pick<UserListContent, 'username'>;

export const UserCard: FC<UserCardProps> = ({username}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.profile}>
                {/* <img /> */}
                <User size={16} />
            </div>
            <div className={styles.username}>
                {username}
            </div>
            {/* <div className={styles.rank}>
                <Trophy size={12}/>
                {rank.toString()}
            </div> */}
        </div>
    );
};