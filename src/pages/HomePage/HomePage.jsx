import React from "react";
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";

// 1.배너 => popular 영화를 들고와서 첫번 째 아이템 보여주기
// 2. popular movie
// 3. upcoming movie

const HomePage = () => {
  return (
    <div>
      <Banner />
      <PopularMovieSlide />
    </div>
  );
};

export default HomePage;
