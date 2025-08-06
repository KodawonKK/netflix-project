import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/movie/usePopularMovies';
import { Alert } from 'bootstrap';
import ContentSlider from '../../../../common/ContentSlider/ContentSlider';

const ContentSlide = () => {
  const {
    data: movieData,
    isLoading,
    isError,
    error,
  } = usePopularMoviesQuery();

  if (isLoading) {
    <h1>...Loading</h1>;
  }
  if (isError) {
    <Alert>{error.message};</Alert>;
  }

  return (
    <div>
      <ContentSlider
        title={'인기 영화'}
        data={movieData}
        isTopRank={false}
        kind="movie"
      />
      <ContentSlider
        title={'오늘 TOP 10 영화'}
        data={movieData}
        isTopRank={true}
        kind="movie"
      />
    </div>
  );
};

export default ContentSlide;
