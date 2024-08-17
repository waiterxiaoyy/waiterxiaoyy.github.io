import React from 'react';
import styles from './index.module.less';

interface BlogProps {
  children: React.ReactNode;
}

export default function Blog({ children }: BlogProps) {
  return (
    <div className={styles.container}>
      <div className={styles.blog}>
        <div className={styles.breadCrumb}></div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
