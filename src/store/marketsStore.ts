import {create} from 'zustand';
import {MarketsState} from './types';

/**
 * Store for managing market definitions.
 * Market definitions include metadata about trading pairs, such as max leverage.
 */
const useMarketsStoreBase = create<MarketsState>((set) => ({
  /** Array of available market definitions */
  markets: [], 
  /** Updates the markets list in the store */
  setMarkets: (markets) => set({markets}),
}));

/**
 * Exported hooks for accessing marketsStore state and actions.
 * Using a selector-based pattern for better performance and easier access.
 */
export const useMarketsStore = Object.assign(useMarketsStoreBase, {
  useMarkets: () => useMarketsStoreBase((state) => state.markets),
  useSetMarkets: () => useMarketsStoreBase((state) => state.setMarkets),
});
