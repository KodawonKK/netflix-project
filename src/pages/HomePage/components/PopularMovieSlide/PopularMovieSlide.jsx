import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MovieCard from "../MovieCard/MovieCard";
import "./PopularMovieSlide.style.css";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log(data);

  if (isLoading) {
    <h1>...Loading</h1>;
  }
  if (isError) {
    <Alert>{error.message};</Alert>;
  }
  return (
    <div className="popular-movie-wrap">
      <h1>인기 영화</h1>
      <Swiper
        modules={[Navigation]}
        slidesPerView={6.5}
        spaceBetween={5}
        navigation={true}
        loop={data?.results.length > 7}
        breakpoints={{
          280: {
            slidesPerView: 2.5
          },
          500: {
            slidesPerView: 2.5
          },
          800: {
            slidesPerView: 3.5
          },
          1100: {
            slidesPerView: 4.5
          },
          1400: {
            slidesPerView: 5.5
          },
          2400: {
            slidesPerView: 6.5
          }
        }}
        className="mySwiper"
        allowTouchMove={false}
      >
        {data?.results.map((movie, idx) => (
          <SwiperSlide key={idx}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularMovieSlide;
