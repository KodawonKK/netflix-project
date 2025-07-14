import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import "./Banner.style.css";
import Button from "react-bootstrap/Button";
import InfoIcon from "../../../../assets/icon/info.svg";
import Play from "../../../../assets/icon/play.svg";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log("ddd", data);
  if (isLoading) {
    <h1>...Loading</h1>;
  }
  if (isError) {
    <h1>{error.message};</h1>;
  }
  const imgUrl = `https://image.tmdb.org/t/p/original${data?.results[1]?.backdrop_path}`;

  return (
    <div className="banner-wrap">
      <div className="banner-overlay"></div>
      <img src={imgUrl} alt="배너 이미지" />
      <div className="banner-title-wrap">
        <h3 className="common-banner-txt banner-title">{data?.results[1]?.title}</h3>
        <p className="common-banner-txt banner-overview">{data?.results[1]?.overview}</p>
        <div className="banner-btn-wrap">
          <Button variant="light" size="sm" className="banner-btn">
            <img src={Play} alt="재생 버튼" />
            <span>재생</span>
          </Button>
          <Button variant="secondary" size="sm" className="banner-btn">
            <img src={InfoIcon} alt="상세 정보" />
            <span>상세 정보</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
