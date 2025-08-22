import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchTVetailFullInfo = (seriesId, kind) => {
  return api.get(
    `/tv/${seriesId}?language=ko-KR&append_to_response=credits,recommendations,similar/aggregate_credits`
  );
};

export const useTVDetailFullQuery = (seriesId, kind) => {
  return useQuery({
    queryKey: ['tv-detail-full', seriesId],
    queryFn: () => fetchTVetailFullInfo(seriesId, kind),
    enabled: !!seriesId && kind === 'tv',
    select: result => result.data,
  });
};
