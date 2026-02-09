/**
 * Heartbeat monitoring for WebSocket connection
 */
import {CONNECTION_TIMEOUT} from '../api/constants';
import {lastMessageTime} from './state';

let heartbeatInterval: number | null = null;

/**
 * Start heartbeat monitoring
 */
export const startHeartbeat = (onTimeout: () => void): void => {
  stopHeartbeat();

  heartbeatInterval = window.setInterval(() => {
    const now = Date.now();

    if (now - lastMessageTime > CONNECTION_TIMEOUT) {
      console.warn('WebSocket heartbeat timeout, forcing reconnect...');
      onTimeout();
    }
  }, 30000); // Check every 30 seconds
};

/**
 * Stop heartbeat monitoring
 */
export const stopHeartbeat = (): void => {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }
};
