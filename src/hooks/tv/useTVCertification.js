import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api';

const fetchTVCertification = (seriesId, kind) => {
  return api.get(`/tv/${seriesId}/content_ratings?language=ko-KR`);
};

export const useTVCertificationQuery = (seriesId, kind) => {
  return useQuery({
    queryKey: ['tv-certification', seriesId],
    queryFn: () => fetchTVCertification(seriesId, kind),
    enabled: !!seriesId && kind === 'tv',
    select: result => result.data,
  });
};
