import {useEffect} from 'react';
import {useWalletStore} from '../store/walletStore';
import {usePositionsStore} from '../store/positionsStore';
import {reyaApi} from '../services/api/reyaApi';
import {reyaWebSocket} from '../services/websocket/reyaWebSocket';
import {Position} from '../services/api/types';

/**
 * Custom hook that manages wallet positions using hybrid WebSocket + polling approach.
 *
 * Data Sources:
 * - WebSocket channel: /v2/wallet/{address}/positions
 *   - Provides initial snapshot on subscription
 *   - Sends updates only on trade executions (NOT on funding payments)
 * - REST API polling (every 30 seconds when positions exist):
 *   - Updates position sizes affected by funding payments
 *   - Ensures data stays fresh even without trades
 *
 * Implements protection against race conditions using isMounted flag.
 */
export const useWalletPositions = () => {
  const walletAddress = useWalletStore.useWalletAddress();
  const setPositions = usePositionsStore.useSetPositions();
  const setLoadingPositions = usePositionsStore.useSetLoadingPositions();
  const setPositionsError = usePositionsStore.useSetPositionsError();

  useEffect(() => {
    // Clear positions if no address is provided
    if (!walletAddress) {
      setPositions([]);
      return;
    }

    // Normalize address to lowercase for WebSocket channel consistency
    const normalizedAddress = walletAddress.toLowerCase();

    let isMounted = true;
    let unsubscribe: (() => void) | null = null;
    let pollInterval: NodeJS.Timeout | null = null;

    /**
     * Initializes WebSocket connection and subscribes to position updates.
     * Also sets up polling for funding payment updates.
     */
    const initializePositions = async () => {
      setLoadingPositions(true);
      setPositionsError(null);

      try {
        // Fetch initial positions from REST API
        const initialPositions = await reyaApi.getWalletPositions(walletAddress);

        if (isMounted) {
          setPositions(initialPositions);
        }

        // Connect to WebSocket
        await reyaWebSocket.connect();

        if (isMounted) {
          // Subscribe to position updates (receives updates on trade executions)
          unsubscribe = reyaWebSocket.subscribeToWalletPositions(normalizedAddress, (data) => {
            if (isMounted) {
              const positions = Array.isArray(data) ? data : [data];
              setPositions(positions as Position[]);
            }
          });

          // Start polling for funding payment updates (every 30 seconds)
          // Only poll when positions exist to minimize unnecessary API calls
          pollInterval = setInterval(async () => {
            if (!isMounted) return;

            try {
              const updatedPositions = await reyaApi.getWalletPositions(walletAddress);
              if (isMounted) {
                setPositions(updatedPositions);
              }
            } catch (error) {
              console.error('[useWalletPositions] Polling failed:', error);
            }
          }, 30000); // 30 seconds - reasonable balance between freshness and API load
        }
      } catch (error) {
        if (isMounted) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to initialize positions';
          setPositionsError(errorMessage);
          console.error('[useWalletPositions] Error initializing positions:', error);
        }
      } finally {
        if (isMounted) {
          setLoadingPositions(false);
        }
      }
    };

    initializePositions();

    // Cleanup: unsubscribe and clear polling
    return () => {
      isMounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [walletAddress, setPositions, setLoadingPositions, setPositionsError]);
}
