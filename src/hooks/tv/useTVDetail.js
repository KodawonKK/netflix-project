import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchTVetailInfo = seriesId => {
  return api.get(`/tv/${seriesId}?language=ko-KR`);
};

export const useTVDetailQuery = seriesId => {
  return useQuery({
    queryKey: ['tv-detail', seriesId],
    queryFn: () => fetchTVetailInfo(seriesId),
    enabled: !!seriesId,
    select: result => result.data,
  });
};
