import React, { type FC } from "react";
import styles from './index.module.css'

export type NotificationCardProps = {
    title: string;
    content: string;
    createdAt: string;
    className?: string;
}

export const NotificationCard: FC<NotificationCardProps> = ({ title, content, createdAt, className="" }) => {
    return (
        <div className={`${styles.card} ${className}`.trim()}>
            <h3 className={styles.title}>!{title}!</h3>
            <p className={styles.content}>{content}</p>
            <p className={styles.timestamp}>{createdAt}</p>
        </div>
    );
};