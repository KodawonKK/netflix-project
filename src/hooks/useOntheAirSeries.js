import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchOntheAirSeries = () => {
  return api.get(`/tv/on_the_air?language=ko-KR&page=1`);
};

export const useOntheAirSeriesQuery = () => {
  return useQuery({
    queryKey: ['series-ontheair'],
    queryFn: fetchOntheAirSeries,
    select: result => result.data,
  });
};
