import { AggregatedPosition } from '../../../hooks/types';

export type SortField = 'symbol' | 'size' | 'value' | 'price';
export type SortDirection = 'asc' | 'desc';

export type TableHeaderProps = {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
};

export type TableStateMessageProps = {
  isLoading: boolean;
  error: string | null;
  walletAddress: string | null;
  hasPositions: boolean;
};

export type PositionsTableContentProps = {
  positions: AggregatedPosition[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
};
