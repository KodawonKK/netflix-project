import React from 'react';
import Button from 'react-bootstrap/Button';
import Play from '../../assets/icon/play.svg';

const PlayBtn = ({ size, name, setOpen, openModal }) => {
  return (
    <Button variant="light" size={size} className={name} onClick={openModal}>
      <img src={Play} alt="재생 버튼" />
      <span>재생</span>
    </Button>
  );
};

export default PlayBtn;
