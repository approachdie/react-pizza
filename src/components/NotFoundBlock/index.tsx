import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не нашли...
      </h1>
      <p>Данной страницы нет в нашем магазине</p>
    </div>
  );
};

export default NotFoundBlock;
