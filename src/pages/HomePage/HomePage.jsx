import React from 'react';
import Banner from './components/Banner/Banner';
import MovieSlide from './components/MovieSlide/MovieSlide';
// 1.배너 => popular 영화를 들고와서 첫번 째 아이템 보여주기
// 2. popular movie
// 3. upcoming movie

const HomePage = () => {
  return (
    <div>
      <Banner />
      {/* <PopularMovieSlide />
      <TopContentsSlide /> */}
      <MovieSlide title={'인기 영화'} isTopRank={false} />
      <MovieSlide title={'오늘 TOP 10 영화'} isTopRank={true} />
    </div>
  );
};

export default HomePage;
