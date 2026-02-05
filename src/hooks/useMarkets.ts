import {useEffect} from 'react';
import {useMarketsStore} from '../store/marketsStore';
import {reyaApi} from '../services/api/reyaApi';

/**
 * Custom hook that fetches market definitions on initial mount.
 * Market definitions are used to get metadata like max leverage for each trading pair.
 */
export const useMarkets = () => {
  const setMarkets = useMarketsStore.useSetMarkets();

  useEffect(() => {
    let isMounted = true;
    
    /**
     * Fetches market definitions from the REST API.
     */
    const fetchMarkets = async () => {
      try {
        const markets = await reyaApi.getMarketDefinitions();
        if (isMounted) {
          setMarkets(markets);
        }
      } catch (error) {
        console.error('Failed to fetch markets:', error);
      }
    };

    fetchMarkets();

    // Cleanup: prevent state updates on unmount
    return () => {
      isMounted = false;
    };
  }, [setMarkets]);
}
