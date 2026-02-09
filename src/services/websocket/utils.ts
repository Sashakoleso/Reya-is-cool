/**
 * Utility functions for WebSocket operations
 */

/**
 * Clears all properties from an object
 * @param obj The object to clear
 */
export const clearObject = <T extends Record<string, any>>(obj: T): void => {
  Object.keys(obj).forEach(key => delete obj[key]);
};

/**
 * Sends a JSON message through WebSocket
 * @param ws WebSocket instance
 * @param message Message object to send
 * @returns true if sent successfully, false otherwise
 */
export const sendMessage = (ws: WebSocket | null, message: object): boolean => {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    return false;
  }

  try {
    ws.send(JSON.stringify(message));
    return true;
  } catch (error) {
    console.error('Failed to send WebSocket message:', error);
    return false;
  }
};

/**
 * Checks if WebSocket is connected
 * @param ws WebSocket instance
 */
export const isWebSocketOpen = (ws: WebSocket | null): boolean => {
  return ws?.readyState === WebSocket.OPEN;
};
