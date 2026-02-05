import { useState, useCallback, useMemo } from 'react';
import { AggregatedPosition, SortField, SortDirection } from './types';
import { sortPositions, getNextSortState } from '../components/Portfolio/PositionsTable/utils';

export const usePositionsSort = (positions: AggregatedPosition[]) => {
  const [sortField, setSortField] = useState<SortField>('symbol');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = useCallback((field: SortField) => {
    setSortField((prevField) => {
      const nextState = getNextSortState(prevField, sortDirection, field);
      setSortDirection(nextState.direction);
      return nextState.field;
    });
  }, [sortDirection]);

  const sortedPositions = useMemo(() => {
    return sortPositions(positions, sortField, sortDirection);
  }, [positions, sortField, sortDirection]);

  return {
    sortField,
    sortDirection,
    handleSort,
    sortedPositions,
  };
};
