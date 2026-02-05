import {FC, useMemo, useState, useCallback} from 'react';
import {useWalletStore} from '../../../store/walletStore';
import {usePositionsStore} from '../../../store/positionsStore';
import { usePositionCalculations } from '../../../hooks/usePositionCalculations';
import { PositionsTableContent } from './PositionsTableContent';
import { TableStateMessage } from './TableStateMessage';
import { SortField, SortDirection } from './types';
import { sortPositions, getNextSortState } from './utils';
import * as styles from './PositionsTable.css';

export const PositionsTable: FC = () => {
  const isLoading = usePositionsStore.isLoadingPositions();
  const error = usePositionsStore.positionsError();
  const walletAddress = useWalletStore.walletAddress();
  const aggregatedPositions = usePositionCalculations();

  const [sortField, setSortField] = useState<SortField>('symbol');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = useCallback((field: SortField) => {
    setSortField((prevField) => {
      // Use a temporary variable to capture the new direction based on prevField and current sortDirection
      // Note: sortDirection from scope might be stale if multiple updates happen, but usually it's fine for UI
      const nextState = getNextSortState(prevField, sortDirection, field);
      setSortDirection(nextState.direction);
      return nextState.field;
    });
  }, [sortDirection]);

  const sortedPositions = useMemo(() => {
    return sortPositions(aggregatedPositions, sortField, sortDirection);
  }, [aggregatedPositions, sortField, sortDirection]);

  const hasPositions = !isLoading && !error && walletAddress && sortedPositions.length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Positions</h2>
      </div>

      {hasPositions ? (
        <PositionsTableContent
          positions={sortedPositions}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      ) : (
        <TableStateMessage
          isLoading={isLoading}
          error={error}
          walletAddress={walletAddress}
          hasPositions={sortedPositions.length > 0}
        />
      )}
    </div>
  );
}