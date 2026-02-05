import {useEffect} from 'react';
import {usePricesStore} from '../store/pricesStore';
import {reyaWebSocket} from '../services/websocket/reyaWebSocket';
import {Price} from '../services/api/types';

/**
 * Custom hook that initializes and manages the WebSocket connection for price updates.
 * It automatically subscribes to price changes on mount and unsubscribes on unmount.
 */
export const usePriceUpdates = () => {
  const updatePrices = usePricesStore.updatePrices();

  useEffect(() => {
    let isMounted = true;
    let unsubscribe: (() => void) | null = null;

    /**
     * Initializes the WebSocket connection and subscribes to the prices channel.
     */
    const initializeWebSocket = async () => {
      try {
        await reyaWebSocket.connect();

        // Only subscribe if the component is still mounted to prevent memory leaks/race conditions
        if (isMounted) {
          unsubscribe = reyaWebSocket.subscribeToPrices((data) => {
            // Handle both array (initial load) and single price updates from WebSocket
            const prices = Array.isArray(data) ? data : [data];
            updatePrices(prices as Price[]);
          });
        }
      } catch (error) {
        // Ignore "Connection already in progress" errors as multiple components might trigger it
        if (error instanceof Error && !error.message.includes('already in progress')) {
          console.error('Failed to connect to WebSocket:', error);
        }
      }
    };

    initializeWebSocket();

    // Cleanup: unsubscribe and mark as unmounted
    return () => {
      isMounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [updatePrices]);
}
