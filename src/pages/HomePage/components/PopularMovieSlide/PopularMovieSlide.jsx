import React, { useEffect, useState } from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import { Alert } from 'bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MovieCard from '../MovieCard/MovieCard';
import './PopularMovieSlide.style.css';
import { hover } from '@testing-library/user-event/dist/hover';
import PreviewModal from '../MovieCard/PreviewModal';

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  const [hoverCardInfo, setHoverCardInfo] = useState(null);
  const [modalPos, setModalPos] = useState({ top: 0, left: 0 });

  const handleHover = (movie, ref) => {
    if (!movie || !ref?.current) {
      setHoverCardInfo(null);
      return;
    }
    const rect = ref?.current.getBoundingClientRect();
    setHoverCardInfo(movie);
    setModalPos({
      top: rect.top,
      left: rect.left,
    });
  };

  if (isLoading) {
    <h1>...Loading</h1>;
  }
  if (isError) {
    <Alert>{error.message};</Alert>;
  }
  const pagination = {
    clickable: false,
    el: '.custom-pagination',
  };
  const navigation = {
    // el: ".custom-navigation"
  };

  return (
    <div className="popular-movie-wrap">
      <div className="kind-title">
        <h1>인기 영화</h1>
        <div className="custom-pagination"></div>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={6.5}
        spaceBetween={5}
        navigation={navigation}
        pagination={pagination}
        loop={data?.results.length > 7}
        breakpoints={{
          280: {
            slidesPerView: 2.5,
          },
          500: {
            slidesPerView: 2.5,
          },
          800: {
            slidesPerView: 3.5,
          },
          1100: {
            slidesPerView: 4.5,
          },
          1400: {
            slidesPerView: 5.5,
          },
          2400: {
            slidesPerView: 6.5,
          },
        }}
        className="mySwiper"
        allowTouchMove={false}
      >
        {data?.results.map((movie, idx) => (
          <SwiperSlide key={idx}>
            <MovieCard movie={movie} onHover={handleHover} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-navigation"></div>
      {/* card-preview-modal */}
      {/* <div
        className="preview-modal"
        style={{ top: modalPos.top, left: modalPos.left, opacity: opacity }}
        onMouseEnter={() => setOpacity(1)}
        onMouseLeave={() => {
          setOpacity(0);
        }}
      >
        <img
          src={`https://media.themoviedb.org/t/p/w355_and_h200_multi_faces${hoverCardInfo?.backdrop_path}`}
          width="100%"
          alt="thumbnail"
        />
        <div className="preview-movie-info">
          <h4 className="movie-title">{hoverCardInfo?.title}</h4>
          {hoverCardInfo?.genre_ids.map((genre, idx) => (
            <span
              className={`movie-genre ${idx === 0 && 'no-bullet'}`}
              key={idx}
            >
              {genre}
            </span>
          ))}
        </div>
      </div> */}

      <PreviewModal
        movie={hoverCardInfo}
        position={modalPos}
        onMouseEnter={() => setHoverCardInfo(hoverCardInfo)}
        onMouseLeave={() => setHoverCardInfo(null)}
      />
    </div>
  );
};

export default PopularMovieSlide;
