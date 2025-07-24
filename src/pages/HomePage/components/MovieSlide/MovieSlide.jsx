import React, { useRef, useState } from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import { Alert } from 'bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './MovieSlide.style.css';
import MovieCard from '../MovieCard/MovieCard';
import PreviewModal from '../MovieCard/PreviewModal';
import Arrow from '../../../../assets/icon/arrow.png';
import rank1 from '../../../../assets/icon/rank1.svg';
import rank2 from '../../../../assets/icon/rank2.svg';
import rank3 from '../../../../assets/icon/rank3.svg';
import rank4 from '../../../../assets/icon/rank4.svg';
import rank5 from '../../../../assets/icon/rank5.svg';
import rank6 from '../../../../assets/icon/rank6.svg';
import rank7 from '../../../../assets/icon/rank7.svg';
import rank8 from '../../../../assets/icon/rank8.svg';
import rank9 from '../../../../assets/icon/rank9.svg';
import rank10 from '../../../../assets/icon/rank10.svg';

const MovieSlide = ({ title, isTopRank }) => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  const [hoverCardInfo, setHoverCardInfo] = useState(null);
  const [modalPos, setModalPos] = useState({ top: 0, left: 0 });
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const rankImg = {
    1: rank1,
    2: rank2,
    3: rank3,
    4: rank4,
    5: rank5,
    6: rank6,
    7: rank7,
    8: rank8,
    9: rank9,
    10: rank10,
  };

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
    <div className="movie-slider-wrap">
      <div className="kind-title">
        <h1>{title}</h1>
        <div className="custom-pagination"></div>
      </div>

      <div className={isTopRank ? 'movie-slider top-contents' : 'movie-slider'}>
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
          {data?.results.map((movie, idx) => {
            if (isTopRank && idx > 10) return null;
            return (
              <SwiperSlide key={idx}>
                <div className={isTopRank ? 'rank-wrap' : ''}>
                  {isTopRank && (
                    <div className="rank-poster">
                      <img src={rankImg[idx + 1]} alt={`top${idx + 1}`} />
                    </div>
                  )}
                  <MovieCard
                    movie={movie}
                    onHover={handleHover}
                    type={isTopRank ? 'toprank' : ''}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {/* arrows */}
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

      {/* preview-modal */}
      <PreviewModal
        movie={hoverCardInfo}
        position={modalPos}
        onMouseEnter={() => setHoverCardInfo(hoverCardInfo)}
        onMouseLeave={() => setHoverCardInfo(null)}
      />
    </div>
  );
};

export default MovieSlide;
