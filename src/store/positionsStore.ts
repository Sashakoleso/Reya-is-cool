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
  useSetLoadingPositions: () => usePositionsStoreBase((state) => state.setLoadingPositions),
  useSetPositionsError: () => usePositionsStoreBase((state) => state.setPositionsError),
});
