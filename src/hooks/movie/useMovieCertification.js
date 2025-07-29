import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchMovieCertification = movieId => {
  return api.get(`/movie/${movieId}/release_dates`);
};

export const useMoviesCertificationQuery = movieId => {
  return useQuery({
    queryKey: ['movie-certification', movieId],
    queryFn: () => fetchMovieCertification(movieId),
    enabled: !!movieId,
    select: result => result.data.results,
  });
};
