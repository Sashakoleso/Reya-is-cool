import {useEffect} from 'react';
import {useWalletStore} from '../store/walletStore';
import {usePositionsStore} from '../store/positionsStore';
import {reyaApi} from '../services/api/reyaApi';
import {reyaWebSocket} from '../services/websocket/reyaWebSocket';
import {Position} from '../services/api/types';

/**
 * Custom hook that fetches and manages wallet positions from the REST API and WebSocket.
 * It reacts to changes in the wallet address and updates the positionsStore.
 * Implements protection against race conditions using isMounted flag.
 */
export const useWalletPositions = () => {
  const walletAddress = useWalletStore.useWalletAddress();
  const setPositions = usePositionsStore.useSetPositions();
  const updatePositions = usePositionsStore.useUpdatePositions();
  const setLoadingPositions = usePositionsStore.useSetLoadingPositions();
  const setPositionsError = usePositionsStore.useSetPositionsError();

  useEffect(() => {
    // Clear positions if no address is provided
    if (!walletAddress) {
      setPositions([]);
      return;
    }

    let isMounted = true;
    let unsubscribe: (() => void) | null = null;

    /**
     * Fetches positions for the current wallet address and sets up WebSocket subscription.
     */
    const initializePositions = async () => {
      setLoadingPositions(true);
      setPositionsError(null);

      try {
        // Initial fetch from REST API
        const positions = await reyaApi.getWalletPositions(walletAddress);
        
        if (isMounted) {
          setPositions(positions);
        }

        // Connect to WebSocket and subscribe to position updates
        await reyaWebSocket.connect();

        if (isMounted) {
          unsubscribe = reyaWebSocket.subscribeToWalletPositions(walletAddress, (data) => {
            if (isMounted) {
              // Use updatePositions to merge changes instead of replacing everything
              const updatedPositions = Array.isArray(data) ? data : [data];
              updatePositions(updatedPositions as Position[]);
            }
          });
        }
      } catch (error) {
        if (isMounted) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to initialize positions';
          setPositionsError(errorMessage);
          console.error('Error initializing positions:', error);
        }
      } finally {
        if (isMounted) {
          setLoadingPositions(false);
        }
      }
    };

    /**
     * Background refresh to ensure data integrity
     */
    const refreshData = async () => {
      try {
        const positions = await reyaApi.getWalletPositions(walletAddress);
        if (isMounted) {
          updatePositions(positions);
        }
      } catch (error) {
        console.error('Background positions refresh failed:', error);
      }
    };

    initializePositions();

    const interval = setInterval(refreshData, 10000);

    // Cleanup: unsubscribe and mark as unmounted
    return () => {
      isMounted = false;
      clearInterval(interval);
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [walletAddress, setPositions, updatePositions, setLoadingPositions, setPositionsError]);
}
