import React from 'react';
import ContentSlider from '../../common/ContentSlider/ContentSlider';
import { usePopularMoviesQuery } from '../../hooks/movie/usePopularMovies';
import { useTopRatedMoviesQuery } from '../../hooks/movie/useTopRatedMovies';
import { useNowPlayingMoviesQuery } from '../../hooks/movie/useNowPlayingMovies';
import { useUpcomingMoviesQuery } from '../../hooks/movie/useUpcomingMovies';
import Banner from '../HomePage/components/Banner/Banner';

const MoviePage = () => {
  const popular = usePopularMoviesQuery();
  const topRated = useTopRatedMoviesQuery();
  const playing = useNowPlayingMoviesQuery();
  const upComing = useUpcomingMoviesQuery();

  const slideConfigs = [
    {
      title: '인기 영화',
      data: popular.data,
      isTopRank: false,
    },
    {
      title: '오늘 TOP10 영화',
      data: topRated.data,
      isTopRank: true,
    },
    {
      title: '현재 상영 중인 영화',
      data: playing.data,
      isTopRank: false,
    },
    {
      title: '상영 예정 영화',
      data: upComing.data,
      isTopRank: false,
    },
  ];
  return (
    <div>
      <Banner data={popular.data} kind="movie" />
      {slideConfigs.map((config, idx) => (
        <ContentSlider
          key={idx}
          title={config.title}
          data={config.data}
          isTopRank={config.isTopRank}
          kind="movie"
        />
      ))}
    </div>
  );
};

export default MoviePage;
