import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieDetailInfo = movieId => {
  return api.get(`/movie/${movieId}?language=ko-KR`);
};

export const useMoviesDetailQuery = movieId => {
  return useQuery({
    queryKey: ['movie-detail', movieId],
    queryFn: () => fetchMovieDetailInfo(movieId),
    enabled: !!movieId,
    select: result => result.data,
  });
};
