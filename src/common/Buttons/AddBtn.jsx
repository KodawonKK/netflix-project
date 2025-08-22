import React from 'react';
import Plus from '../../assets/icon/plus.svg';
import styles from './Button.module.css';

const AddBtn = ({ kind }) => {
  return (
    <button className={`${styles.commonDetail}`}>
      <img src={Plus} alt="내가찜한콘텐츠추가" />
    </button>
  );
};

export default AddBtn;
