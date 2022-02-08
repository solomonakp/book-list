import React, { FC } from 'react';
import styles from 'styles/Loader.module.css';

interface LoaderProps {
  type?: 1 | 2;
  fixed?: boolean;
}

const Loader: FC<LoaderProps> = ({ type = 1, fixed = false }) => {
  return (
    <div
      className={`${styles.loaderContainer} ${fixed ? styles.fixed : ''}`}
      data-testid='loader'
    >
      {type === 1 ? (
        <div className={`${styles.ldsRoller} bg`}>
          <div className='after-color-1'></div>
          <div className='after-color-1'></div>
          <div className='after-color-1'></div>
          <div className='after-color-1'></div>
          <div className='after-color-1'></div>
          <div className='after-color-1'></div>
          <div className='after-color-1'></div>
          <div className='after-color-1'></div>
        </div>
      ) : (
        <div className={`${styles.ldsEllipsis}`}>
          <div className='after-color-2'></div>
          <div className='after-color-2'></div>
          <div className='after-color-2'></div>
          <div className='after-color-2'></div>
        </div>
      )}
    </div>
  );
};

export default Loader;
