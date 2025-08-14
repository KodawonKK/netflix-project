import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchMovieDetailFullInfo = movieId => {
  return api.get(
    `/movie/${movieId}?language=ko-KR&append_to_response=credits,recommendations,similar,watch/providers`
  );
};

export const useMoviesDetailFullQuery = (movieId, kind) => {
  return useQuery({
    queryKey: ['movie-detail', movieId],
    queryFn: () => fetchMovieDetailFullInfo(movieId),
    enabled: !!movieId && kind === 'movie',
    select: result => result.data,
  });
};
