import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchMovieCertification = movieId => {
  return api.get(`/movie/${movieId}/release_dates`);
};

export const useMoviesCertificationQuery = (movieId, kind) => {
  return useQuery({
    queryKey: ['movie-certification', movieId],
    queryFn: () => fetchMovieCertification(movieId),
    enabled: !!movieId && kind === 'movie',
    select: result => result.data.results,
  });
};
