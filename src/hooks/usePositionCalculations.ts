import {useMemo} from 'react';
import {usePositionsStore} from '../store/positionsStore';
import {usePricesStore} from '../store/pricesStore';
import {aggregatePositions} from '../utils/calculations';
import {AggregatedPosition} from "./types.ts";

/**
 * Custom hook that calculates and aggregates positions for display in the UI.
 * It combines raw position data from positionsStore with real-time prices from pricesStore.
 * 
 * @returns Array of aggregated positions ready for rendering in a table.
 */
export const usePositionCalculations = (): AggregatedPosition[] => {
  const positions = usePositionsStore.usePositions();
  const prices = usePricesStore.usePrices();

  return useMemo(() => {
    // 1. Group positions by symbol and calculate net exposure
    const aggregated = aggregatePositions(positions, prices);

    // 2. Transform the Map into a flat array and format values for the UI
    return Array.from(aggregated.values()).map((pos) => ({
      symbol: pos.symbol,
      totalQty: Math.abs(pos.totalQty).toFixed(2),
      side: pos.side,
      positionValue: pos.positionValue,
      markPrice: pos.markPrice,
    }));
  }, [positions, prices]);
}
