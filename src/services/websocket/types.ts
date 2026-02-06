import { Price, Position } from '../api/types';

export type WebSocketMessageType =
  | 'subscribe'
  | 'subscribed'
  | 'unsubscribe'
  | 'unsubscribed'
  | 'channel_data'
  | 'ping'
  | 'pong'
  | 'error';

export type WebSocketMessage = {
  type: WebSocketMessageType;
  timestamp?: number;
  channel?: string;
  data?: unknown;
  message?: string;
  id?: string;
};

export type SubscribedMessage = {
  type: 'subscribed';
  channel: string;
  contents?: unknown;
  data?: unknown;
};

export type SubscribeMessage = {
  type: 'subscribe'; channel: string; id?: string;
};

export type PongMessage = {
  type: 'pong'; timestamp: number;
};

export type ChannelDataMessage<T = unknown> = {
  type: 'channel_data'; timestamp: number; channel: string; data: T;
};

/** Specific data types for known channels */
export type ChannelDataMap = {
  '/v2/prices': Price | Price[];
  [key: `/v2/wallet/${string}/positions`]: Position[];
};

export type MessageHandler<K extends keyof ChannelDataMap | string> = 
  K extends keyof ChannelDataMap 
    ? (data: ChannelDataMap[K]) => void 
    : (data: unknown) => void;