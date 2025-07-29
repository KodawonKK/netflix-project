import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchAiringSeries = () => {
  return api.get(`/tv/airing_today?language=ko-KR&page=1`);
};

export const useAiringSeriesQuery = () => {
  return useQuery({
    queryKey: ['series-airing'],
    queryFn: fetchAiringSeries,
    select: result => result.data,
  });
};
