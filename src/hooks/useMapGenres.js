import React, { useMemo } from 'react';

export const useMapGenres = genres => {
  return useMemo(() => {
    return (
      genres?.reduce((map, g) => {
        map[g.id] = g.name;
        return map;
      }, {}) || {}
    );
  }, [genres]);
};
