import {create} from 'zustand';
import {PricesState} from './types';
import {getMarkPrice, isPriceChangeSignificant} from '../utils/calculations';

/**
 * Store for managing real-time asset prices.
 * Implements "Smart Throttling" logic to ignore insignificant price changes.
 */
const usePricesStoreBase = create<PricesState>((set, get) => ({
  /** Map of asset prices keyed by symbol */
  prices: {},

  /** 
   * Updates multiple prices in the store.
   * Only updates the state if the price change is significant (> 0.01%).
   * This prevents excessive re-renders during high market volatility.
   */
  updatePrices: (prices) => {
    const currentPrices = get().prices;
    const updatedPrices = {...currentPrices};
    let hasChanges = false;

    prices.forEach((price) => {
      const oldPrice = currentPrices[price.symbol];

      // Use getMarkPrice to determine the actual price being used for calculations (Oracle or Pool)
      const oldMarkPrice = oldPrice ? getMarkPrice(price.symbol, currentPrices) : '0';
      const newMarkPrice = getMarkPrice(price.symbol, {[price.symbol]: price});

      // Update only if it's a new price or if the change is significant
      if (!oldPrice || isPriceChangeSignificant(oldMarkPrice, newMarkPrice)) {
        updatedPrices[price.symbol] = price;
        hasChanges = true;
      }
    });

    if (hasChanges) {
      set({prices: updatedPrices});
    }
  },
}));

/**
 * Exported hooks for accessing pricesStore state and actions.
 */
export const usePricesStore = Object.assign(usePricesStoreBase, {
  prices: () => usePricesStoreBase((state) => state.prices),
  updatePrices: () => usePricesStoreBase((state) => state.updatePrices),
});
