import { type FC } from "react";
import styles from './index.module.css'
import { Trophy, User } from "lucide-react";
import { ScoreListContent } from "@/shared/types/forAPI/ScoringType";

export type RankCardProps = ScoreListContent & {
    id: number;
};

export const RankCard: FC<RankCardProps> = ({ id, username, total_score }) => {

    let borderClass = '';
    if (id === 1) borderClass = styles.gold;
    else if (id === 2) borderClass = styles.silver;
    else if (id === 3) borderClass = styles.bronze;

    return (
        <div className={`${styles.wrapper} ${borderClass}`}>
            <div className={styles.rank}>
                {id.toString()}
            </div>
            <div className={styles.profile}>
                {/* <img /> */}
                <User size={16} />
            </div>
            <div className={styles.username}>
                {username}
            </div>
            <div className={styles.score}>
                <Trophy size={12} />
                {total_score.toString()}
            </div>
        </div>
    );
};