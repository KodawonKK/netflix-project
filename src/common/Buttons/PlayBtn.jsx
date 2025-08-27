import React from 'react';
import Button from 'react-bootstrap/Button';
import Play from '../../assets/icon/play.svg';
import { usePlayModalStore } from '../../stores/playModalStore';

const PlayBtn = ({ size, name, id, kind, style }) => {
  const { openModal } = usePlayModalStore();
  return (
    <Button
      variant="light"
      size={size}
      className={name}
      style={style}
      onClick={() => openModal(id)}
    >
      <img src={Play} alt="재생 버튼" />
      {kind !== 'circle' && <span>재생</span>}
    </Button>
  );
};

export default PlayBtn;
