import React from 'react';
import styles from './index.css';

export default ({ children }) => {
  return (
    <div>
      <h1 className={styles.title}>Page layout/index</h1>
      {children}
    </div>
  );
}
