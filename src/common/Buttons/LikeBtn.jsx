import React from 'react';
import Like from '../../assets/icon/like.svg';
import styles from './Button.module.css';

const LikeBtn = () => {
  return (
    <button className={`${styles.commonDetail} ${styles.likeBtnWrap}`}>
      <img
        src={Like}
        alt="내가찜한콘텐츠추가"
        className={`${styles.likeBtn}`}
      />
    </button>
  );
};

export default LikeBtn;
