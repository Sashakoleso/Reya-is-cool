import { AggregatedPosition, SortField, SortDirection } from '../../../hooks/types';

/**
 * Sort positions by the specified field and direction
 */
export const sortPositions = (
  positions: AggregatedPosition[],
  sortField: SortField,
  sortDirection: SortDirection
): AggregatedPosition[] => {
  if (positions.length === 0) return positions;

  return [...positions].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortField) {
      case 'symbol':
        aValue = a.symbol;
        bValue = b.symbol;
        break;
      case 'size':
        aValue = parseFloat(a.totalQty);
        bValue = parseFloat(b.totalQty);
        break;
      case 'value':
        aValue = parseFloat(a.positionValue);
        bValue = parseFloat(b.positionValue);
        break;
      case 'price':
        aValue = parseFloat(a.markPrice);
        bValue = parseFloat(b.markPrice);
        break;
      default:
        return 0;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });
};

/**
 * Toggle sort direction or set new field
 */
export const getNextSortState = (
  currentField: SortField,
  currentDirection: SortDirection,
  clickedField: SortField
): { field: SortField; direction: SortDirection } => {
  if (currentField === clickedField) {
    return {
      field: currentField,
      direction: currentDirection === 'asc' ? 'desc' : 'asc',
    };
  } else {
    return {
      field: clickedField,
      direction: 'asc',
    };
  }
};

/**
 * Determine if the table should show actual content or a status message
 */
export const shouldShowTableContent = (
  isLoading: boolean,
  error: string | null,
  walletAddress: string | null,
  hasPositions: boolean
): boolean => {
  return !isLoading && !error && !!walletAddress && hasPositions;
};
