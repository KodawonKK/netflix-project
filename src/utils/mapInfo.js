import React from 'react';
import { formatRuntime } from './formatRuntime';

export const mapInfo = (kind, fullInfo, movieGrade, tvGrade) => {
  const movieCertData = movieGrade?.find(item => item.iso_3166_1 === 'KR');
  const movieCert = movieCertData?.release_dates[0]?.certification || '15';
  const tvCert =
    tvGrade?.results?.find(item => item.iso_3166_1 === 'KR')?.rating || 'ALL';

  return {
    imgUrl: `https://image.tmdb.org/t/p/original${fullInfo?.backdrop_path}`,
    release:
      kind === 'movie'
        ? fullInfo?.release_date.split('-')[0]
        : fullInfo?.seasons[0]?.air_date.split('-')[0],
    runtimeKR:
      kind === 'movie'
        ? formatRuntime(fullInfo?.runtime)
        : fullInfo?.number_of_seasons === 1
        ? `에피소드 ${fullInfo?.number_of_episodes}개`
        : `시즌 ${fullInfo?.number_of_seasons}개`,
    overView: fullInfo?.overview,
    cast: fullInfo?.credits ? fullInfo?.credits.cast : [],
    recommend: fullInfo?.recommendations?.results ?? [],
    title: kind === 'movie' ? fullInfo?.title : fullInfo?.name,
    movieCert,
    tvCert,
  };
};
