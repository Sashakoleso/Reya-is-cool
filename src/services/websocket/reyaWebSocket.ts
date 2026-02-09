/**
 * WebSocket service for real-time updates from Reya DEX.
 * Main entry point that exports the public API.
 */
import {connect, disconnect, isConnected} from './connection';
import {subscribe, unsubscribe, subscribeToPrices, subscribeToWalletPositions} from './subscriptions';

export const reyaWebSocket = {
  connect,
  disconnect,
  subscribe,
  unsubscribe,
  subscribeToPrices,
  subscribeToWalletPositions,
  isConnected,
};
