import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchMovieVideo = movieId => {
  return api.get(`/movie/${movieId}/videos`);
};

export const useMovieVideoQuery = (movieId, kind) => {
  return useQuery({
    queryKey: ['movie-video', movieId],
    queryFn: () => fetchMovieVideo(movieId),
    enabled: !!movieId && kind === 'movie',
    select: result => result.data.results,
  });
};
