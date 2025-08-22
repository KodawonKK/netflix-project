import React from 'react';
import Banner from './components/Banner/Banner';
import ContentSlide from './components/ContentSlide/ContentSlide';
import { usePopularMoviesQuery } from '../../hooks/movie/usePopularMovies';
// 1.배너 => popular 영화를 들고와서 첫번 째 아이템 보여주기
// 2. popular movie
// 3. upcoming movie

const HomePage = () => {
  const { data: popular, isLoading } = usePopularMoviesQuery();
  return (
    <div>
      <Banner kind="movie" data={popular} isLoading={isLoading} />
      <ContentSlide />
    </div>
  );
};

export default HomePage;
