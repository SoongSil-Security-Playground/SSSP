import React from 'react';
import styles from './index.module.css'

type PageTitleProps = {
  text: string;
};

export const PageTitle: React.FC<PageTitleProps> = ({ text }) => {
  return (
    <div className={styles.pageTitleContainer}>
      <h1 className={styles.pageTitle}>
        {text}
      </h1>
    </div>
  );
};
