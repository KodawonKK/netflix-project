import React from 'react';
import './PreviewDetailModal.style.css';
import CloseIcon from '../../assets/icon/close.svg';

const PreviewDetailModal = ({ data, setOpen }) => {
  const imgUrl = `https://image.tmdb.org/t/p/original${data?.backdrop_path}`;
  return (
    <div className="preview-detail-wrap">
      <div className="preview-detail">
        <div className="preview-detail-top">
          <span className="close-icon" onClick={() => setOpen(false)}>
            <img src={CloseIcon} alt="닫기" />
          </span>
          <img src={imgUrl} alt="" width="100%" />
        </div>
        <div className="preview-detail-btm"></div>
      </div>
    </div>
  );
};

export default PreviewDetailModal;
