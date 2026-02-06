import {create} from 'zustand';
import {PositionsState} from './types';

/**
 * Store for managing user trading positions.
 * Handles the raw position data fetched from the API.
 */
const usePositionsStoreBase = create<PositionsState>((set) => ({
  /** List of raw positions for the current wallet */
  positions: [], /** Loading state for positions fetch operations */
  isLoadingPositions: false, /** Error message if positions fetch fails */
  positionsError: null,

  /** Updates the positions list */
  setPositions: (positions) => set({positions}),

  /** Updates or adds specific positions in the list */
  updatePositions: (updates) => set((state) => {
    const newPositions = [...state.positions];
    updates.forEach((update) => {
      // Find if this position already exists (by symbol and maybe other unique fields if applicable)
      // In this API, symbol + account seems to be the key, but let's stick to symbol for now
      // as it's the primary grouping factor in the UI.
      const index = newPositions.findIndex((p) => p.symbol === update.symbol);
      if (index !== -1) {
        newPositions[index] = {...newPositions[index], ...update};
      } else {
        newPositions.push(update);
      }
    });
    return {positions: newPositions};
  }),

  /** Updates the loading state */
  setLoadingPositions: (loading) => set({isLoadingPositions: loading}),

  /** Sets an error message */
  setPositionsError: (error) => set({positionsError: error}),
}));

/**
 * Exported hooks for accessing positionsStore state and actions.
 */
export const usePositionsStore = Object.assign(usePositionsStoreBase, {
  usePositions: () => usePositionsStoreBase((state) => state.positions),
  useIsLoadingPositions: () => usePositionsStoreBase((state) => state.isLoadingPositions),
  usePositionsError: () => usePositionsStoreBase((state) => state.positionsError),
  useSetPositions: () => usePositionsStoreBase((state) => state.setPositions),
  useUpdatePositions: () => usePositionsStoreBase((state) => state.updatePositions),
  useSetLoadingPositions: () => usePositionsStoreBase((state) => state.setLoadingPositions),
  useSetPositionsError: () => usePositionsStoreBase((state) => state.setPositionsError),
});
