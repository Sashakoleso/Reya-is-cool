import {FC} from 'react';
import {useWalletStore} from '../../../store/walletStore';
import {usePositionsStore} from '../../../store/positionsStore';
import { usePositionCalculations } from '../../../hooks/usePositionCalculations';
import { PositionsTableContent } from './PositionsTableContent';
import { TableStateMessage } from './TableStateMessage';
import { shouldShowTableContent } from './utils';
import { usePositionsSort } from '../../../hooks/usePositionsSort';
import * as styles from './PositionsTable.css';

export const PositionsTable: FC = () => {
  const isLoading = usePositionsStore.useIsLoadingPositions();
  const error = usePositionsStore.usePositionsError();
  const walletAddress = useWalletStore.useWalletAddress();
  const aggregatedPositions = usePositionCalculations();

  const {
    sortField,
    sortDirection,
    handleSort,
    sortedPositions
  } = usePositionsSort(aggregatedPositions);

  const showContent = shouldShowTableContent(
    isLoading,
    error,
    walletAddress,
    sortedPositions.length > 0
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Positions</h2>
      </div>
      {showContent ? (
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