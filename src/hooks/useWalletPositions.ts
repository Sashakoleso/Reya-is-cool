import {useEffect} from 'react';
import {useWalletStore} from '../store/walletStore';
import {usePositionsStore} from '../store/positionsStore';
import {reyaWebSocket} from '../services/websocket/reyaWebSocket';
import {reyaApi} from '../services/api/reyaApi';
import {Position} from '../services/api/types';

/**
 * Custom hook that manages wallet positions using hybrid WebSocket + polling approach.
 *
 * Data Sources:
 * - WebSocket channel: /v2/wallet/{address}/positions
 *   - Provides initial snapshot on subscription
 *   - NOTE: Does NOT send real-time updates via channel_data
 * - REST API polling (every 10 seconds):
 *   - Updates position sizes (Market and Size values change over time)
 *   - Ensures data stays fresh
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
     * Also sets up polling for continuous updates.
     */
    const initializePositions = async () => {
      setLoadingPositions(true);
      setPositionsError(null);

      try {
        // Connect to WebSocket
        await reyaWebSocket.connect();

        if (isMounted) {
          // Subscribe to position updates (receives initial snapshot only)
          unsubscribe = reyaWebSocket.subscribeToWalletPositions(normalizedAddress, (data) => {
            if (isMounted) {
              const positions = Array.isArray(data) ? data : [data];
              setPositions(positions as Position[]);
            }
          });

          // Start polling for position updates (every 10 seconds)
          // WebSocket does NOT send channel_data updates for positions
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
