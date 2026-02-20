import {useCallback, useMemo, useState} from 'react';
import {AggregatedPosition, SortDirection, SortField} from './types';
import {getNextSortState, sortPositions} from '../components/Portfolio/PositionsTable/utils';

export const usePositionsSort = (positions: AggregatedPosition[]) => {
  const [sortField, setSortField] = useState<SortField>('symbol');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = useCallback((field: SortField) => {
    const nextState = getNextSortState(sortField, sortDirection, field);
    setSortField(nextState.field);
    setSortDirection(nextState.direction);
  }, [sortField, sortDirection]);

  const sortedPositions = useMemo(() => {
    return sortPositions(positions, sortField, sortDirection);
  }, [positions, sortField, sortDirection]);

  return {
    sortField, sortDirection, handleSort, sortedPositions,
  };
};
