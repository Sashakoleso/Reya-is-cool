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
  walletAddress: () => useWalletStoreBase((state) => state.walletAddress),
  isWalletAddressValid: () => useWalletStoreBase((state) => state.isWalletAddressValid),
  setWalletAddress: () => useWalletStoreBase((state) => state.setWalletAddress),
  setIsWalletAddressValid: () => useWalletStoreBase((state) => state.setIsWalletAddressValid),
});
