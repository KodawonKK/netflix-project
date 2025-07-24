import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import '../../components/TopContentsSlide/TopContentsSlide.style.css';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
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
import MovieCard from '../MovieCard/MovieCard';

const TopContentsSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  const [hoverCardInfo, setHoverCardInfo] = useState(null);
  const [modalPos, setModalPos] = useState({ top: 0, left: 0 });
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

  console.log(data);

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

  return (
    <div className="top-contents-wrap">
      <h1>오늘 TOP 10 영화</h1>
      <div className="top-contents">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={4.5}
          spaceBetween={5}
          navigation={
            {
              // prevEl: prevRef.current,
              // nextEl: nextRef.current,
            }
          }
          onBeforeInit={swiper => {
            // swiper.params.navigation.prevEl = prevRef.current;
            // swiper.params.navigation.nextEl = nextRef.current;
          }}
          // pagination={pagination}
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
          {data?.results.map(
            (movie, idx) =>
              idx < 10 && (
                <SwiperSlide key={idx}>
                  <div className="rank-wrap">
                    <div className="rank-poster">
                      <img src={rankImg[idx + 1]} alt={'top10'} />
                    </div>
                    <MovieCard
                      movie={movie}
                      onHover={handleHover}
                      type={'toprank'}
                    />
                  </div>
                </SwiperSlide>
              )
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default TopContentsSlide;
