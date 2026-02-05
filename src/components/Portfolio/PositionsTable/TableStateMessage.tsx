import {FC} from "react";
import { TableStateMessageProps } from './types';
import * as styles from './PositionsTable.css';

export const TableStateMessage: FC<TableStateMessageProps> = ({
  isLoading,
  error,
  walletAddress,
  hasPositions,
}) => {
  if (isLoading) {
    return <div className={styles.loadingState}>Loading positions...</div>;
  }

  if (error) {
    return <div className={styles.errorState}>{error}</div>;
  }

  if (!walletAddress) {
    return <div className={styles.emptyState}>Enter a wallet address to view positions</div>;
  }

  if (!hasPositions) {
    return <div className={styles.emptyState}>No positions found for this wallet</div>;
  }

  return null;
};
