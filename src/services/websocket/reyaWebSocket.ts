/**
 * WebSocket service for real-time updates from Reya DEX.
 * Handles connection management, heartbeat, and channel subscriptions.
 */
import {
  WebSocketMessage,
  SubscribeMessage,
  PongMessage,
  ChannelDataMessage,
} from './types';
import { Price, Position } from '../api/types';

type MessageHandler<T = unknown> = (data: T) => void;

let ws: WebSocket | null = null;
const SOCKET_URL = 'wss://websocket-testnet.reya.xyz';

/** Active subscriptions set to allow resubscription on reconnect */
const subscriptions = new Set<string>();

/** Map of channel names to their respective data handlers */
const messageHandlers = new Map<string, MessageHandler>();

let reconnectAttempts = 0;
const maxReconnectAttempts = 5;
const reconnectDelay = 3000;
let isConnecting = false;
let heartbeatInterval: number | null = null;
let connectionPromise: Promise<void> | null = null;

/**
 * Connects to the WebSocket server.
 * Implements a singleton-like connection promise to prevent multiple concurrent connection attempts.
 * @returns Promise that resolves when the connection is open.
 */
const connect = (): Promise<void> => {
  // If connection is in progress, return the existing promise
  if (isConnecting && connectionPromise) {
    return connectionPromise;
  }

  // If already connected, resolve immediately
  if (ws?.readyState === WebSocket.OPEN) {
    return Promise.resolve();
  }

  // Create new connection
  isConnecting = true;
  connectionPromise = new Promise((resolve, reject) => {
    try {
      ws = new WebSocket(SOCKET_URL);

      ws.onopen = () => {
        console.log('WebSocket connected');
        isConnecting = false;
        connectionPromise = null;
        reconnectAttempts = 0;
        startHeartbeat();

        // Resubscribe to channels after reconnection
        subscriptions.forEach((channel) => {
          subscribe(channel);
        });

        resolve();
      };

      ws.onmessage = (event) => {
        handleMessage(event.data);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        isConnecting = false;
        connectionPromise = null;
        reject(error);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        isConnecting = false;
        connectionPromise = null;
        stopHeartbeat();
        attemptReconnect();
      };
    } catch (error) {
      isConnecting = false;
      connectionPromise = null;
      reject(error);
    }
  });

  return connectionPromise;
};

/**
 * Disconnects from the WebSocket server and clears all handlers and subscriptions.
 */
const disconnect = (): void => {
  stopHeartbeat();
  subscriptions.clear();
  messageHandlers.clear();

  if (ws) {
    ws.close();
    ws = null;
  }
};

/**
 * Sends a subscription message for a specific channel.
 * If the WebSocket is not yet open, it queues the subscription in the `subscriptions` set.
 * @param channel The channel name to subscribe to.
 */
const subscribe = (channel: string): void => {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    console.warn('WebSocket not connected, queuing subscription:', channel);
    subscriptions.add(channel);
    return;
  }

  const message: SubscribeMessage = {
    type: 'subscribe',
    channel,
  };

  ws.send(JSON.stringify(message));
  subscriptions.add(channel);
  console.log('Subscribed to channel:', channel);
};

/**
 * Unsubscribes from a channel and removes its handler.
 * @param channel The channel name to unsubscribe from.
 */
const unsubscribe = (channel: string): void => {
  if (!ws || ws.readyState !== WebSocket.OPEN) return;

  const message = {
    type: 'unsubscribe',
    channel,
  };

  ws.send(JSON.stringify(message));
  subscriptions.delete(channel);
  messageHandlers.delete(channel);
  console.log('Unsubscribed from channel:', channel);
};

/**
 * Subscribes to the real-time prices channel.
 * @param handler Callback function to process price updates.
 * @returns A cleanup function to unsubscribe from the channel.
 */
const subscribeToPrices = (handler: (prices: Price[]) => void): () => void => {
  const channel = '/v2/prices';
  messageHandlers.set(channel, handler as MessageHandler<unknown>);
  subscribe(channel);
  return () => {
    unsubscribe(channel);
  };
};

/**
 * Subscribes to position updates for a specific wallet address.
 * @param address The wallet address.
 * @param handler Callback function to process position updates.
 * @returns A cleanup function to unsubscribe from the channel.
 */
const subscribeToWalletPositions = (address: string, handler: (positions: Position[]) => void): () => void => {
  const channel = `/v2/wallet/${address}/positions`;
  messageHandlers.set(channel, handler as MessageHandler<unknown>);
  subscribe(channel);
  return () => {
    unsubscribe(channel);
  };
};

/**
 * Parses and routes incoming WebSocket messages.
 * @param data Raw message data string.
 */
const handleMessage = (data: string): void => {
  try {
    const message: WebSocketMessage = JSON.parse(data);

    switch (message.type) {
      case 'ping':
        sendPong(message.timestamp || Date.now());
        break;

      case 'channel_data':
        handleChannelData(message as ChannelDataMessage);
        break;

      case 'subscribed':
        console.log('Subscription confirmed:', message.channel);
        break;

      case 'error':
        console.error('WebSocket error message:', message.message);
        break;

      default:
        // Ignore other message types
        break;
    }
  } catch (error) {
    console.error('Error parsing WebSocket message:', error);
  }
};

/**
 * Handles 'channel_data' messages by invoking the registered handler for the channel.
 * @param message The parsed channel data message.
 */
const handleChannelData = (message: ChannelDataMessage): void => {
  const { channel, data } = message;
  const handler = messageHandlers.get(channel);

  if (handler && data) {
    handler(data);
  }
};

/**
 * Sends a 'pong' message back to the server in response to a 'ping'.
 * @param timestamp The timestamp from the original 'ping' message.
 */
const sendPong = (timestamp: number): void => {
  if (!ws || ws.readyState !== WebSocket.OPEN) return;

  const pong: PongMessage = {
    type: 'pong',
    timestamp,
  };

  ws.send(JSON.stringify(pong));
};

/**
 * Start heartbeat monitoring
 */
const startHeartbeat = (): void => {
  stopHeartbeat();

  // Send periodic pings to keep connection alive
  heartbeatInterval = window.setInterval(() => {
    if (ws?.readyState === WebSocket.OPEN) {
      // Server sends pings, we just need to respond with pongs
      // This interval is just to check connection health
    }
  }, 30000); // 30 seconds
};

/**
 * Stop heartbeat monitoring
 */
const stopHeartbeat = (): void => {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }
};

/**
 * Attempt to reconnect after disconnection
 */
const attemptReconnect = (): void => {
  if (reconnectAttempts >= maxReconnectAttempts) {
    console.error('Max reconnection attempts reached');
    return;
  }

  reconnectAttempts++;
  console.log(`Attempting to reconnect (${reconnectAttempts}/${maxReconnectAttempts})...`);

  setTimeout(() => {
    connect().catch((error) => {
      console.error('Reconnection failed:', error);
    });
  }, reconnectDelay);
};

/**
 * Get connection status
 */
const isConnected = (): boolean => {
  return ws?.readyState === WebSocket.OPEN;
};

// Export functional API
export const reyaWebSocket = {
  connect,
  disconnect,
  subscribe,
  unsubscribe,
  subscribeToPrices,
  subscribeToWalletPositions,
  isConnected,
};
