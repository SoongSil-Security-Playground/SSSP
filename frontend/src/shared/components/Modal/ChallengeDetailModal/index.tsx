'use client';

import React, { type FC, useState, useEffect } from 'react';
import { type ChallengeCardProps } from '../../Card/ChallengeCard';
import { Modal } from '../Modal';
import { FloatingInput } from '../../Input/FloatingInput';
import { Button } from '../../Button';
import { StarRating } from '../../Rating';
import { CheckCircle } from 'lucide-react';
import styles from './index.module.css';

export type ChallengeDetailModalProps = {
    isOpen: boolean;
    onClose: () => void;
    item: ChallengeCardProps | null;
};

export const ChallengeDetailModal: FC<ChallengeDetailModalProps> = ({ isOpen, onClose, item }) => {
    const [flagInput, setFlagInput] = useState('');

    useEffect(() => {
        if (isOpen) {
            setFlagInput('');
        }
    }, [isOpen]);

    
    if (!item) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: submit flagInput for item
        console.log('submit flag for', item.title, flagInput);
        setFlagInput('');
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.container}>
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                    &times;
                </button>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.meta}>
                    <StarRating rating={item.stars} />
                    <span className={styles.points}>{item.points} pts</span>
                    <span className={styles.categoryPill}>{item.category.toUpperCase()}</span>
                </div>
                <p className={styles.description}>{item.description}</p>
                <Button className={styles.downloadBtn} onClick={() => {/* TODO: download logic */ }}>
                    download
                </Button>
                {item.status === 'unsolved' ? (
                    <>
                        <form className={styles.flagForm} onSubmit={handleSubmit}>
                            <FloatingInput
                                type="text"
                                label="FLAG"
                                value={flagInput}
                                className={styles.flagInput}
                                onChange={(e) => setFlagInput(e.target.value)}
                            />
                            <Button type="submit" className={styles.flagSubmit}>submit</Button>
                        </form>
                    </>
                ) : (
                    <div className={styles.solved}>
                        <CheckCircle size={16} className={styles.solvedIcon} />
                        <p>solved</p>
                    </div>
                )}
            </div>
        </Modal>
    );
};
