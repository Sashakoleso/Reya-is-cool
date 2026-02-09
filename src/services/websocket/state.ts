/**
 * Shared WebSocket state
 */
import {MessageHandler} from './types';

export let ws: WebSocket | null = null;
export let reconnectAttempts = 0;
export let isConnecting = false;
export let connectionPromise: Promise<void> | null = null;
export let lastMessageTime = Date.now();

/** Active subscriptions */
export const subscriptions: Record<string, boolean> = {};

/** Message handlers for each channel */
export const messageHandlers: Record<string, MessageHandler<string>> = {};

export const setWebSocket = (socket: WebSocket | null): void => {
  ws = socket;
};

export const setReconnectAttempts = (attempts: number): void => {
  reconnectAttempts = attempts;
};

export const setIsConnecting = (connecting: boolean): void => {
  isConnecting = connecting;
};

export const setConnectionPromise = (promise: Promise<void> | null): void => {
  connectionPromise = promise;
};

export const updateLastMessageTime = (): void => {
  lastMessageTime = Date.now();
};
