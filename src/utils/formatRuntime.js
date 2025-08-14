import React from 'react';

export const formatRuntime = orgRuntime => {
  const runHours = Math.floor(orgRuntime / 60);
  const runMinutes = orgRuntime % 60;
  return `${runHours}시간 ${runMinutes}분`;
};
