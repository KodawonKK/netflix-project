import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchPopularSeries = () => {
  return api.get(`/tv/popular?language=ko-KR&page=1`);
};

export const usePopularSeriesQuery = () => {
  return useQuery({
    queryKey: ['series-popular'],
    queryFn: fetchPopularSeries,
    select: result => result.data,
  });
};
