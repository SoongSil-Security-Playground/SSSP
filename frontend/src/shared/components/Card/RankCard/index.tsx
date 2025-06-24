import { type FC } from "react";
import styles from './index.module.css'
import { Trophy, User } from "lucide-react";

export type RankCardProps = {
    id: string;
    rank: Number;
    score: Number;
}

export const RankCard: FC<RankCardProps> = ({ id, rank, score }) => {

    let borderClass = '';
    if (rank === 1) borderClass = styles.gold;
    else if (rank === 2) borderClass = styles.silver;
    else if (rank === 3) borderClass = styles.bronze;

    return (
        <div className={`${styles.wrapper} ${borderClass}`}>
            <div className={styles.rank}>
                {rank.toString()}
            </div>
            <div className={styles.profile}>
                {/* <img /> */}
                <User size={16} />
            </div>
            <div className={styles.id}>
                {id}
            </div>
            <div className={styles.score}>
                <Trophy size={12} />
                {score.toString()}
            </div>
        </div>
    );
};