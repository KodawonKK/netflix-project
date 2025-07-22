import React, { useEffect, useRef, useState } from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import { Alert } from 'bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './PopularMovieSlide.style.css';
import MovieCard from '../MovieCard/MovieCard';
import PreviewModal from '../MovieCard/PreviewModal';
import Arrow from '../../../../assets/icon/arrow.png';

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  const [hoverCardInfo, setHoverCardInfo] = useState(null);
  const [modalPos, setModalPos] = useState({ top: 0, left: 0 });
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const handleHover = (movie, ref) => {
    if (!movie || !ref?.current) {
      setHoverCardInfo(null);
      return;
    }
    const rect = ref?.current.getBoundingClientRect();
    setHoverCardInfo(movie);
    setModalPos({
      top: rect.top,
      left: rect.left + 10,
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

  return (
    <div className="popular-movie-wrap">
      <div className="kind-title">
        <h1>인기 영화</h1>
        <div className="custom-pagination"></div>
      </div>

      <div className="popular-movie-slider">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={6.5}
          spaceBetween={5}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={swiper => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
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
        <span className="custom-arrow-wrap ">
          <button ref={prevRef} className="custom-arrow custom-prev">
            <img src={Arrow} alt="왼쪽화살표" />
          </button>
        </span>
        <span className="custom-arrow-wrap arrow-next-wrap">
          <button ref={nextRef} className="custom-arrow custom-next">
            <img src={Arrow} alt="오른쪽화살표" />
          </button>
        </span>
      </div>

      {/* card-preview-modal */}
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
