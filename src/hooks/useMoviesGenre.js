import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMoviesGenre = () => {
  return api.get(`genre/movie/list?language=ko-KR&page=1`);
};

export const useMoviesGenreQuery = () => {
  return useQuery({
    queryKey: ['movie-genre'],
    queryFn: fetchMoviesGenre,
    select: result => result.data.genres,
  });
};
