'use client';

import React, { FC } from 'react';
import styles from './index.module.css';

export type LoadingProps = {
    message?: string;
    fullScreen?: boolean;
};

export const Loading: FC<LoadingProps> = ({
    message,
    fullScreen = true,
}) => (
    <div
        className={
            fullScreen
                ? styles.containerFull
                : styles.containerInline
        }
    >
        <div className={styles.spinner} />
        {message && (
            <p className={styles.message}>
                {message.split('').map((char, i) => (
                    <span
                        key={i}
                        style={{ animationDelay: `${i * 0.1}s` }}
                    >
                        {char}
                    </span>
                ))}
            </p>
        )}
    </div>
);