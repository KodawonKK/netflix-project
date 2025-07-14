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
      <h1>인기 시리즈</h1>
      <Swiper modules={[Navigation]} slidesPerView={6.5} spaceBetween={30} navigation={true} loop={true} className="mySwiper" allowTouchMove={false}>
        {data?.results.map((movie, idx) => (
          <SwiperSlide>
            <MovieCard movie={movie} key={idx} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularMovieSlide;
