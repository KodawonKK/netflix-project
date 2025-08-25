import React, { useState, useRef } from 'react';
import Like from '../../assets/icon/like.svg';
import styles from './Button.module.css';
import { motion } from 'framer-motion';

const LikeBtn = () => {
  const likeBtnClassName = ['notGood', 'good', 'best'];
  const [showHover, setShowHover] = useState(false);
  const hoverTimeout = useRef(null);

  const handleLikeHover = () => {
    hoverTimeout.current = setTimeout(() => {
      setShowHover(true);
    }, 200);
  };
  const handleLikeLeave = () => {
    clearTimeout(hoverTimeout.current);
    setShowHover(false);
  };

  return (
    <button
      className={`${styles.commonDetail} ${styles.likeBtnWrap}`}
      onMouseEnter={handleLikeHover}
      onMouseLeave={handleLikeLeave}
    >
      <img
        src={Like}
        alt="내가찜한콘텐츠추가"
        className={`${styles.likeBtn}`}
      />
      {showHover && (
        <motion.div
          className={`${styles.likeBtnHoverWrap}`}
          initial={{
            translateX: '-50%',
            translateY: '-50%',
            opacity: 0,
            scale: 0.9,
          }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {likeBtnClassName.map(item => (
            <div
              className={`${styles.likeBtnHover} ${styles[item]}`}
              key={item}
            >
              <img
                src={Like}
                alt="내가찜한콘텐츠추가"
                className={`${styles.likeBtn}`}
              />
            </div>
          ))}
        </motion.div>
      )}
    </button>
  );
};

export default LikeBtn;
