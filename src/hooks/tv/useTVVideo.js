import api from '../../utils/api';
import { useQuery } from '@tanstack/react-query';

const fetchTVVideo = seriesId => {
  return api.get(`tv/${seriesId}/videos`);
};

export const useTVVideoQuery = (seriesId, kind) => {
  return useQuery({
    queryKey: ['tv-video', seriesId],
    queryFn: () => fetchTVVideo(seriesId),
    enabled: !!seriesId && kind === 'tv',
    select: result => result.data.results,
  });
};
