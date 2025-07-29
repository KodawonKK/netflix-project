import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchTopRatedSeries = () => {
  return api.get(`/tv/top_rated?language=ko-KR&page=1`);
};

export const useTopRatedSeriesQuery = () => {
  return useQuery({
    queryKey: ['series-top_rated'],
    queryFn: fetchTopRatedSeries,
    select: result => result.data,
  });
};
