import React from 'react';
import ContentSlider from '../../common/ContentSlider/ContentSlider';

import { usePopularSeriesQuery } from '../../hooks/usePopularSeries';
import { useOntheAirSeriesQuery } from '../../hooks/useOntheAirSeries';
import { useTopRatedSeriesQuery } from '../../hooks/useTopRatedSeries';
import { useAiringSeriesQuery } from '../../hooks/useAiringSeries';

const SeriesPage = () => {
  const popular = usePopularSeriesQuery();
  const topRated = useTopRatedSeriesQuery();
  const onTheAir = useOntheAirSeriesQuery();
  const airing = useAiringSeriesQuery();
  const slideConfigs = [
    {
      title: '인기 TV 시리즈',
      queryKey: 'popular',
      data: popular.data,
      isTopRank: false,
    },
    {
      title: '오늘 TOP10 TV 시리즈',
      queryKey: 'top_rated',
      data: topRated.data,
      isTopRank: true,
    },
    {
      title: '현재 방영 중인 TV 시리즈',
      queryKey: 'popular',
      data: onTheAir.data,
      isTopRank: false,
    },
    {
      title: '상영 예정 TV 시리즈',
      queryKey: 'on_the_air',
      data: airing.data,
      isTopRank: false,
    },
  ];
  return (
    <div>
      {slideConfigs.map((config, idx) => (
        <ContentSlider
          key={idx}
          title={config.title}
          data={config.data}
          isTopRank={config.isTopRank}
        />
      ))}
    </div>
  );
};

export default SeriesPage;
