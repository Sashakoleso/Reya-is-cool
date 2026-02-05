import {Position, Price} from '../services/api/types';

/**
 * Calculates the USD value of a position.
 * Formula: |Quantity| * Mark Price
 * @param qty The position quantity (can be negative for shorts).
 * @param markPrice The current mark price of the asset.
 * @returns Formatted USD value string with 2 decimal places.
 */
export const calculatePositionValue = (qty: string, markPrice: string): string => {
  const base = parseFloat(qty);
  const price = parseFloat(markPrice);

  if (isNaN(base) || isNaN(price)) return '0';

  return (Math.abs(base) * price).toFixed(2);
}

/**
 * Determines the mark price for a given symbol from the prices map.
 * Priority: oraclePrice -> poolPrice (fallback).
 * @param symbol The asset symbol.
 * @param prices Map of available prices.
 * @returns The selected mark price as a string.
 */
export const getMarkPrice = (symbol: string, prices: Record<string, Price>): string => {
  const price = prices[symbol];
  if (!price) return '0';

  // Use oraclePrice as primary and poolPrice as fallback if oracle is unavailable or 0
  return price.oraclePrice && price.oraclePrice !== '0' ? price.oraclePrice : price.poolPrice;
}

/**
 * Aggregates multiple positions for the same symbol into a single entry.
 * Net exposure is calculated by summing quantities (Long +, Short -).
 * @param positions Array of raw positions from API.
 * @param prices Current prices for calculation.
 * @returns A Map where keys are symbols and values are aggregated position data.
 */
export const aggregatePositions = (positions: Position[], prices: Record<string, Price>): Map<string, {
  symbol: string; totalQty: number; side: 'B' | 'S'; markPrice: string; positionValue: string;
}> => {
  const aggregated = new Map<string, {
    symbol: string; totalQty: number; side: 'B' | 'S'; markPrice: string; positionValue: string;
  }>();

  positions.forEach((position) => {
    const existing = aggregated.get(position.symbol);
    const qty = parseFloat(position.qty);

    if (existing) {
      // Aggregate quantities: side 'B' is Long, 'S' is Short
      if (position.side === 'B') {
        existing.totalQty += qty;
      } else {
        existing.totalQty -= qty;
      }
    } else {
      // Initialize new aggregated entry
      const totalQty = position.side === 'B' ? qty : -qty;
      const markPrice = getMarkPrice(position.symbol, prices);
      const positionValue = calculatePositionValue(Math.abs(totalQty).toString(), markPrice);

      aggregated.set(position.symbol, {
        symbol: position.symbol, totalQty, side: totalQty >= 0 ? 'B' : 'S', markPrice, positionValue,
      });
    }
  });

  // Recalculate position values and sides after final aggregation
  aggregated.forEach((position) => {
    const markPrice = getMarkPrice(position.symbol, prices);
    position.markPrice = markPrice;
    position.positionValue = calculatePositionValue(Math.abs(position.totalQty).toString(), markPrice);
    position.side = position.totalQty >= 0 ? 'B' : 'S';
  });

  return aggregated;
}

/**
 * Checks if the price change between old and new values is significant enough to warrant a state update.
 * Threshold is set to 0.01% (0.0001).
 * @param oldPrice Previous mark price.
 * @param newPrice New mark price.
 * @returns True if change > 0.01% or if it's the first price.
 */
export const isPriceChangeSignificant = (oldPrice: string, newPrice: string): boolean => {
  const old = parseFloat(oldPrice);
  const newP = parseFloat(newPrice);

  if (isNaN(old) || isNaN(newP) || old === 0) return true;

  const change = Math.abs((newP - old) / old);
  return change > 0.0001; // 0.01%
}
