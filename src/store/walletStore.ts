import {create} from 'zustand';
import {WalletState} from './types';

/**
 * Store for managing the current wallet address and its validity.
 */
const useWalletStoreBase = create<WalletState>((set) => ({
  /** Current wallet address (0x...) or null if not set */
  walletAddress: null,
  /** Whether the current wallet address format is valid */
  isWalletAddressValid: true,

  /** Updates the current wallet address */
  setWalletAddress: (address) => set({walletAddress: address}),
  /** Updates the validity state of the wallet address */
  setIsWalletAddressValid: (isValid) => set({isWalletAddressValid: isValid}),
}));

/**
 * Exported hooks for accessing walletStore state and actions.
 */
export const useWalletStore = Object.assign(useWalletStoreBase, {
  useWalletAddress: () => useWalletStoreBase((state) => state.walletAddress),
  useIsWalletAddressValid: () => useWalletStoreBase((state) => state.isWalletAddressValid),
  useSetWalletAddress: () => useWalletStoreBase((state) => state.setWalletAddress),
  useSetIsWalletAddressValid: () => useWalletStoreBase((state) => state.setIsWalletAddressValid),
});
