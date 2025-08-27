import React from 'react';
import CloseIcon from '../../assets/icon/close.svg';
import styles from '../PlayModal/PlayModal.module.css';

const PlayModal = ({ youtubeKey, closeModal, kind }) => {
  const src = `https://www.youtube.com/embed/${youtubeKey}`;

  return (
    <div className={styles.playModalWrap} onClick={closeModal}>
      <span className={styles.closeIcon}>
        <img src={CloseIcon} alt="닫기" />
      </span>
      <iframe
        width="70%"
        height="80%"
        src={src}
        title="YouTube video player"
        allow="autoplay; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className={styles.playModal}
      ></iframe>
    </div>
  );
};

export default PlayModal;
