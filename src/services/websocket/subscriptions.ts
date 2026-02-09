/**
 * WebSocket subscription management
 */
import {MessageHandler, SubscribeMessage} from './types';
import {Position, Price} from '../api/types';
import {messageHandlers, subscriptions, ws} from './state';
import {isWebSocketOpen, sendMessage} from './utils';

/**
 * Sends a subscription message for a specific channel
 */
export const subscribe = (channel: string): void => {
  if (!isWebSocketOpen(ws)) {
    subscriptions[channel] = true;
    return;
  }

  const message: SubscribeMessage = {
    type: 'subscribe',
    channel,
  };

  if (sendMessage(ws, message)) {
    subscriptions[channel] = true;
  }
};

/**
 * Unsubscribes from a channel and removes its handler
 */
export const unsubscribe = (channel: string): void => {
  if (!isWebSocketOpen(ws)) {
    delete subscriptions[channel];
    delete messageHandlers[channel];
    return;
  }

  const message = {
    type: 'unsubscribe',
    channel,
  };

  if (sendMessage(ws, message)) {
    delete subscriptions[channel];
    delete messageHandlers[channel];
    console.log('Unsubscribed from channel:', channel);
  }
};

/**
 * Subscribes to the real-time prices channel
 */
export const subscribeToPrices = (handler: (prices: Price | Price[]) => void): () => void => {
  const channel = '/v2/prices';
  messageHandlers[channel] = handler as MessageHandler<string>;
  subscribe(channel);
  return () => unsubscribe(channel);
};

/**
 * Subscribes to position updates for a specific wallet address
 */
export const subscribeToWalletPositions = (
  address: string,
  handler: (positions: Position[]) => void
): () => void => {
  const channel = `/v2/wallet/${address}/positions`;
  messageHandlers[channel] = handler as MessageHandler<string>;
  subscribe(channel);
  return () => unsubscribe(channel);
};
