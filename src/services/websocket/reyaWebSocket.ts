/**
 * WebSocket service for real-time updates from Reya DEX.
 * Handles connection management, heartbeat, and channel subscriptions.
 */
import {ChannelDataMessage, MessageHandler, PongMessage, SubscribeMessage, SubscribedMessage, WebSocketMessage,} from './types';
import {Position, Price} from '../api/types';
import {CONNECTION_TIMEOUT, MAX_RECONNECT_ATTEMPTS, RECONNECT_DELAY, SOCKET_URL} from '../api/constants';

let ws: WebSocket | null = null;

/** Active subscriptions set to allow resubscription on reconnect */
const subscriptions = new Set<string>();

/** Map of channel names to their respective data handlers */
const messageHandlers = new Map<string, MessageHandler<string>>();

let reconnectAttempts = 0;
let isConnecting = false;
let heartbeatInterval: number | null = null;
let connectionPromise: Promise<void> | null = null;
let lastMessageTime = Date.now();

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
        lastMessageTime = Date.now();
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
    subscriptions.add(channel);
    return;
  }

  const message: SubscribeMessage = {
    type: 'subscribe', channel,
  };

  try {
    ws.send(JSON.stringify(message));
    if (!subscriptions.has(channel)) {
      subscriptions.add(channel);
    }
  } catch (error) {
    console.error(`[WebSocket] Failed to subscribe to channel ${channel}:`, error);
  }
};

/**
 * Unsubscribes from a channel and removes its handler.
 * @param channel The channel name to unsubscribe from.
 */
const unsubscribe = (channel: string): void => {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    subscriptions.delete(channel);
    messageHandlers.delete(channel);
    return;
  }

  const message = {
    type: 'unsubscribe', channel,
  };

  try {
    ws.send(JSON.stringify(message));
    subscriptions.delete(channel);
    messageHandlers.delete(channel);
    console.log('Unsubscribed from channel:', channel);
  } catch (error) {
    console.error(`Failed to unsubscribe from channel ${channel}:`, error);
  }
};

/**
 * Subscribes to the real-time prices channel.
 * @param handler Callback function to process price updates.
 * @returns A cleanup function to unsubscribe from the channel.
 */
const subscribeToPrices = (handler: (prices: Price | Price[]) => void): () => void => {
  const channel = '/v2/prices';
  messageHandlers.set(channel, handler as MessageHandler<string>);
  subscribe(channel);
  return () => {
    unsubscribe(channel);
  };
};

/**
 * Subscribes to position updates for a specific wallet address.
 * Note: This channel sends initial snapshot on subscription but does not send real-time updates.
 * @param address The wallet address.
 * @param handler Callback function to process position updates.
 * @returns A cleanup function to unsubscribe from the channel.
 */
const subscribeToWalletPositions = (address: string, handler: (positions: Position[]) => void): () => void => {
  const channel = `/v2/wallet/${address}/positions`;
  messageHandlers.set(channel, handler as MessageHandler<string>);
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
  lastMessageTime = Date.now();
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
        // Position channel sends initial data in the subscribed message
        const subscribedMsg = message as SubscribedMessage;

        // Check for 'contents' field (used by position channel)
        if (subscribedMsg.contents) {
          const handler = messageHandlers.get(subscribedMsg.channel);
          if (handler) {
            handler(subscribedMsg.contents);
          }
        } else if (subscribedMsg.data) {
          const handler = messageHandlers.get(subscribedMsg.channel);
          if (handler) {
            handler(subscribedMsg.data);
          }
        }
        break;

      case 'error':
        console.error('WebSocket error message:', message.message);
        break;

      default:
        console.debug('Received unhandled WebSocket message type:', message.type);
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
  const {channel, data} = message;
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
    type: 'pong', timestamp,
  };

  try {
    ws.send(JSON.stringify(pong));
  } catch (error) {
    console.error('Failed to send pong:', error);
  }
};

/**
 * Start heartbeat monitoring
 */
const startHeartbeat = (): void => {
  stopHeartbeat();

  // Periodic check for connection health and "zombie" states
  heartbeatInterval = window.setInterval(() => {
    const now = Date.now();

    // If no messages received for a long time, consider connection dead
    if (now - lastMessageTime > CONNECTION_TIMEOUT) {
      console.warn('WebSocket heartbeat timeout, forcing reconnect...');
      if (ws) {
        ws.close(); // This will trigger onclose and attemptReconnect
      } else {
        attemptReconnect();
      }
      return;
    }
  }, 30000); // Check every 30 seconds
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
  if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
    console.error('Max reconnection attempts reached');
    return;
  }

  reconnectAttempts++;
  console.log(`Attempting to reconnect (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`);

  setTimeout(() => {
    connect().catch((error) => {
      console.error('Reconnection failed:', error);
    });
  }, RECONNECT_DELAY);
};

/**
 * Get connection status
 */
const isConnected = (): boolean => {
  return ws?.readyState === WebSocket.OPEN;
};

// Export functional API
export const reyaWebSocket = {
  connect, disconnect, subscribe, unsubscribe, subscribeToPrices, subscribeToWalletPositions, isConnected,
};
