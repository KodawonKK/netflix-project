import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchNowPlayingMovies = () => {
  return api.get(`/movie/now_playing?language=ko-KR&page=1`);
};

export const useNowPlayingMoviesQuery = () => {
  return useQuery({
    queryKey: ['movie-now'],
    queryFn: fetchNowPlayingMovies,
    select: result => result.data,
  });
};
