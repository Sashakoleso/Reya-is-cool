/**
 * WebSocket message handling
 */
import {ChannelDataMessage, PongMessage, SubscribedMessage, WebSocketMessage} from './types';
import {messageHandlers, updateLastMessageTime, ws} from './state';
import {sendMessage} from './utils';

/**
 * Parses and routes incoming WebSocket messages
 */
export const handleMessage = (data: string): void => {
  updateLastMessageTime();

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
        handleSubscribed(message as SubscribedMessage);
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
 * Handles 'channel_data' messages
 */
const handleChannelData = (message: ChannelDataMessage): void => {
  const {channel, data} = message;
  const handler = messageHandlers[channel];

  if (handler && data) handler(data);
};

/**
 * Handles 'subscribed' messages
 */
const handleSubscribed = (message: SubscribedMessage): void => {
  const handler = messageHandlers[message.channel];

  if (!handler) return;

  if (message.contents) {
    handler(message.contents);
  } else if (message.data) {
    handler(message.data);
  }
};

/**
 * Sends a 'pong' message back to the server
 */
const sendPong = (timestamp: number): void => {
  const pong: PongMessage = {
    type: 'pong', timestamp,
  };
  sendMessage(ws, pong);
};
