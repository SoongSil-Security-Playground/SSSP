import { type FC } from "react";
import styles from './index.module.css'
import { Trophy, User } from "lucide-react";

export type UserCardProps = {
    id: string;
    rank: Number;
}

export const UserCard: FC<UserCardProps> = ({id, rank}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.profile}>
                {/* <img /> */}
                <User size={16} />
            </div>
            <div className={styles.id}>
                {id}
            </div>
            <div className={styles.rank}>
                <Trophy size={12}/>
                {rank.toString()}
            </div>
        </div>
    );
};