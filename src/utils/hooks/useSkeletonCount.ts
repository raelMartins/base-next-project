import { useMemo } from 'react';

const MIN_COUNT = 4;
const MAX_COUNT = 10;

/**
 * Returns a random count between 4 and 10 for skeleton loaders.
 * The count is stable per component mount (memoized).
 */
export function useSkeletonCount(): number {
  return useMemo(
    () => MIN_COUNT + Math.floor(Math.random() * (MAX_COUNT - MIN_COUNT + 1)),
    []
  );
}
