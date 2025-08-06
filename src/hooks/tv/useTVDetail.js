import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchTVetailInfo = (seriesId, kind) => {
  console.log(kind);
  return api.get(`/tv/${seriesId}?language=ko-KR`);
};

export const useTVDetailQuery = (seriesId, kind) => {
  return useQuery({
    queryKey: ['tv-detail', seriesId],
    queryFn: () => fetchTVetailInfo(seriesId, kind),
    enabled: !!seriesId && kind === 'tv',
    select: result => result.data,
  });
};
