import React from 'react';
import { formatRuntime } from './formatRuntime';

export const mapInfo = (kind, selectedInfo, fullInfo) => {
  return {
    imgUrl: `https://image.tmdb.org/t/p/original${selectedInfo?.backdrop_path}`,
    release:
      kind === 'movie'
        ? selectedInfo.release_date.split('-')[0]
        : selectedInfo.seasons[0].air_date.split('-')[0],
    runtimeKR:
      kind === 'movie'
        ? formatRuntime(selectedInfo?.runtime)
        : selectedInfo?.number_of_seasons === 1
        ? selectedInfo.seasons?.[0]?.name
        : `시즌 ${selectedInfo?.number_of_seasons}개`,
    overView: selectedInfo?.overview,
    cast: fullInfo?.credits ? fullInfo?.credits.cast : [],
    recommend: fullInfo?.recommendations?.results ?? [],
  };
};
