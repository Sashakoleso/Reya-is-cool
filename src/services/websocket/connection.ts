/**
 * WebSocket connection management
 */
import {SOCKET_URL, MAX_RECONNECT_ATTEMPTS, RECONNECT_DELAY} from '../api/constants';
import {
  connectionPromise,
  isConnecting,
  messageHandlers,
  reconnectAttempts,
  setConnectionPromise,
  setIsConnecting,
  setReconnectAttempts,
  setWebSocket,
  subscriptions,
  ws,
} from './state';
import {startHeartbeat, stopHeartbeat} from './heartbeat';
import {handleMessage} from './messageHandler';
import {subscribe} from './subscriptions';
import {clearObject, isWebSocketOpen} from './utils';

/**
 * Connects to the WebSocket server
 */
export const connect = (): Promise<void> => {
  if (isConnecting && connectionPromise) {
    return connectionPromise;
  }

  if (ws?.readyState === WebSocket.OPEN) {
    return Promise.resolve();
  }

  setIsConnecting(true);
  const promise = new Promise<void>((resolve, reject) => {
    const socket = new WebSocket(SOCKET_URL);

    socket.onopen = () => {
      console.log('WebSocket connected');
      setWebSocket(socket);
      setIsConnecting(false);
      setConnectionPromise(null);
      setReconnectAttempts(0);

      startHeartbeat(() => {
        if (ws) {
          ws.close();
        } else {
          attemptReconnect();
        }
      });

      // Resubscribe to channels after reconnection
      Object.keys(subscriptions).forEach((channel) => {
        subscribe(channel);
      });

      resolve();
    };

    socket.onmessage = (event) => {
      handleMessage(event.data);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnecting(false);
      setConnectionPromise(null);
      reject(error);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnecting(false);
      setConnectionPromise(null);
      stopHeartbeat();
      attemptReconnect();
    };

    setWebSocket(socket);
  });

  setConnectionPromise(promise);
  return promise;
};

/**
 * Disconnects from the WebSocket server
 */
export const disconnect = (): void => {
  stopHeartbeat();
  clearObject(subscriptions);
  clearObject(messageHandlers);

  if (ws) {
    ws.close();
    setWebSocket(null);
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

  setReconnectAttempts(reconnectAttempts + 1);
  console.log(`Attempting to reconnect (${reconnectAttempts + 1}/${MAX_RECONNECT_ATTEMPTS})...`);

  setTimeout(() => {
    connect().catch((error) => {
      console.error('Reconnection failed:', error);
    });
  }, RECONNECT_DELAY);
};

/**
 * Get connection status
 */
export const isConnected = (): boolean => {
  return isWebSocketOpen(ws);
};
