import React from 'react';
import ContentSlider from '../../common/ContentSlider/ContentSlider';
import { usePopularSeriesQuery } from '../../hooks/tv/usePopularSeries';
import { useOntheAirSeriesQuery } from '../../hooks/tv/useOntheAirSeries';
import { useTopRatedSeriesQuery } from '../../hooks/tv/useTopRatedSeries';
import { useAiringSeriesQuery } from '../../hooks/tv/useAiringSeries';
import Banner from '../HomePage/components/Banner/Banner';

const SeriesPage = () => {
  const popular = usePopularSeriesQuery();
  const topRated = useTopRatedSeriesQuery();
  const onTheAir = useOntheAirSeriesQuery();
  const airing = useAiringSeriesQuery();

  const slideConfigs = [
    {
      title: '인기 TV 시리즈',
      data: popular.data,
      isTopRank: false,
    },
    {
      title: '오늘 TOP10 TV 시리즈',
      data: topRated.data,
      isTopRank: true,
    },
    {
      title: '현재 방영 중인 TV 시리즈',
      data: onTheAir.data,
      isTopRank: false,
    },
    {
      title: '상영 예정 TV 시리즈',
      data: airing.data,
      isTopRank: false,
    },
  ];

  return (
    <div>
      <Banner data={topRated.data} kind="tv" />
      {slideConfigs.map((config, idx) => (
        <ContentSlider
          key={idx}
          title={config.title}
          data={config.data}
          isTopRank={config.isTopRank}
          kind="tv"
        />
      ))}
    </div>
  );
};

export default SeriesPage;
